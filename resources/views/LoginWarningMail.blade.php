{{-- resources/views/emails/contact.blade.php --}}
<!DOCTYPE html>
<html>
<head>
    <title>Alerta inicio sesion</title>
</head>
<body>
    <h1>Alerta intento inicio sesion a listas-cartera usando el email:</h1>
    <p><strong>{{ $details['emailUser'] }}</strong> </p>
    <p><strong>Fecha:</strong></p>
    <p>{{ $details['fecha'] }}</p>
</body>
</html>