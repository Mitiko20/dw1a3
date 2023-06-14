/**CNPJ**/

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

            fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`)
                .then(response => response.json())
                .then(body => {
                    if (body.type === "bad_request") {
                        img2.style.display = "none";
                        img3.style.display = "flex";
                        img.style.display = "none";
                        clearDataCnpj(); //limpar os campos preenchidos

                    } else {
                        const razao_social = document.getElementById('razao_social')
                        const nome_fantasia = document.getElementById('nome_fantasia')
                        const descricao_situacao_cadastral = document.getElementById('descricao_situacao_cadastral')
                        const logradouro = document.getElementById('logradouro')
                        const complemento = document.getElementById('complemento')
                        const cep = document.getElementById('cep')
                        const bairro = document.getElementById('bairro')
                        const municipio = document.getElementById('municipio')
                        const uf = document.getElementById('uf')
                        razao_social.innerText = body.razao_social;
                        nome_fantasia.innerText = body.nome_fantasia;
                        descricao_situacao_cadastral.innerText = body.descricao_situacao_cadastral;
                        logradouro.innerText = body.logradouro;
                        complemento.innerText = body.complemento;
                        cep.innerText = body.cep;
                        bairro.innerText = body.bairro;
                        municipio.innerText = body.municipio;
                        uf.innerText = body.uf;
                        img2.style.display = "flex";
                        img.style.display = "none";
                        img3.style.display = "none";
                        if (confirm("Deseja baixar todos os dados existentes desse CNPJ em formato Excel?")) {
                            downloadData([body]); // Chame a função de download com os dados da resposta da API
                        }
                    }
                }).catch(e => {
                    img2.style.display = "none";
                    img.style.display = "none";
                    img3.style.display = "flex";
                })      
        }
        buscaCnpj(cnpj);
    }

    function isEmptyCnpj() {
        if (document.getElementById("cnpj").value == "") {
            img2.style.display = "none";
            img3.style.display = "none";
            img.style.display = "flex";
            return
        }
    }

    function clearDataCnpj() {
        inputCnpj.value = "";
        const camposInfo2 = document.querySelectorAll('.info');
        camposInfo2.forEach(campo => campo.innerText = "");
    }

    function downloadData(data) {
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dados CNPJ");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "dados_cnpj.xlsx";
        link.click();
        URL.revokeObjectURL(url);
    }

    isEmptyCnpj()
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