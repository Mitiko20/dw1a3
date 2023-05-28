  // Máscara para o campo CPF
function formatarCPF(cpf) {
    //se nao for numero, coloca branco.
    cpf = cpf.replace(/\D/g, '');
    //grupo de captura e depois a formatação.
    //4 numeros seguidos, ele adiciona o ponto.
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
}

// Máscara para o campo telefone: (00)00000-0000
function formatarPhone(phone) {
    phone = phone.replace(/\D/g, '');
    phone = phone.replace(/(\d{2})(\d)/, '($1)$2');
    phone = phone.replace(/(\d{4})(\d)/, '$1-$2');
    phone = phone.replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    phone = phone.replace(/(-\d{4})\d+?$/, '$1')
    return phone;  
}

// Máscara para o campo data de nascimento
function formatarDate(dataNascimento) {
    dataNascimento = dataNascimento.replace(/\D/g, '');
    dataNascimento = dataNascimento.replace(/(\d{2})(\d)/, '$1/$2')
    dataNascimento = dataNascimento.replace(/(\/\d{2})(\d)/, '$1/$2')
    dataNascimento = dataNascimento.replace(/(\/\d{4})\d+?$/, '$1')
    return dataNascimento;      
}

// Validação do campo CPF
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
        return false;
    }
    var soma = 0;
    for (var i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    var resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(9))) {
        return false;
    }
    soma = 0;
    for (i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.charAt(10))) {
        return false;
    }
    return true;
}

// Validação do campo data de nascimento
function validarDataNascimento(dataNascimento) {
    var nascimento = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!nascimento.test(dataNascimento)) {
        return false;
    }
    var partes = dataNascimento.split('/');
    var dia = parseInt(partes[0], 10);
    var mes = parseInt(partes[1], 10);
    var ano = parseInt(partes[2], 10);

    if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || ano < 1900 || ano > 2023) {
        return false;
    }

    var dataAtual = new Date();
    var anoAtual = dataAtual.getFullYear();
    var mesAtual = dataAtual.getMonth() + 1;
    var diaAtual = dataAtual.getDate();

    if (ano > anoAtual || (ano === anoAtual && mes > mesAtual) || (ano === anoAtual && mes === mesAtual && dia > diaAtual)) {
        return false;
    }

    return true;
}

// Validação do campo telefone
function validarPhone(phone) {
    phone = phone.replace(/\D/g, '');
    if (phone.length !== 11 && phone.length !== 10) {
        return false;
    }
    return true;
}

// Validação do campo nome
function validarNome(nome) {
    var regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return regex.test(nome);
}

// Validação do campo país
function validarPais(pais) {
    var regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return regex.test(pais);
}

// Validação do campo bairro
function validarBairro(bairro) {
    var regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return regex.test(bairro);
}

// Estiliza os campos inválidos
function aplicarEstilosCamposInvalidos() {
    var form = document.getElementById('myForm');
    var inputs = form.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        if (!inputs[i].validity.valid) {
            inputs[i].classList.add('invalid');
        } else {
            inputs[i].classList.remove('invalid');
        }
    }
}

// Aplica máscara no campo CPF e valida ao perder o foco
var cpfInput = document.getElementById('cpf');
cpfInput.addEventListener('input', function (event) {
    event.target.value = formatarCPF(event.target.value);
});

cpfInput.addEventListener('blur', function (event) {
    if (!validarCPF(event.target.value)) {
        event.target.setCustomValidity('CPF inválido');
    } else {
        event.target.setCustomValidity('');
    }
    aplicarEstilosCamposInvalidos();
});

// Aplica máscara no campo telefone e valida ao perder o foco
var phoneInput = document.getElementById('phone');
phoneInput.addEventListener('input', function (event) {
    event.target.value = formatarPhone(event.target.value);
});

phoneInput.addEventListener('blur', function (event) {
    if (!validarPhone(event.target.value)) {
        event.target.setCustomValidity('Telefone inválido');
    } else {
        event.target.setCustomValidity('');
    }
    aplicarEstilosCamposInvalidos();
});

// Aplica máscara no campo data de nascimento e valida ao perder o foco
var dataNascimentoInput = document.getElementById('dataNascimento');
dataNascimentoInput.addEventListener('input', function (event) {
    event.target.value = formatarDate(event.target.value);
});

dataNascimentoInput.addEventListener('blur', function (event) {
    if (!validarDataNascimento(event.target.value)) {
        event.target.setCustomValidity('Data de nascimento inválida');
    } else {
        event.target.setCustomValidity('');
    }
    aplicarEstilosCamposInvalidos();
});

// Aplica estilos nos campos inválidos ao enviar o formulário
var form = document.getElementById('myForm');
form.addEventListener('submit', function (event) {
    aplicarEstilosCamposInvalidos();
    if (!form.checkValidity()) {
        event.preventDefault();
    }
});