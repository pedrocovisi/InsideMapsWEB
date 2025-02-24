document.addEventListener("DOMContentLoaded", function () {
    const btnClaro = document.getElementById('btnclaro');
    const btnEscuro = document.getElementById('btnescuro');

    // Função para alternar para o modo claro
    btnClaro.addEventListener('click', () => {
        document.body.classList.add('claro');
        document.body.classList.remove('escuro');
    });

    // Função para alternar para o modo escuro
    btnEscuro.addEventListener('click', () => {
        document.body.classList.add('escuro');
        document.body.classList.remove('claro');
    });
});
