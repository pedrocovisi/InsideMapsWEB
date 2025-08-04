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

document.addEventListener("DOMContentLoaded", () => {
    const btnAssinar = document.getElementById('btn-assinar');

    if (btn-assinar) {
        btn-assinar.addEventListener('click', (event) => {
            event.preventDefault(); // Impede o comportamento padrão do link

            // Verifica se o usuário está logado
            const usuarioLogado = localStorage.getItem('usuarioLogado');

            if (usuarioLogado && usuarioLogado !== 'null') {
                // Usuário está logado - vai para o perfil
                window.location.href = 'pagamento.html';
            } else {
                // Usuário não está logado - vai para o login
                window.location.href = 'login.html';
            }
        });
    }
});

// Aguarda o documento carregar completamente
document.addEventListener('DOMContentLoaded', () => {

    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement; // Seleciona o elemento <html>

    // Verifica se o botão existe na página
    if (themeToggle) {

        // Função para aplicar o tema salvo no localStorage
        const applyStoredTheme = () => {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme === 'escuro') {
                htmlElement.classList.add('escuro');
            } else {
                htmlElement.classList.remove('escuro');
            }
        };

        // Evento de clique no botão de alternar tema
        themeToggle.addEventListener('click', () => {
            // Alterna a classe 'escuro' no elemento <html>
            htmlElement.classList.toggle('escuro');

            // Salva a preferência do usuário no localStorage
            if (htmlElement.classList.contains('escuro')) {
                localStorage.setItem('theme', 'escuro');
            } else {
                localStorage.setItem('theme', 'claro');
            }
        });

        // Aplica o tema correto ao carregar a página
        applyStoredTheme();
    }

    // Inicializa todos os tooltips da página (necessário para a dica de ferramenta)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

});