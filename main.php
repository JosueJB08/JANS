<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sitio en Mantenimiento</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .container {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            padding: 60px 40px;
            max-width: 600px;
            width: 100%;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: fadeIn 0.8s ease-in;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .icon {
            font-size: 80px;
            margin-bottom: 20px;
            animation: bounce 2s infinite;
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
        }

        h1 {
            color: #333;
            font-size: 2.5em;
            margin-bottom: 20px;
            font-weight: 700;
        }

        p {
            color: #666;
            font-size: 1.1em;
            line-height: 1.6;
            margin-bottom: 30px;
        }

        .info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 30px;
        }

        .info p {
            margin: 0;
            color: #555;
        }

        .contact {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s;
        }

        .contact:hover {
            color: #764ba2;
        }

        .loader {
            display: inline-block;
            margin-top: 20px;
        }

        .loader span {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #667eea;
            margin: 0 5px;
            animation: loading 1.4s infinite ease-in-out both;
        }

        .loader span:nth-child(1) {
            animation-delay: -0.32s;
        }

        .loader span:nth-child(2) {
            animation-delay: -0.16s;
        }

        @keyframes loading {
            0%, 80%, 100% {
                transform: scale(0);
            }
            40% {
                transform: scale(1);
            }
        }

        @media (max-width: 600px) {
            .container {
                padding: 40px 25px;
            }

            h1 {
                font-size: 2em;
            }

            .icon {
                font-size: 60px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="icon">🔧</div>
        <h1>Estamos en Mantenimiento</h1>
        <p>Nuestro sitio web está siendo actualizado para brindarte una mejor experiencia. Volveremos muy pronto.</p>
        
        <div class="info">
            <p><strong>Tiempo estimado:</strong> Algunas horas</p>
        </div>

        <p>¿Necesitas ayuda urgente?<br>
        Contáctanos en: <a href="mailto:contacto@tuempresa.com" class="contact">contacto@tuempresa.com</a></p>

        <div class="loader">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</body>
</html>