document.addEventListener("DOMContentLoaded", function () {
    const btnClaro = document.getElementById('btnclaro');
    const btnEscuro = document.getElementById('btnescuro');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "escuro") {
        html.classList.add("escuro");
        btnEscuro.checked = true;
    } else {
        html.classList.remove("escuro");
        btnClaro.checked = true;
    }

    btnClaro.addEventListener("click", () => {
        html.classList.remove("escuro");
        localStorage.setItem("theme", "claro");
    });

    btnEscuro.addEventListener("click", () => {
        html.classList.add("escuro");
        localStorage.setItem("theme", "escuro");
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const btnPerfil = document.getElementById('btnPerfil');

    if (btnPerfil) {
        btnPerfil.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link

            // Verifica se o usuário está logado
            const usuarioLogado = localStorage.getItem('usuarioLogado');

            if (usuarioLogado && usuarioLogado !== 'null') {
                // Usuário está logado - vai para o perfil
                window.location.href = 'perfil.html';
            } else {
                // Usuário não está logado - vai para o login
                window.location.href = 'login.html';
            }
        });
    }
});
