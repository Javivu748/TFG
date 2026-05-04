import { usePage, router } from '@inertiajs/react';
import Layout from '../../Layouts/dashLayout.jsx';
import '../../../css/auth-css/dashboard.css';

export default function DashboardAdm() {
    const { auth, users = { data: [] } } = usePage().props;

    const getInitials = (name, email) => {
        const str = name ?? email ?? '';
        return str.slice(0, 2).toUpperCase();
    };

    return (
        <>
            <Layout />
            <main className="dashboard-container">
                <h1>Panel Administrador</h1>

                <section className="dashboard-casos admin-panel">
                    <div className="header-casos">
                        <h2>Usuarios registrados</h2>
                        <p>Usuarios Registrados:{users.data.length}</p>
                    </div>

                    {users.data.length > 0 ? (
                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Email</th>
                                        <th>Telefono</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr key={user.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="user-avatar">
                                                        {getInitials(user.nombre, user.email)}
                                                    </div>
                                                    <span>{user.nombre ?? user.email}</span>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>
                                                {user.telefono ?? 'Sin teléfono'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No hay usuarios para mostrar.</p>
                    )}
                    {users.links && users.links.length > 3 ? (
                        <div className="paginacion">
                            {users.links.map((link, index) => (
                                <button
                                    key={index}
                                    onClick={() => link.url && router.visit(link.url, { preserveScroll: true })}
                                    disabled={!link.url || link.active}
                                    className={link.active ? 'pagina-activa' : ''}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    ) : null}
                </section>
            </main>
        </>
    );
}