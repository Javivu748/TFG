import { usePage, router } from '@inertiajs/react';
import { useState ,useEffect } from 'react';
import Layout from '../../Layouts/dashLayout.jsx';
import BotonPrimario from '@/Components/PrimaryButton.jsx';
import '../../../css/auth-css/dashboard.css';
import Alerta from '@/Components/alerta';

export default function DashboardAdm() {
    const { totalUsers, users = { data: [] } ,flash} = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');

    const [alerta, setAlerta] = useState(null);

    const getInitials = (name, email) => {
        const str = name ?? email ?? '';
        return str.slice(0, 2).toUpperCase();
    };

    useEffect(() => {
        const leerAlerta = () => {
            if (flash?.alerta) {
                setAlerta(flash.alerta);
            }
            
        };
        leerAlerta(); 
        document.addEventListener('inertia:finish', leerAlerta);

        return () => {
            document.removeEventListener('inertia:finish', leerAlerta);
        };
    }, []);

    const buscarUser = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            router.get('/admin/dashboard', { search: searchTerm });
        } else {
            router.get('/admin/dashboard');
        }
    };

    const limpiarForm = () => {
        setSearchTerm('');
        router.get('/admin/dashboard');
    };

    return (
        <>
            <Layout />
            
            <main className="dashboard-container">
                <h1>Panel Administrador</h1>

                <section className="dashboard-casos admin-panel">
                    <div className="header-casos">
                        <h2>Administrador Usuarios</h2>
                        <p>Usuarios:{totalUsers}</p>
                    </div>

                    <form onSubmit={buscarUser} className="search-form">
                        <input
                            type="text"
                            placeholder="Buscar usuario por nombre..."
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

                    {users.data.length > 0 ? (
                        <div className="admin-table-wrap">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Usuario</th>
                                        <th>Email</th>
                                        <th>Telefono</th>
                                        <th>Informacion</th>
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
                                            <td>
                                                <BotonPrimario href={`/admin/usuarios/${user.id}`} nombre={<i class="fa-solid fa-user"></i>}></BotonPrimario>
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
            {alerta && <Alerta tipo={alerta.tipo} message={alerta.mensaje} />}
        </>
    );
}