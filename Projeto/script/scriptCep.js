/**Chamada do método fetch(): função embutida em navegadores modernos que permite 
 * fazer solicitações HTTP para recuperar recursos de uma determinada URL. **/
function initFetchCep() {
    /*getElementById é método usado para selecionar um elemento HTML específico (que é o document)
    com base no valor do atributo id desse elemento. */
    const inputCep = document.getElementById('cep');
    const btnCep = document.getElementById('btnCep')
    /*O método querySelectorAll retorna uma lista de todos os elementos que correspondem ao seletor especificado */
    const box = document.querySelectorAll('.info')
    /*O método querySelector retorna a primeira correspondência encontrada para o seletor especificado */
    /*img1: Procurar
    img2:  Encontrar
    img3: Erro*/
    const img = document.querySelector('.img1')
    const img2 = document.querySelector('.img2')
    const img3 = document.querySelector('.img3')
    
    /*addEventListener: usado para capturar eventos disparados por um elemento e executar um código em resposta a esses eventos.
    Dois argumentos: o evento de clique, nesse caso, e a função que ele chama */
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
                        img3.style.display = "flex"; //erro
                        img.style.display = "none";
                        clearDataCep(); //se der erro, limpa os campos preenchidos
                    } else {
                        const nomeRua = document.getElementById('nomeRua')
                        const nomeBairro = document.getElementById('nomeBairro')
                        const complemento = document.getElementById('complemento')
                        const ibge = document.getElementById('ibge')
                        const localidade = document.getElementById('localidade')
                        const uf = document.getElementById('uf')
                        nomeRua.innerText = body.logradouro; //como está descrito no API
                        nomeBairro.innerText = body.bairro;
                        complemento.innerText = body.complemento;
                        ibge.innerText = body.ibge;
                        localidade.innerText = body.localidade;
                        uf.innerText = body.uf;
                        img2.style.display = "flex"; //foi encontrado
                        img.style.display = "none";
                        img3.style.display = "none";
                        if (confirm("Deseja baixar todos os dados existentes desse CEP em formato Excel?")) {
                            downloadData([body]); // Chame a função de download com os dados da resposta da API
                        }
                    }
                }).catch(e => {
                    img2.style.display = "none";
                    img.style.display = "none";
                    img3.style.display = "flex"; //erro
                })
        }
        buscaCep(cep);
    
    }

    function isEmptyCep() {
        if (document.getElementById("cep").value == "") {
            img2.style.display = "none";
            img3.style.display = "none";
            img.style.display = "flex"; //procurar
            return
        }
    }

    function clearDataCep() {
        inputCep.value = "";
        const camposInfo = document.querySelectorAll('.info');
        camposInfo.forEach(campo => campo.innerText = "");
    }

    function downloadData(data) {
        const workbook = XLSX.utils.book_new(); //vai gerar o arquivo excel
        const worksheet = XLSX.utils.json_to_sheet(data); //converte um array de objetos json em uma planilha de excel
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dados CEP"); //fazendo append de linhas
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" }); //escreve o conteúdo em um buffer do excel, pelo write()
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }); 
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a"); //criar um elemento "a" ancora para ser usada para criar o link de download
        link.href = url;
        link.download = "dados_cep.xlsx";
        link.click();
        URL.revokeObjectURL(url); //Garantia que os recursos de memória alocados para o objeto URL sejam liberados corretamente, evitando possíveis vazamentos de memória.
    }

    isEmptyCep()
    
}

initFetchCep()

/*Um modal é uma janela flutuante que geralmente é usada para exibir informações adicionais, 
solicitar ações do usuário ou fornecer um contexto específico dentro de uma página da web. */
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


