document.getElementById('redefinirSenhaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const button = event.target.querySelector('button[type="submit"]');
    
    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    if (novaSenha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
        alert('Token de recuperação não encontrado. Solicite uma nova recuperação de senha.');
        window.location.href = 'recuperar.html';
        return;
    }

    button.disabled = true;
    button.textContent = 'Redefinindo...';

    try {
        const response = await fetch('http://localhost:8080/api/redefinir-senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, novaSenha })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Senha redefinida com sucesso!');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Erro ao redefinir senha.');
            
            if (response.status === 400) {
                setTimeout(() => {
                    window.location.href = 'recuperar.html';
                }, 2000);
            }
        }
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        alert('Erro de conexão. Tente novamente.');
    } finally {
        button.disabled = false;
        button.textContent = 'Redefinir Senha';
    }
});
