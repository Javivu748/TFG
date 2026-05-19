import { useState } from 'react';
import Logo from './ApplicationLogo';
import '../../css/alerta.css'

export default function ALertConfirm({ message, onConfirm, onCancel }) {
    const [visible, setVisible] = useState(true);
    const [saliendo, setSaliendo] = useState(false);

    const cerrar = () => {
        setSaliendo(true);
        setTimeout(() => {
            setVisible(false);
            onCancel && onCancel();
        }, 300);
    };

    const confirmar = () => {
        setSaliendo(true);
        setTimeout(() => {
            setVisible(false);
            onConfirm && onConfirm();
        }, 300);
    };

    if (!visible) return null;

    return (
        <>
            <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 fondo-modal ${saliendo ? 'saliendo' : ''}`}>
                <div className={`bg-white rounded-lg shadow-lg w-full max-w-md mx-4 caja-modal ${saliendo ? 'saliendo' : ''}`}>

                    <div className="flex items-center justify-between bg-black text-white px-4 py-3 rounded-t-lg">
                        <h5 className="font-semibold">Confirmación</h5>
                        <button onClick={cerrar} className="text-white hover:text-gray-200 text-xl leading-none">&times;</button>
                    </div>

                    <div className="px-4 py-4 text-sm text-gray-700">
                        <p>{message}</p>
                    </div>

                    <div className="flex justify-between px-3  py-3 border-t">
                        <div className="botones">
                            <button onClick={cerrar} className="boton-cancelar">
                                <i class="fa-solid fa-x"></i>
                            </button>
                            <button onClick={confirmar} className="boton-confirmar">
                                <i class="fa-solid fa-check"></i>
                            </button>
                        </div>
                        <div className="imagenAlert">
                            <Logo></Logo>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}