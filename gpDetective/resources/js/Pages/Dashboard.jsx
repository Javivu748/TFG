import { useState, useEffect } from 'react';
import { usePage, router } from '@inertiajs/react';
import Layout from '../Layouts/dashLayout.jsx';
import '../../css/auth-css/dashboard.css';
import BotonPrimario from '@/Components/PrimaryButton';
import Alerta from '@/Components/alerta';




export default function Dashboard() {
    const { auth, casos = { data: [], links: [] } } = usePage().props;

    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        const leerAlerta = () => {
            const guardada = sessionStorage.getItem('alerta');
            if (guardada) {
                setAlerta(JSON.parse(guardada));
                sessionStorage.removeItem('alerta');
            }
        };
        leerAlerta(); 
        document.addEventListener('inertia:finish', leerAlerta);

        return () => {
            document.removeEventListener('inertia:finish', leerAlerta);
        };
    }, []);

    return (
        <>
            <Layout />

            <main className="dashboard-container">
                <h1>Bienvenido, {auth.user.nombre}</h1>

                <section className="dashboard-casos">
                    <div className="header-casos">
                        <h2>Mis Casos</h2>
                        <BotonPrimario nombre="Nuevo caso" href={route('crear.caso')} />
                    </div>

                    {casos.data.length > 0 ? (
                        <>
                            <ul>
                                {casos.data.map((caso) => (
                                    <li key={caso.id}>
                                        <div className="tituloCaso">
                                            <h3>{caso.titulo ?? 'Caso sin título'}</h3>
                                        </div>
                                        <p>{caso.descripcion ?? 'Sin descripción'}</p>
                                        {caso.estado && <span className="estado">Estado: {caso.estado}</span>}
                                    </li>
                                ))}
                            </ul>

                            <div className="paginacion">
                                {casos.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
                                        disabled={!link.url || link.active}
                                        className={link.active ? 'pagina-activa' : ''}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No tienes casos registrados.</p>
                    )}
                    {alerta && <Alerta tipo={alerta.tipo} message={alerta.mensaje} />}
                </section>
            </main>
        </>
    );
}