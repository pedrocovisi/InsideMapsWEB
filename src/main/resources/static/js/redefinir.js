document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('redefinirSenhaForm');
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const novaSenha = document.getElementById('novaSenha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;
        const button = form.querySelector('button[type="submit"]');
        
        // Validação: verifica se as senhas coincidem
        if (novaSenha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        // Validação: verifica se a senha tem pelo menos 6 caracteres e 1 número
        if (novaSenha.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (!/\d/.test(novaSenha)) {
            alert('A senha deve conter pelo menos 1 número.');
            return;
        }

        // Captura o token da URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        // Verifica se o token existe na URL
        if (!token) {
            alert('Token de recuperação não encontrado. Solicite uma nova recuperação de senha.');
            window.location.href = 'recuperar.html';
            return;
        }

        // Desabilita o botão para evitar múltiplos cliques
        button.disabled = true;
        const textoOriginal = button.textContent;
        button.textContent = 'Redefinindo...';

        try {
            const response = await fetch('http://localhost:8080/api/usuarios/redefinir-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    token: token, 
                    novaSenha: novaSenha 
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Sucesso - redireciona para o login
                alert('Senha redefinida com sucesso! Você será redirecionado para o login.');
                window.location.href = 'login.html';
            } else {
                // Erro do servidor (token expirado, inválido, etc.)
                alert(data.message || 'Erro ao redefinir senha.');
                
                // Se o token expirou ou é inválido, redireciona para solicitar nova recuperação
                if (response.status === 400 && data.message.includes('Token')) {
                    setTimeout(() => {
                        alert('Você será redirecionado para solicitar uma nova recuperação.');
                        window.location.href = 'recuperar.html';
                    }, 2000);
                }
            }
        } catch (error) {
            // Erro de conexão ou outros erros
            console.error('Erro ao redefinir a senha:', error);
            alert('Erro de conexão com o servidor. Verifique sua internet e tente novamente.');
        } finally {
            // Reabilita o botão independente do resultado
            button.disabled = false;
            button.textContent = textoOriginal;
        }
    });
});
