<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Caso cerrado correctamente</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background: #f5f5f5; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; overflow: hidden;">
                    <tr>
                        <td style="padding: 24px;">
                            <h1 style="margin-top: 0;">Caso cerrado correctamente</h1>
                            <p>¡Hola {{ $user->nombre }}!</p>
                            <p>Tu caso <strong>{{ $caso->titulo }}</strong> se ha cerrado correctamente.</p>
                            <p>Gracias por confiar en nosotros. Si necesitas más información, puedes responder a este correo y te ayudaremos lo antes posible.</p>
                            <p>Saludos,<br>{{ config('app.name') }}</p>
                            <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFEqoeNzdnsDu9fm1UsiEK8b0vR7tm7sDfE0QUNptUhxtALdi_iADXahyQQ8SGp0DNHASCPL9ChL9bAaerxVL4A3QlGEpXMNjm31cV5-wpPh6kXkljJsQbwUSjS-L57IshLCdN2=w543-h298-k-no" alt="Logo Ginper" style="max-width: 150px; height: auto; display: block; margin: 0 auto;">
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
