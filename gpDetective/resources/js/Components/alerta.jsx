import { useState } from 'react';
import Logo from '../Components/ApplicationLogo';
import '../../css/alerta.css'

export default function Alerta({ message, tipo, recargar }) {
    const [visible, setVisible] = useState(true);
    const [saliendo, setSaliendo] = useState(false);

    const cerrar = () => {
        setSaliendo(true);
        setTimeout(() => {
            setVisible(false);
            if (recargar === true) {
                window.location.reload();
            }
        }, 300);
    };

    let colorAlerta = '';

    switch (tipo) {
        case 'Error':
            colorAlerta = 'bg-red-600 text-white';
            break;
        case 'Exito':
            colorAlerta = 'bg-green-600 text-white';
            break;
        case 'Info':
            colorAlerta = 'bg-black text-white';
            break;
        case 'Bienvenido':
            colorAlerta = 'bg-black text-white';
            break;
        default:
            colorAlerta = 'bg-gray-600 text-white';
    }


    if (!visible) return null;

    return (
        <>


            <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 fondo-modal ${saliendo ? 'saliendo' : ''}`}>
                <div className={`bg-white rounded-lg shadow-lg w-full max-w-md mx-4 caja-modal ${saliendo ? 'saliendo' : ''}`}>

                    <div className={`flex items-center justify-between ${colorAlerta} px-4 py-3 rounded-t-lg`}>
                        <h5 className="font-semibold">{tipo}</h5>
                        <button onClick={cerrar} className="text-white hover:text-gray-200 text-xl leading-none">&times;</button>
                    </div>

                    <div className="px-4 py-4 text-sm text-gray-700">
                        <p>{message}</p>
                    </div>

                    <div className="flex justify-end px-4 py-3 border-t">
                        <div className="imagenAlert">
                            <Logo></Logo>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}