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

    // Função para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Função para validar idade (mínimo 13 anos)
function validarIdade(dataNascimento) {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();

    if (isNaN(nascimento.getTime())) return false; // data inválida

    const idadeMinima = 13;

    const dataMinima = new Date(
        hoje.getFullYear() - idadeMinima,
        hoje.getMonth(),
        hoje.getDate()
    );

    return nascimento <= dataMinima;
}


    // Função para exibir erro
    function exibirErro(campo, mensagem) {
        const erroAnterior = campo.parentNode.querySelector('.erro-mensagem');
        if (erroAnterior) {
            erroAnterior.remove();
        }

        campo.classList.add('campo-erro');

        const divErro = document.createElement('div');
        divErro.className = 'erro-mensagem';
        divErro.textContent = mensagem;
        divErro.style.color = 'red';
        divErro.style.fontSize = '12px';
        divErro.style.marginTop = '2px';

        campo.parentNode.insertBefore(divErro, campo.nextSibling);
    }

    // Função para remover erro
    function removerErro(campo) {
        campo.classList.remove('campo-erro');
        const erro = campo.parentNode.querySelector('.erro-mensagem');
        if (erro) {
            erro.remove();
        }
    }

    // Validação em tempo real
    nomeInput.addEventListener('blur', () => {
        if (nomeInput.value.trim().length < 2) {
            exibirErro(nomeInput, 'Nome deve ter pelo menos 2 caracteres');
        } else {
            removerErro(nomeInput);
        }
    });

    emailInput.addEventListener('blur', () => {
        if (!validarEmail(emailInput.value)) {
            exibirErro(emailInput, 'Email inválido');
        } else {
            removerErro(emailInput);
        }
    });

    dataNascimentoInput.addEventListener('input', () => {
        if (!dataNascimentoInput.value) {
            exibirErro(dataNascimentoInput, 'Data de nascimento é obrigatória');
        } else if (!validarIdade(dataNascimentoInput.value)) {
            exibirErro(dataNascimentoInput, 'Você deve ter pelo menos 13 anos');
        } else {
            removerErro(dataNascimentoInput);
        }
    });

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

            // Validações
            if (!validarEmail(emailInput.value.trim())) {
                mostrarFeedback("Email inválido.", "erro");
                return;
            }

            if (!validarIdade(dataNascimentoInput.value)) {
                mostrarFeedback("Você deve ter pelo menos 13 anos.", "erro");
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
