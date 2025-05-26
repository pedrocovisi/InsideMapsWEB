require('dotenv').config(); // carrega as variáveis do .env
const express = require('express');
const nodemailer = require('nodemailer');
const User = require('./models/User'); // Supondo que você tenha um modelo de usuário
const router = express.Router();

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const jwt = require('jsonwebtoken');

function gerarToken(usuario) {
    return jwt.sign(
        { id: usuario._id }, // payload
        process.env.JWT_SECRET, // chave secreta (adicione ao seu .env)
        { expiresIn: '1h' } // tempo de expiração
    );
}


// Endpoint para recuperação de senha
router.post('/recuperar-senha', async (req, res) => {
    const { email } = req.body;

    try {
        // Verifica se o usuário existe
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: 'Email não encontrado.' });
        }

        // Gera um token de recuperação (você pode usar JWT ou outro método)
        const token = gerarToken(usuario); // Implemente a função para gerar um token

        // Cria o link de recuperação
        const link = `http://seu-dominio.com/redefinir-senha.html?token=${token}`;

        // Envia o email
        await transporter.sendMail({
            from: EMAIL_USER,
            to: email,
            subject: 'Recuperação de Senha',
            text: `Clique no link para redefinir sua senha: ${link}`
        });

        res.status(200).json({ message: 'Instruções enviadas para o seu email.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro ao enviar email.' });
    }
});

module.exports = router;
