<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecer contraseña</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background-color: #e8e8e8;
            padding: 40px 20px;
            color: #1a1a1a;
        }

        .email-wrapper {
            max-width: 480px;
            margin: 0 auto;
        }

        .email-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            overflow: hidden;
        }

        /* Cabecera negra con el logo */
        .email-header {
            background-color: #1a1a1a;
            padding: 28px 40px;
            text-align: center;
        }

        .email-header img {
            height: 80px;
            width: auto;
        }

        /* Cuerpo */
        .email-body {
            padding: 40px;
        }

        .email-title {
            font-size: 22px;
            font-weight: 600;
            color: #1a1a1a;
            margin-bottom: 16px;
            letter-spacing: -0.5px;
        }

        .email-greeting {
            font-size: 15px;
            color: #4a4a4a;
            line-height: 1.7;
            margin-bottom: 8px;
        }

        .email-text {
            font-size: 14px;
            color: #4a4a4a;
            line-height: 1.7;
            margin-bottom: 32px;
        }

        /* Botón igual que boton-primario */
        .email-button {
            display: block;
            width: 100%;
            padding: 14px 24px;
            background-color: #1a1a1a;
            color: #ffffff !important;
            text-decoration: none;
            text-align: center;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 0.3px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Nota de seguridad */
        .email-note {
            font-size: 13px;
            color: #888;
            margin-top: 24px;
            line-height: 1.6;
            padding-top: 24px;
            border-top: 2px solid #e0e0e0;
        }

        .email-url-label {
            font-size: 12px;
            color: #aaa;
            margin-top: 16px;
            display: block;
        }

        .email-url {
            font-size: 12px;
            color: #888;
            word-break: break-all;
            margin-top: 4px;
            display: block;
            text-decoration: underline;
        }

        /* Footer */
        .email-footer {
            background-color: #f5f5f5;
            border-top: 2px solid #e0e0e0;
            padding: 24px 40px;
            text-align: center;
        }

        .email-footer p {
            font-size: 13px;
            color: #888;
            line-height: 1.6;
        }

        .email-footer strong {
            color: #1a1a1a;
        }

        @media (max-width: 480px) {
            body {
                padding: 20px 12px;
            }

            .email-header,
            .email-body,
            .email-footer {
                padding-left: 24px;
                padding-right: 24px;
            }

            .email-title {
                font-size: 20px;
            }
        }
    </style>
</head>
<body>

    <div class="email-wrapper">
        <div class="email-card">

            {{-- Cabecera con logo --}}
            <div class="email-header">
                <img src="{{ asset('images/GINPERFINALblanco.jpg') }}" alt="{{ config('app.name') }}" />
            </div>

            {{-- Cuerpo --}}
            <div class="email-body">

                <h1 class="email-title">Restablecer contraseña</h1>

                <p class="email-greeting">Hola, <strong>{{ $user->nombre }}</strong>.</p>

                <p class="email-text">
                    Hemos recibido una solicitud para restablecer la contraseña de tu cuenta.
                    Pulsa el botón de abajo para elegir una nueva. Este enlace expirará en
                    <strong>60 minutos</strong>.
                </p>

                <a href="{{ $url }}" class="email-button">
                    Restablecer contraseña
                </a>

                <div class="email-note">
                    Si no solicitaste este cambio, puedes ignorar este correo con total seguridad.
                    Tu contraseña no será modificada.

                    <span class="email-url-label">Si el botón no funciona, copia este enlace en tu navegador:</span>
                    <span class="email-url">{{ $url }}</span>
                </div>

            </div>

            {{-- Footer --}}
            <div class="email-footer">
                <p>© {{ date('Y') }} <strong>{{ config('app.name') }}</strong>. Todos los derechos reservados.</p>
                <p style="margin-top: 6px;">Este correo fue enviado a <strong>{{ $user->email }}</strong></p>
            </div>

        </div>
    </div>

</body>
</html>