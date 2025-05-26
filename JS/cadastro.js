document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  form.setAttribute('novalidate', '');

  // Função para validar email
  function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Função para validar senha (mínimo 6 caracteres, pelo menos 1 número)
  function validarSenha(senha) {
    return senha.length >= 6 && /\d/.test(senha);
  }

  // Função para validar idade (mínimo 13 anos)
  function validarIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesAtual = hoje.getMonth();
    const mesNascimento = nascimento.getMonth();
    
    if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    
    return idade >= 13;
  }

  // Função para exibir erro
  function exibirErro(campo, mensagem) {
    // Remove erro anterior se existir
    const erroAnterior = campo.parentNode.querySelector('.erro-mensagem');
    if (erroAnterior) {
      erroAnterior.remove();
    }

    // Adiciona classe de erro ao campo
    campo.classList.add('campo-erro');

    // Cria elemento de erro
    const divErro = document.createElement('div');
    divErro.className = 'erro-mensagem';
    divErro.textContent = mensagem;
    divErro.style.color = 'red';
    divErro.style.fontSize = '12px';
    divErro.style.marginTop = '2px';

    // Insere o erro após o campo
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

  // Função para limpar todos os erros
  function limparErros() {
    const campos = form.querySelectorAll('input');
    campos.forEach(campo => removerErro(campo));
  }

  // Validação em tempo real
  const campos = {
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    senha: document.getElementById("senha"),
    dataNascimento: document.getElementById("data-nascimento")
  };

  // Validação do nome em tempo real
  campos.nome.addEventListener('blur', () => {
    if (campos.nome.value.trim().length < 2) {
      exibirErro(campos.nome, 'Nome deve ter pelo menos 2 caracteres');
    } else {
      removerErro(campos.nome);
    }
  });

  // Validação do email em tempo real
  campos.email.addEventListener('blur', () => {
    if (!validarEmail(campos.email.value)) {
      exibirErro(campos.email, 'Email inválido');
    } else {
      removerErro(campos.email);
    }
  });

  // Validação da senha em tempo real
  campos.senha.addEventListener('blur', () => {
    if (!validarSenha(campos.senha.value)) {
      exibirErro(campos.senha, 'Senha deve ter pelo menos 6 caracteres e conter pelo menos 1 número');
    } else {
      removerErro(campos.senha);
    }
  });

  // Validação da data de nascimento em tempo real
  campos.dataNascimento.addEventListener('blur', () => {
    if (!campos.dataNascimento.value) {
      exibirErro(campos.dataNascimento, 'Data de nascimento é obrigatória');
    } else if (!validarIdade(campos.dataNascimento.value)) {
      exibirErro(campos.dataNascimento, 'Você deve ter pelo menos 13 anos');
    } else {
      removerErro(campos.dataNascimento);
    }
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // Limpa erros anteriores
    limparErros();

    const nome = campos.nome.value.trim();
    const email = campos.email.value.trim();
    const senha = campos.senha.value;
    const dataNascimento = campos.dataNascimento.value;

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

    if (!senha || !validarSenha(senha)) {
      exibirErro(campos.senha, 'Senha deve ter pelo menos 6 caracteres e conter pelo menos 1 número');
      temErro = true;
    }

    if (!dataNascimento) {
      exibirErro(campos.dataNascimento, 'Data de nascimento é obrigatória');
      temErro = true;
    } else if (!validarIdade(dataNascimento)) {
      exibirErro(campos.dataNascimento, 'Você deve ter pelo menos 13 anos');
      temErro = true;
    }

    // Se há erros, não envia o formulário
    if (temErro) {
      return;
    }

    const usuario = {
      nome,
      email,
      senha,
      dataNascimento,
      administrador: 0,
      status: 1
    };

    // Desabilita o botão de submit durante o envio
    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('input[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('btn-loading');
      const textoOriginal = submitBtn.textContent || submitBtn.value;
      submitBtn.textContent = 'Cadastrando...';
      submitBtn.value = 'Cadastrando...';
    }

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
        window.location.href = "login.html";
      } else {
        const errorData = await response.json().catch(() => response.text());
        
        // Se o erro for um objeto com campos específicos (do backend)
        if (typeof errorData === 'object' && errorData !== null) {
          // Limpa erros anteriores
          limparErros();
          
          // Exibe erros específicos para cada campo
          if (errorData.nome) exibirErro(campos.nome, errorData.nome);
          if (errorData.email) exibirErro(campos.email, errorData.email);
          if (errorData.senha) exibirErro(campos.senha, errorData.senha);
          if (errorData.dataNascimento) exibirErro(campos.dataNascimento, errorData.dataNascimento);
          
          // Se houver outros erros não específicos
          const outrosErros = Object.keys(errorData).filter(key => 
            !['nome', 'email', 'senha', 'dataNascimento'].includes(key)
          );
          
          if (outrosErros.length > 0) {
            alert(`Erro ao cadastrar: ${Object.values(errorData).join(', ')}`);
          }
        } else {
          // Erro genérico ou string
          alert(`Erro ao cadastrar: ${errorData}`);
        }
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro de conexão com o servidor.");
    } finally {
      // Reabilita o botão
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('btn-loading');
        submitBtn.textContent = textoOriginal;
        submitBtn.value = textoOriginal;
      }
    }
  });
});