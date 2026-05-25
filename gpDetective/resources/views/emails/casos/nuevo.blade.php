<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Caso registrado</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f4f4; font-family: Arial, sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f4; padding: 40px 0;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

                    
                    

                    
                    <tr>
                        <td align="center" style="padding: 0 40px 24px; margin-top: 24px;">
                            <h1 style="margin:0; font-size:22px; color:#1a1a1a;">
                                Nuevo Caso Registrado
                            </h1>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding: 0 40px 20px; color:#444444; font-size:15px; line-height:1.6;">
                            Nuevo caso de <strong>{{ $user->nombre }}</strong>,<br>
                            El caso ha sido registrado en GinPer y está listo para ser revisado.
                        </td>
                    </tr>

                   
                    <tr>
                        <td style="padding: 0 40px 24px;">
                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="background-color:#f8f9fa; border-left: 4px solid #000000; border-radius:6px; padding:0;">
                                <tr>
                                    <td style="padding: 20px 24px;">

                                        <p style="margin:0 0 16px; font-weight:bold; font-size:15px; color:#1a1a1a;">
                                            Detalles del caso
                                        </p>

                                        <hr style="border:none; border-top:1px solid #e2e8f0; margin-bottom:16px;">

                                        <p style="margin:0 0 4px; font-size:12px; color:#888; text-transform:uppercase; letter-spacing:.5px;">Título</p>
                                        <p style="margin:0 0 16px; font-size:15px; color:#1a1a1a;">{{ $caso->titulo }}</p>

                                        <p style="margin:0 0 4px; font-size:12px; color:#888; text-transform:uppercase; letter-spacing:.5px;">Descripción</p>
                                        <p style="margin:0 0 16px; font-size:15px; color:#1a1a1a;">
                                            {{ $caso->descripcion ?: 'Sin descripción proporcionada' }}
                                        </p>

                                        <p style="margin:0 0 4px; font-size:12px; color:#888; text-transform:uppercase; letter-spacing:.5px;">Fecha</p>
                                        <p style="margin:0; font-size:14px; color:#555; font-family:monospace;">
                                            {{ $caso->created_at->format('d/m/Y') }}
                                        </p>

                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    
                    <tr>
                        <td style="padding: 0 40px 24px; font-size:15px; color:#444;">
                            Puedes revisar todos los detalles y gestionar tu caso desde el panel de control:
                        </td>
                    </tr>

                  
                    <tr>
                        <td align="center" style="padding: 0 40px 32px;">
                            <a href="{{ route('detective.dashboard') }}"
                               style="display:inline-block; background-color:#000000; color:#ffffff; text-decoration:none;
                                      font-size:15px; font-weight:bold; padding:12px 32px;">
                                Ver mi caso en el dashboard
                            </a>
                        </td>
                    </tr>

                   
                    <tr>
                        <td align="center" style="padding: 24px 40px; border-top:1px solid #e2e8f0;">
                            <p style="margin:0; font-size:14px; color:#888;">
                                Saludos, <strong>{{ config('app.name') }}</strong><br>
                                <em>Investigación de casos inteligente</em>
                                <img src="https://lh3.googleusercontent.com/gps-cs-s/APNQkAFEqoeNzdnsDu9fm1UsiEK8b0vR7tm7sDfE0QUNptUhxtALdi_iADXahyQQ8SGp0DNHASCPL9ChL9bAaerxVL4A3QlGEpXMNjm31cV5-wpPh6kXkljJsQbwUSjS-L57IshLCdN2=w543-h298-k-no" alt="gpDetective" style="max-width:80px; height:auto;" align="left">
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>