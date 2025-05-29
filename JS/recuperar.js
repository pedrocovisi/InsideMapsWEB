document.getElementById('recuperarSenhaForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const button = event.target.querySelector('button[type="submit"]');
    
    button.disabled = true;
    button.textContent = 'Enviando...';

    try {
        const response = await fetch('http://localhost:8080/api/recuperar-senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Instruções de recuperação enviadas para seu e-mail!');
            document.getElementById('email').value = '';
        } else {
            alert(data.message || 'Erro ao processar solicitação.');
        }
    } catch (error) {
        console.error('Erro ao solicitar recuperação:', error);
        alert('Erro de conexão. Tente novamente.');
    } finally {
        button.disabled = false;
        button.textContent = 'Receber Instruções';
    }
});
