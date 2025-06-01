document.addEventListener("DOMContentLoaded", function () {
    const btnClaro = document.getElementById('btnclaro');
    const btnEscuro = document.getElementById('btnescuro');
    const html = document.documentElement; // <- agora controlamos a tag <html>

    // Aplica o tema salvo no localStorage o mais cedo possível
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "escuro") {
        html.classList.add("escuro");
        btnEscuro.checked = true;
    } else {
        html.classList.add("claro");
        btnClaro.checked = true;
    }

    // Alterna para o modo claro
    btnClaro.addEventListener("click", () => {
        html.classList.remove("escuro");
        html.classList.add("claro");
        localStorage.setItem("theme", "claro");
    });

    // Alterna para o modo escuro
    btnEscuro.addEventListener("click", () => {
        html.classList.remove("claro");
        html.classList.add("escuro");
        localStorage.setItem("theme", "escuro");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const btnPerfil = document.getElementById("btnPerfil");
    const usuarioLogado = localStorage.getItem("usuarioLogado");

    if (usuarioLogado) {
       
        btnPerfil.href = "perfil.html"; 
    } else {
        
        btnPerfil.href = "login.html";
    }
}); 
