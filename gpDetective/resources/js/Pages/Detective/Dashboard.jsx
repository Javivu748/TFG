// resources/js/Pages/Detective/Dashboard.jsx

import { usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Layout from '../../Layouts/dashLayout.jsx';
import BotonPrimario from '@/Components/PrimaryButton.jsx';
import Alerta from '@/Components/alerta';
import '../../../css/detective/dash.css';

export default function DashboardDetective() {
    const { casos = { data: [] }, totalCasos, detective, flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        if (flash?.alerta) setAlerta(flash.alerta);
    }, [flash]);

    const buscarCaso = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.get('/detective/dashboard', { search: searchTerm });
        } else {
            router.get('/detective/dashboard');
        }
    };

    const limpiarForm = () => {
        setSearchTerm('');
        router.get('/detective/dashboard');
    };

    // Badge de estado visual
    const badgeEstado = (estado) => {
        const estilos = {
            abierto:    { background: '#22c55e22', color: '#22c55e' },
            cerrado:    { background: '#ef444422', color: '#ef4444' },
            pendiente:  { background: '#f59e0b22', color: '#f59e0b' },
        };
        return (
            <span style={{
                padding: '3px 10px',
                borderRadius: '999px',
                fontSize: '0.75rem',
                fontWeight: 600,
                ...(estilos[estado] ?? { background: '#ffffff22', color: '#fff' })
            }}>
                {estado}
            </span>
        );
    };

    return (
        <>
            <Layout />

            <main className="dashboard-container">
                <h1>Panel Detective</h1>

                {/* Tarjeta de info del detective */}
                <section className="dashboard-casos" style={{ marginBottom: '1.5rem' }}>
                    <div className="header-casos">
                        <h2>
                            Bienvenido, {detective?.user?.nombre}
                        </h2>
                        <p>Especialidad: {detective?.especialidad ?? 'Sin especificar'}</p>
                    </div>
                </section>

                {/* Tabla de casos */}
                <section className="dashboard-casos admin-panel">
                    <div className="header-casos">
                        <h2>Mis Casos Asignados</h2>
                        <p>Total: {totalCasos}</p>
                    </div>

                    <form onSubmit={buscarCaso} className="search-form">
                        <input
                            type="text"
                            placeholder="Buscar caso por título..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                        <button type="button" onClick={limpiarForm} className="clear-button">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </form>

                    {casos.data.length > 0 ? (
                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                        <th>Solicitante</th>
                                        <th>Estado</th>
                                        <th>Ver</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {casos.data.map((caso) => (
                                        <tr key={caso.id}>
                                            <td>{caso.titulo}</td>
                                            <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {caso.descripcion}
                                            </td>
                                            <td>{caso.user?.nombre ?? caso.user?.email}</td>
                                            <td>{badgeEstado(caso.estado ?? 'abierto')}</td>
                                            <td>
                                                <BotonPrimario
                                                    href={`/detective/casos/${caso.id}`}
                                                    nombre={<i className="fa-solid fa-folder-open"></i>}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No tienes casos asignados.</p>
                    )}

                    {casos.links && casos.links.length > 3 && (
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
                    )}
                </section>
            </main>

            {alerta && <Alerta tipo={alerta.tipo} message={alerta.mensaje} />}
        </>
    );
}