function initFetchCep() {
    const inputCep = document.getElementById('cep');
    const btnCep = document.getElementById('btnCep')
    const box = document.querySelectorAll('.info')
    const img = document.querySelector('.img1')
    const img2 = document.querySelector('.img2')
    const img3 = document.querySelector('.img3')

    btnCep.addEventListener('click', handleClick);

    function handleClick(event) {
        event.preventDefault();
        
        function buscaCep(cep) {
            var cep = inputCep.value;
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(body => {
                    if (body.erro) {
                        img2.style.display = "none";
                        img3.style.display = "flex";
                        img.style.display = "none";
                        clearDataCep(); //limpar os campos preenchidos
                    } else {
                        const nomeRua = document.getElementById('nomeRua')
                        const nomeBairro = document.getElementById('nomeBairro')
                        const complemento = document.getElementById('complemento')
                        const ibge = document.getElementById('ibge')
                        const localidade = document.getElementById('localidade')
                        const uf = document.getElementById('uf')
                        nomeRua.innerText = body.logradouro;
                        nomeBairro.innerText = body.bairro;
                        complemento.innerText = body.complemento;
                        ibge.innerText = body.ibge;
                        localidade.innerText = body.localidade;
                        uf.innerText = body.uf;
                        img2.style.display = "flex";
                        img.style.display = "none";
                        img3.style.display = "none";
                        if (confirm("Deseja baixar todos os dados existentes desse CEP em formato Excel?")) {
                            downloadData([body]); // Chame a função de download com os dados da resposta da API
                        }
                    }
                }).catch(e => {
                    img2.style.display = "none";
                    img.style.display = "none";
                    img3.style.display = "flex";
                })
        }
        buscaCep(cep);
    
    }

    function isEmptyCep() {
        if (document.getElementById("cep").value == "") {
            img2.style.display = "none";
            img3.style.display = "none";
            img.style.display = "flex";
            return
        }
    }

    function clearDataCep() {
        inputCep.value = "";
        const camposInfo = document.querySelectorAll('.info');
        camposInfo.forEach(campo => campo.innerText = "");
    }

    function downloadData(data) {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dados CEP");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "dados_cep.xlsx";
        link.click();
        URL.revokeObjectURL(url);
    }

    isEmptyCep()
    
}

initFetchCep()

function initModalCep() {
    const botaoAbrir = document.querySelector('[data-modal="abrir"]');
    const botaoFechar = document.querySelector('[data-modal="fechar"]');
    const containerModal = document.querySelector('[data-modal="container"]');
    const modal = document.querySelector('.modal h1')

    if (botaoAbrir && botaoFechar && containerModal) {
        function abrirModal(event) {
            if (document.getElementById("cep").value == "") {
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
initModalCep()

