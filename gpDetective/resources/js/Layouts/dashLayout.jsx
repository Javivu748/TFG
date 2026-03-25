import '../../css/prLayout.css';
import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import BotonPrimario from '@/Components/PrimaryButton';
import BotonSalir from '@/Components/ExitButton';

export default function Layout() {

    const { auth } = usePage().props;
    const user = auth?.user;

    const [botonesVisibles, setBotonesVisibles] = useState([false, false, false, false]);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    useEffect(() => {
        // Primer botón aparece a los 200ms
        setTimeout(() => {
            setBotonesVisibles([true, false, false]);
        }, 200);

        // Segundo botón aparece a los 400ms
        setTimeout(() => {
            setBotonesVisibles([true, true, false]);
        }, 400);

        // Tercer botón aparece a los 600ms
        setTimeout(() => {
            setBotonesVisibles([true, true, true, false]);
        }, 600);

        setTimeout(() => {
            setBotonesVisibles([true, true, true, true]);
        }, 800);
    }, []);

    return (
        <>
            <div className="cabecero">
                <a href='/' className="imagen" id='logo'>
                    <ApplicationLogo></ApplicationLogo>
                </a>

                <div className="botones">
                    <div className={`boton-animado ${botonesVisibles[0] ? 'visible' : ''}`}>
                        <BotonPrimario nombre="Inicio" href="/"></BotonPrimario>
                    </div>
                    <div className={`boton-animado ${botonesVisibles[1] ? 'visible' : ''}`}>
                        <BotonPrimario nombre="Sobre" href="/sobre"></BotonPrimario>
                    </div>
                    <div className={`boton-animado ${botonesVisibles[2] ? 'visible' : ''}`}>
                        <BotonPrimario nombre="Perfil" href="/"></BotonPrimario>
                    </div>
                    <div className={`boton-animado ${botonesVisibles[3] ? 'visible' : ''}`}>
                        <BotonSalir nombre="Cerrar Sesion" pulsar={handleLogout}></BotonSalir>
                    </div>
                </div>
            </div>
        </>
    );
}