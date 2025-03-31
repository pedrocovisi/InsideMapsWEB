document.addEventListener("DOMContentLoaded", function () {
    const btnClaro = document.getElementById('btnclaro');
    const btnEscuro = document.getElementById('btnescuro');

    // Verifica o tema salvo no localStorage e aplica na página
    const modoSalvo = localStorage.getItem("modo-tema");

    if (modoSalvo === "escuro") {
        document.body.classList.add('escuro');
        document.body.classList.remove('claro');
        btnEscuro.checked = true;
    } else {
        document.body.classList.add('claro');
        document.body.classList.remove('escuro');
        btnClaro.checked = true;
    }

    // Função para alternar para o modo claro e salvar no localStorage
    btnClaro.addEventListener('click', () => {
        document.body.classList.add('claro');
        document.body.classList.remove('escuro');
        localStorage.setItem("modo-tema", "claro");
    });

    // Função para alternar para o modo escuro e salvar no localStorage
    btnEscuro.addEventListener('click', () => {
        document.body.classList.add('escuro');
        document.body.classList.remove('claro');
        localStorage.setItem("modo-tema", "escuro");
    });
});
