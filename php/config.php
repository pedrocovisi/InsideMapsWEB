<?php
    $dbHost = '143.106.241.4';
    $dbUsername = 'cl203399';
    $dbPassword = 'cl*16122007';
    $dbName = 'cl203399';

    $conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

    if ($conn->connect_error) {
        die("Conexão falhou: " . $conn->connect_error);
    } else {
        echo "Conectado com sucesso!";
    }

    
?>