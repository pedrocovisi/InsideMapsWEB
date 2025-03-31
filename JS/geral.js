document.addEventListener("DOMContentLoaded", function () {
    const btnClaro = document.getElementById('btnclaro');
    const btnEscuro = document.getElementById('btnescuro');
    const body = document.body;

    // Aplica o tema salvo no localStorage
    const theme = localStorage.getItem("theme");
    if (theme === "escuro") {
        body.classList.add("escuro");
        btnEscuro.checked = true;
    } else {
        body.classList.add("claro");
        btnClaro.checked = true;
    }

    // Função para alternar para o modo claro
    btnClaro.addEventListener("click", () => {
        body.classList.add("claro");
        body.classList.remove("escuro");
        localStorage.setItem("theme", "claro");
    });

    // Função para alternar para o modo escuro
    btnEscuro.addEventListener("click", () => {
        body.classList.add("escuro");
        body.classList.remove("claro");
        localStorage.setItem("theme", "escuro");
    });
});
