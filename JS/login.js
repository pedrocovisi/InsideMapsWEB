document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        if (!email || !senha) {
            alert("Por favor, insira o email e a senha.")
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/usuarios/login', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem("usuarioLogado", JSON.stringify(data));

                alert("Login realizado com sucesso!");
                window.location.href = "index.html"; // redireciona para página inicial
            } else if (response.status === 401) {
                alert("Credenciais inválidas. Tente novamente.");
            } else {
                alert("Erro ao fazer login. Tente novamente mais tarde.");
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro de conexão com o servidor.");
        }
    });
});
