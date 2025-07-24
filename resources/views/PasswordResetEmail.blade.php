<!DOCTYPE html>
<html>
<head>
    <title>Restablecer Contraseña - TuPáginaWeb.site</title>
    <style>
        /* Estilos básicos para que el correo se vea decente en la mayoría de los clientes */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        .header h1 {
            color: #333;
            margin: 0;
        }
        .content {
            padding: 20px 0;
        }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button {
            display: inline-block;
            background-color: #007bff; /* Un azul bonito, puedes cambiarlo */
            color: #ffffff !important; /* Importante para asegurar el color del texto del botón */
            padding: 12px 25px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 0.9em;
            color: #777;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Restablecer Contraseña</h1>
        </div>
        <div class="content">
            <p>¡Hola, {{ $user->name }}!</p>
            <p>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta en Administra tu dinero. Si tú no solicitaste este cambio, por favor, ignora este correo.</p>
            <p>Puedes ingresar a la aplicacion desde el siguiente botón:</p>

            <div class="button-container">
                <a href="{{ $user->url }}" class="button">Ingresa a administra tu dinero</a>
            </div>

            <p>Tu nueva contraseña es:</p>
            <p>{{ $user->newPassword }}</p>

            <p>Si necesitas ayuda o tienes alguna pregunta, no dudes en contactarnos.</p>
            <p>Te saluda GenialApp</p>
            
            <div class="button-container">
                <a href="{{ $user->urlGenial }}" class="button">Ingresa a GenialApp</a>
            </div>
        </div>
        <div class="footer">
            <p>&copy; {{ date('Y') }} TuPáginaWeb.site. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>