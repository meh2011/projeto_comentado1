
document.addEventListener("DOMContentLoaded", () => {
 
    const cpf = document.getElementById("cpf");
    const cep = document.getElementById("cep");
    const telefone = document.getElementById("telefone");
    const telefoneResponsavel = document.getElementById("responsavelTelefone");
 
    function aplicarMascara(campo, tipo) {
        if (!campo) return;
 
        campo.addEventListener("input", () => {
            let valor = campo.value.replace(/\D/g, "");
 
            if (tipo === "cpf") {
                valor = valor.slice(0, 11);
                valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
                valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
                valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            }
 
            if (tipo === "cep") {
                valor = valor.slice(0, 8);
                valor = valor.replace(/(\d{5})(\d)/, "$1-$2");
            }
 
            if (tipo === "telefone") {
                valor = valor.slice(0, 11);
 
                if (valor.length > 10) {
                    valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
                } else if (valor.length > 6) {
                    valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
                } else if (valor.length > 2) {
                    valor = valor.replace(/(\d{2})(\d+)/, "($1) $2");
                } else if (valor.length > 0) {
                    valor = "(" + valor;
                }
            }
 
            campo.value = valor;
        });
    }
 
    aplicarMascara(cpf, "cpf");
    aplicarMascara(cep, "cep");
    aplicarMascara(telefone, "telefone");
    aplicarMascara(telefoneResponsavel, "telefone");
 
    if (cep) {
        cep.addEventListener("blur", buscarCep);
    }
 
    async function buscarCep() {
        const valorCep = cep.value.replace(/\D/g, "");
        const status = document.getElementById("cepStatus");
 
        if (valorCep.length === 0) return;
 
        if (valorCep.length !== 8) {
            if (status) status.textContent = "Digite um CEP com 8 números.";
            return;
        }
 
        if (status) status.textContent = "Buscando endereço...";
 
        try {
            const resposta = await fetch(
                `https://viacep.com.br/ws/${valorCep}/json/`
            );
 
            if (!resposta.ok) {
                throw new Error("Erro na consulta.");
            }
 
            const dados = await resposta.json();
 
            if (dados.erro) {
                if (status) status.textContent = "CEP não encontrado.";
                return;
            }
 
            document.getElementById("logradouro").value = dados.logradouro || "";
            document.getElementById("bairro").value = dados.bairro || "";
            document.getElementById("cidade").value = dados.localidade || "";
            document.getElementById("estado").value = dados.uf || "";
 
            if (status) {
                status.textContent = "Endereço preenchido automaticamente!";
            }
 
        } catch (erro) {
            if (status) {
                status.textContent = "Não foi possível buscar o CEP. Tente novamente.";
            }
        }
    }
 
});