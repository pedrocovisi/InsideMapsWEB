document.getElementById('redefinirSenhaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const novaSenha = document.getElementById('novaSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (novaSenha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8080/api/redefinir-senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, novaSenha })
        });

        if (response.ok) {
            alert('Senha redefinida com sucesso!');
            window.location.href = 'login.html';
        } else {
            const errorData = await response.json();
            alert(errorData.message);
        }
    } catch (error) {
        console.error('Erro ao redefinir a senha:', error);
        alert('Erro ao redefinir a senha.');
    }
});
