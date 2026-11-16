const botaoTema = document.querySelector("#alternarTema");
 
if (botaoTema) {
    botaoTema.onclick = function () {
 
        document.body.classList.toggle("modo-claro");
 
        if (document.body.classList.contains("modo-claro")) {
            botaoTema.innerHTML = `
                <i class="bi bi-moon-fill"></i>
                <span>escuro</span>
            `;
        } else {
            botaoTema.innerHTML = `
                <i class="bi bi-sun-fill"></i>
                <span>claro</span>
            `;
        }
    };
 
}
 