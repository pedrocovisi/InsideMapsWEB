document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const perfilForm = document.getElementById("perfilForm");
    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const dataNascimentoInput = document.getElementById("data-nascimento");
    const editarBtn = document.getElementById("editarBtn");
    const sairBtn = document.getElementById("sairBtn");
    const feedback = document.getElementById("feedback");
    const avatarImg = document.getElementById("avatar");

    if (!usuarioLogado) {
        alert("Você não está logado. Redirecionando para login.");
        window.location.href = "login.html";
        return;
    }

    // Preenche os inputs com os dados do usuário
    nomeInput.value = usuarioLogado.nome || "";
    emailInput.value = usuarioLogado.email || "";
    dataNascimentoInput.value = usuarioLogado.dataNascimento || "";

    if (usuarioLogado.avatar) {
        avatarImg.src = usuarioLogado.avatar;
    }

    let editando = false;

    function setFormDisabled(disabled) {
        nomeInput.disabled = disabled;
        emailInput.disabled = disabled;
        dataNascimentoInput.disabled = disabled;
    }

    function mostrarFeedback(msg, tipo) {
        feedback.textContent = msg;
        feedback.className = tipo === "sucesso" ? "text-success" : "text-danger";
    }

    editarBtn.addEventListener("click", async () => {
        if (!editando) {
            // Ativar edição
            setFormDisabled(false);
            editarBtn.textContent = "Salvar";
            feedback.textContent = "";
            editando = true;
        } else {
            // Salvar alterações
            if (!nomeInput.value.trim() || !emailInput.value.trim() || !dataNascimentoInput.value) {
                mostrarFeedback("Todos os campos são obrigatórios.", "erro");
                return;
            }

            setFormDisabled(true);
            editarBtn.disabled = true;
            mostrarFeedback("Salvando...", "sucesso");

            const usuarioAtualizado = {
                id: usuarioLogado.id,
                nome: nomeInput.value.trim(),
                email: emailInput.value.trim(),
                senha: usuarioLogado.senha, // mantém senha
                dataNascimento: dataNascimentoInput.value,
                administrador: usuarioLogado.administrador,
                status: usuarioLogado.status
            };

            try {
                const response = await fetch(`http://localhost:8080/api/usuarios/${usuarioLogado.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(usuarioAtualizado)
                });

                if (response.ok) {
                    mostrarFeedback("Perfil atualizado com sucesso!", "sucesso");
                    editarBtn.textContent = "Editar informações";
                    editando = false;
                    editarBtn.disabled = false;

                    // Atualiza localStorage com as novas infos
                    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioAtualizado));
                } else {
                    mostrarFeedback("Erro ao atualizar o perfil. Tente novamente.", "erro");
                    setFormDisabled(false);
                    editarBtn.disabled = false;
                }
            } catch (err) {
                mostrarFeedback("Erro de conexão com o servidor.", "erro");
                setFormDisabled(false);
                editarBtn.disabled = false;
            }
        }
    });

    sairBtn.addEventListener("click", () => {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "login.html"; // Redireciona para login após logout
    });
});
