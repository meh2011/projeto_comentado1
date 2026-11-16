document.addEventListener("DOMContentLoaded", () => {
 
    const form = document.getElementById("formInscricao");
    const etapas = [...form.querySelectorAll(".secao")];
 
    let etapaAtual = 0;
 
    const progresso = document.createElement("div");
 
    progresso.className = "progresso-inscricao";
 
    progresso.innerHTML = `
        <div class="progresso-topo">
            <div>
                <span class="progresso-subtitulo">INSCRIÇÃO</span>
                <h3 id="tituloEtapa">Dados pessoais</h3>
            </div>
            <span id="contadorEtapa">Etapa 1 de 5</span>
        </div>
 
        <div class="progresso-fundo">
            <div id="barraProgresso"></div>
        </div>
 
        <div class="progresso-rodape">
            <span id="nomeEtapa">Dados pessoais</span>
            <span id="porcentagem">20% concluído</span>
        </div>
    `;
 
    etapas[0].before(progresso);
 
    const nomes = [
        "Dados pessoais",
        "Residência e endereço",
        "Informações escolares",
        "Dados do responsável",
        "Declarações e confirmação"
    ];
 
 
    etapas.forEach((etapa, index) => {
 
        const navegacao = document.createElement("div");
        navegacao.className = "navegacao-etapas";
 
        if (index > 0) {
            const voltar = document.createElement("button");
 
            voltar.type = "button";
            voltar.className = "btn-voltar";
            voltar.textContent = "← Voltar";
 
            voltar.addEventListener("click", () => {
                mostrarEtapa(etapaAtual - 1);
            });
 
            navegacao.appendChild(voltar);
        }
 
        if (index < etapas.length - 1) {
            const avancar = document.createElement("button");
 
            avancar.type = "button";
            avancar.className = "btn-avancar";
            avancar.textContent = "Próxima etapa →";
 
            avancar.addEventListener("click", () => {
 
                const campos = etapa.querySelectorAll(
                    "input:not([type=hidden]), select, textarea"
                );
 
                let valido = true;
 
                campos.forEach(campo => {
                    if (!campo.checkValidity()) {
                        valido = false;
                    }
                });
 
                if (!valido) {
                    form.classList.add("was-validated");
 
                    const primeiroInvalido = [...campos].find(
                        campo => !campo.checkValidity()
                    );
 
                    primeiroInvalido.reportValidity();
                    return;
                }
 
                mostrarEtapa(etapaAtual + 1);
            });
 
            navegacao.appendChild(avancar);
        }
 
        etapa.querySelector(".card-body").appendChild(navegacao);
    });
 
 
    function mostrarEtapa(numero) {
 
        etapaAtual = numero;
 
        etapas.forEach((etapa, index) => {
            etapa.hidden = index !== etapaAtual;
        });
 
        const porcentagem = Math.round(
            ((etapaAtual + 1) / etapas.length) * 100
        );
 
        document.getElementById("barraProgresso").style.width =
            porcentagem + "%";
 
        document.getElementById("contadorEtapa").textContent =
            `Etapa ${etapaAtual + 1} de ${etapas.length}`;
 
        document.getElementById("tituloEtapa").textContent =
            nomes[etapaAtual];
 
        document.getElementById("nomeEtapa").textContent =
            nomes[etapaAtual];
 
        document.getElementById("porcentagem").textContent =
            porcentagem + "% concluído";
 
        progresso.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
 
    mostrarEtapa(0);
 
});