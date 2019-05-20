<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $_POST= json_decode(file_get_contents('php://input'), true);

    $monto = $_POST['monto'];
    $concepto = $_POST['concepto'];
    $unidades = $_POST['unidades'];
    $nombreCliente = $_POST['nombreCliente'];
    $email = $_POST['email'];
    $telefono = $_POST['telefono'];

    
    $resp = array(
        'monto'=> $monto,
        'concepto'=> $concepto,
        'unidades'=> $unidades,
        'nombreCliente'=> $nombreCliente,
        'email'=> $email,
        'telefono'=> $telefono
    );
    

    echo json_encode($resp);
}





?>
