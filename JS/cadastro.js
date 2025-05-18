document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const dataNascimento = document.getElementById("data-nascimento").value;

    const usuario = {
      nome,
      email,
      senha,
      dataNascimento,
      administrador: 0,
      status: 1
    };

    try {
      const response = await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html"; // Redireciona para login
      } else {
        alert("Erro ao cadastrar. Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor.");
    }


  });
});
