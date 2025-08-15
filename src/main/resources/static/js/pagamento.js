document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 DOM carregado, iniciando pagamento.js");
  
    const form = document.querySelector("form");
    if (!form) {
      console.error("❌ Formulário não encontrado!");
      return;
    }
    form.setAttribute("novalidate", "");
  
    const campos = {
      nomeCompleto: form.querySelector('input[placeholder="Ex: João da Silva"]'),
      email: form.querySelector('input[type="email"]'),
      endereco: form.querySelector('input[placeholder="Rua, número, bairro"]'),
      cidade: form.querySelector('input[placeholder="Cidade"]'),
      estado: form.querySelector('input[placeholder="Estado"]'),
      cep: form.querySelector('input[placeholder="00000-000"]'),
      nomeCartao: form.querySelector('input[placeholder="Como impresso no cartão"]'),
      numeroCartao: form.querySelector('input[placeholder="0000 0000 0000 0000"]'),
      mesValidade: form.querySelector('input[placeholder="MM"]'),
      anoValidade: form.querySelector('input[placeholder="AA"]'),
      cvv: form.querySelector('input[placeholder="***"]')
    };
  
    function exibirErro(campo, mensagem) {
      removerErro(campo);
      const divErro = document.createElement("div");
      divErro.className = "erro-mensagem";
      divErro.style.color = "red";
      divErro.style.fontSize = "12px";
      divErro.textContent = mensagem;
      campo.classList.add("campo-erro");
      campo.parentNode.appendChild(divErro);
    }
  
    function removerErro(campo) {
      campo.classList.remove("campo-erro");
      const erro = campo.parentNode.querySelector(".erro-mensagem");
      if (erro) erro.remove();
    }
  
    function validarEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    function validarNumeroCartao(num) {
      return /^\d{16}$/.test(num.replace(/\s/g, ""));
    }
  
    function validarCVV(cvv) {
      return /^\d{3,4}$/.test(cvv);
    }
  
    function validarCEP(cep) {
      return /^\d{5}-\d{3}$/.test(cep);
    }
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      let temErro = false;
  
      // Validações
      if (campos.nomeCompleto.value.trim().length < 3) {
        exibirErro(campos.nomeCompleto, "Informe seu nome completo");
        temErro = true;
      } else removerErro(campos.nomeCompleto);
  
      if (!validarEmail(campos.email.value)) {
        exibirErro(campos.email, "E-mail inválido");
        temErro = true;
      } else removerErro(campos.email);
  
      if (campos.endereco.value.trim().length < 5) {
        exibirErro(campos.endereco, "Endereço inválido");
        temErro = true;
      } else removerErro(campos.endereco);
  
      if (campos.cidade.value.trim().length < 2) {
        exibirErro(campos.cidade, "Cidade inválida");
        temErro = true;
      } else removerErro(campos.cidade);
  
      if (campos.estado.value.trim().length < 2) {
        exibirErro(campos.estado, "Estado inválido");
        temErro = true;
      } else removerErro(campos.estado);
  
      if (!validarCEP(campos.cep.value)) {
        exibirErro(campos.cep, "CEP inválido (formato 00000-000)");
        temErro = true;
      } else removerErro(campos.cep);
  
      if (campos.nomeCartao.value.trim().length < 3) {
        exibirErro(campos.nomeCartao, "Nome no cartão inválido");
        temErro = true;
      } else removerErro(campos.nomeCartao);
  
      if (!validarNumeroCartao(campos.numeroCartao.value)) {
        exibirErro(campos.numeroCartao, "Número do cartão inválido");
        temErro = true;
      } else removerErro(campos.numeroCartao);
  
      if (!/^(0[1-9]|1[0-2])$/.test(campos.mesValidade.value)) {
        exibirErro(campos.mesValidade, "Mês inválido");
        temErro = true;
      } else removerErro(campos.mesValidade);
  
      if (!/^\d{2}$/.test(campos.anoValidade.value)) {
        exibirErro(campos.anoValidade, "Ano inválido");
        temErro = true;
      } else removerErro(campos.anoValidade);
  
      if (!validarCVV(campos.cvv.value)) {
        exibirErro(campos.cvv, "CVV inválido");
        temErro = true;
      } else removerErro(campos.cvv);
  
      if (temErro) {
        console.log("❌ Erros encontrados, abortando envio");
        return;
      }
  
      const dadosPagamento = {
        nomeCompleto: campos.nomeCompleto.value.trim(),
        email: campos.email.value.trim(),
        endereco: campos.endereco.value.trim(),
        cidade: campos.cidade.value.trim(),
        estado: campos.estado.value.trim(),
        cep: campos.cep.value.trim(),
        nomeCartao: campos.nomeCartao.value.trim(),
        numeroCartao: campos.numeroCartao.value.replace(/\s/g, ""),
        mesValidade: campos.mesValidade.value.trim(),
        anoValidade: campos.anoValidade.value.trim(),
        cvv: campos.cvv.value.trim()
      };
  
      try {
        const resp = await fetch("http://localhost:8080/api/pagamentos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dadosPagamento)
        });
  
        if (resp.ok) {
          alert("Pagamento processado com sucesso!");
          window.location.href = "confirmacao.html";
        } else {
          const erro = await resp.text();
          alert(`Erro ao processar pagamento: ${erro}`);
        }
      } catch (e) {
        console.error("Erro de conexão:", e);
        alert("Não foi possível conectar ao servidor.");
      }
    });
  });
  