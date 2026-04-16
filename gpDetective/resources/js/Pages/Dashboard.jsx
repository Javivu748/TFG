import { usePage } from '@inertiajs/react';
import Layout from '../Layouts/dashLayout.jsx';
import '../../css/auth-css/dashboard.css';

export default function Dashboard() {
    const { auth, casos = [] } = usePage().props;

    return (
        <>
            <Layout />

            <main className="dashboard-container">
                <h1>Bienvenido, {auth.user.nombre}</h1>

                <section className="dashboard-casos">
                    <h2>Mis casos</h2>

                    {casos.length > 0 ? (
                        <ul>
                            {casos.map((caso) => (
                                <li key={caso.id}>
                                    <div className="tituloCaso">
                                        <h3>{caso.titulo ?? 'Caso sin título'}</h3>
                                    </div>
                                    <p>{caso.descripcion ?? 'Sin descripción'}</p>
                                    {caso.estado && <span className="estado">Estado: {caso.estado}</span>}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tienes casos registrados.</p>
                    )}
                </section>
            </main>
        </>
    );
}
