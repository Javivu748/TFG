import '../../css/dashLayout.css';
import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogoSecond';
import BotonSecundario from '@/Components/SecondaryButton';
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
                        <BotonSecundario nombre="Inicio" href="/"></BotonSecundario>
                    </div>
                    <div className={`boton-animado ${botonesVisibles[1] ? 'visible' : ''}`}>
                        <BotonSecundario nombre="Crear Caso" href="/crear-caso"></BotonSecundario>
                    </div>
                    <div className={`boton-animado ${botonesVisibles[2] ? 'visible' : ''}`}>
                        <BotonSecundario nombre="Perfil" href="/"></BotonSecundario>
                    </div>
                    <div className={`boton-animado ${botonesVisibles[3] ? 'visible' : ''}`}>
                        <BotonSalir nombre="Cerrar Sesion" pulsar={handleLogout}></BotonSalir>
                    </div>
                </div>
            </div>
        </>
    );
}