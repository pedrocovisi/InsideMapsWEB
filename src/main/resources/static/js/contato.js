document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.setAttribute('novalidate', '');
    form.setAttribute('id', 'contatoForm');

    // Função para validar email
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
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

    // Referências dos campos
    const campos = {
        nome: document.getElementById("name"),
        email: document.getElementById("email"),
        assunto: document.getElementById("subject"),
        mensagem: document.getElementById("message")
    };

    // Validações em tempo real
    campos.nome.addEventListener('blur', () => {
        if (campos.nome.value.trim().length < 2) {
            exibirErro(campos.nome, 'Nome deve ter pelo menos 2 caracteres');
        } else {
            removerErro(campos.nome);
        }
    });

    campos.email.addEventListener('blur', () => {
        if (!validarEmail(campos.email.value)) {
            exibirErro(campos.email, 'Email inválido');
        } else {
            removerErro(campos.email);
        }
    });

    campos.assunto.addEventListener('blur', () => {
        if (campos.assunto.value.trim().length < 3) {
            exibirErro(campos.assunto, 'Assunto deve ter pelo menos 3 caracteres');
        } else {
            removerErro(campos.assunto);
        }
    });

    campos.mensagem.addEventListener('blur', () => {
        const mensagem = campos.mensagem.value.trim();
        if (mensagem.length < 10) {
            exibirErro(campos.mensagem, 'Mensagem deve ter pelo menos 10 caracteres');
        } else if (mensagem.length >= 5000) {
            exibirErro(campos.mensagem, 'Mensagem deve ter no máximo 5.000 caracteres');
        } else {
            removerErro(campos.mensagem);
        }
    });    

    // Submit do formulário
    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = campos.nome.value.trim();
        const email = campos.email.value.trim();
        const assunto = campos.assunto.value.trim();
        const mensagem = campos.mensagem.value.trim();

        let temErro = false;

        // Validações
        if (!nome || nome.length < 2) {
            exibirErro(campos.nome, 'Nome é obrigatório e deve ter pelo menos 2 caracteres');
            temErro = true;
        }

        if (!email || !validarEmail(email)) {
            exibirErro(campos.email, 'Email válido é obrigatório');
            temErro = true;
        }

        if (!assunto || assunto.length < 3) {
            exibirErro(campos.assunto, 'Assunto é obrigatório e deve ter pelo menos 3 caracteres');
            temErro = true;
        }

        if (!mensagem || mensagem.length < 10) {
            exibirErro(campos.mensagem, 'Mensagem é obrigatória e deve ter pelo menos 10 caracteres');
            temErro = true;
        }

        if (mensagem.length>5000) {
            exibirErro(campos.mensagem, 'Mensagem deve ter no máximo 5000 caracteres');
            temErro = true;
        }

        if (temErro) {
            return;
        }

        // Desabilitar botão
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        const textoOriginal = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';

        try {
            const response = await fetch('http://localhost:8080/api/contatos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    assunto: assunto,
                    mensagem: mensagem
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Mensagem enviada com sucesso! Protocolo: #${data.protocolo}`);
                form.reset();
            } else {
                alert(data.message || 'Erro ao enviar mensagem');
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão com o servidor');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = textoOriginal;
        }
    });

    
});


