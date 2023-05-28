function initFetchCnpj() {
    const inputCnpj = document.getElementById('cnpj');
    const btnCnpj = document.getElementById('btnCnpj')
    const box = document.querySelectorAll('.info')
    const img = document.querySelector('.img1')
    const img2 = document.querySelector('.img2')
    const img3 = document.querySelector('.img3')

    btnCnpj.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();

        function buscaCnpj(cnpj) {
            var cnpj = inputCnpj.value;
            fetch(`https://receitaws.com.br/v1/cnpj/${cnpj}`, {
                method: 'GET'
            })
                .then(response => response.json())
                .then(body => {
                    if (body.erro) {
                        img2.style.display = "none";
                        img3.style.display = "flex";
                        img.style.display = "none";
                    } else {
                        const logradouro = document.getElementById('logradouro')
                        const bairro = document.getElementById('bairro')
                        const complemento = document.getElementById('complemento')
                        const cep = document.getElementById('cep')
                        const localidade = document.getElementById('localidade')
                        const uf = document.getElementById('uf')
                        logradouro.innerText = body.logradouro;
                        bairro.innerText = body.bairro;
                        complemento.innerText = body.complemento;
                        cep.innerText = body.cep;
                        localidade.innerText = body.localidade;
                        uf.innerText = body.uf;
                        img2.style.display = "flex";
                        img.style.display = "none";
                        img3.style.display = "none";
                    }
                }).catch(e => {
                    img2.style.display = "none";
                    img.style.display = "none";
                    img3.style.display = "flex";
                })      
        }
        buscaCnpj(cnpj);
    }

    function isEmpty() {
        if (document.getElementById("cnpj").value == "") {
            img2.style.display = "none";
            img3.style.display = "none";
            img.style.display = "flex";
            return
        }
    }
    isEmpty()
}
initFetchCnpj()

function initModalCnpj() {
    const botaoAbrir = document.querySelector('[data-modal="abrircnpj"]');
    const botaoFechar = document.querySelector('[data-modal="fecharcnpj"]');
    const containerModal = document.querySelector('[data-modal="containercnpj"]');
    const modal = document.querySelector('.modal h1')

    if (botaoAbrir && botaoFechar && containerModal) {
        function abrirModal(event) {
            if (document.getElementById("cnpj").value == "") {
                event.preventDefault();
                containerModal.classList.add('ativo')
            }
        }

        function fecharModal(event) {
            event.preventDefault();
            containerModal.classList.remove('ativo')
        }

        function cliqueFora(event) {
            if (event.target == this)
                fecharModal(event)
        }

        botaoAbrir.addEventListener('click', abrirModal);
        botaoFechar.addEventListener('click', fecharModal);
        containerModal.addEventListener('click', cliqueFora);
    }
}
initModalCnpj()