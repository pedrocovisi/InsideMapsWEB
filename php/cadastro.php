<?php
include 'config.php'; // conecta ao banco

// Recebe os dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];

// Prepara o SQL (use sempre prepared statements em produção!)
$sql = "INSERT INTO usuarios (nome, email) VALUES ('$nome', '$email')";

if ($conn->query($sql) === TRUE) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
