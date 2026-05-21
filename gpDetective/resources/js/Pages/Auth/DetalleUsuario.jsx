import Layout from '../../Layouts/dashLayout.jsx';
import { usePage, router } from '@inertiajs/react';
import '../../../css/auth-css/detalles.css';
import BotonPrimario from '@/Components/PrimaryButton.jsx';
import AlertConfirm from '@/Components/AlertConfirm.jsx';
import Alerta from '@/Components/alerta.jsx';
import { useState ,useEffect } from 'react';

export default function DetalleUsuario() {
    const { users: user ,flash} = usePage().props;
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [alerta, setAlerta] = useState(null);

    useEffect(() => {
        if (flash?.alerta) {
            setAlerta(flash.alerta);
        }
    }, [flash]);

    if (!user) {
        return (
            <>
                <Layout />
                <main className="detalle-container">
                    <p>Usuario no encontrado</p>
                </main>
            </> 
        );
    }


    const getInitials = (name, email) => {
        const str = name ?? email ?? '';
        return str.slice(0, 2).toUpperCase();
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Pendiente':
                return '#fbbf24';
            case 'En Proceso':
                return '#3b82f6';
            default:
                return '#6b7280';
        }
    };

    return (
        <>
            <Layout />
            {mostrarAlerta && (
                <AlertConfirm
                    message={`¿Estás seguro de que deseas eliminar a ${user.nombre}?`}
                    onConfirm={() => router.delete(`/admin/usuarios/${user.id}`)}
                    onCancel={() => setMostrarAlerta(false)}
                />
            )}
            <main className="detalle-container">
                <div className="detalle-header">
                    <BotonPrimario nombre={<> <i className="fa-solid fa-arrow-left"></i> Volver</>} href={'../../admin/dashboard'} />
                    <button
                        onClick={() => setMostrarAlerta(true)}
                        className="eliminar-button"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>

                <section className="detalle-usuario">
                    <div className="usuario-card">
                        <div className="usuario-header">
                            <div className="usuario-avatar-grande">
                                {getInitials(user.nombre, user.email)}
                            </div>
                            <div className="usuario-info">
                                <h1>{user.nombre}</h1>
                            </div>
                        </div>

                        <div className="usuario-detalles">
                            <div className="detalle-item">
                                <span className="detalle-label">Email:</span>
                                <span className="detalle-valor">{user.email}</span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Teléfono:</span>
                                <span className="detalle-valor">{user.telefono ?? 'No especificado'}</span>
                            </div>
                            <div className="detalle-item">
                                <span className="detalle-label">Miembro desde:</span>
                                <span className="detalle-valor">
                                    {new Date(user.created_at).toLocaleDateString('es-ES', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="detalle-casos">
                    <div className="casos-header">
                        <h2>Casos del usuario</h2>
                        <span className="casos-count">{user.casos?.length ?? 0}</span>
                    </div>

                    {user.casos && user.casos.length > 0 ? (
                        <div className="casos-table-wrap">
                            <table className="casos-table">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descripción</th>
                                        <th>Estado</th>
                                        <th>Fecha de creación</th>
                                        <th><i class="fa-solid fa-paperclip"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.casos.map((caso) => (
                                        <tr key={caso.id}>
                                            <td className="titulo-caso">{caso.titulo}</td>
                                            <td className="descripcion-caso">
                                                {caso.descripcion}
                                            </td>
                                            <td>
                                                <span
                                                    className="estado-badge"
                                                    style={{ backgroundColor: getEstadoColor(caso.estado) }}
                                                >
                                                    {caso.estado}
                                                </span>
                                            </td>
                                            <td className="fecha-caso">
                                                {new Date(caso.created_at).toLocaleDateString('es-ES')}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => router.post(`/admin/casos/${caso.id}/alternar-estado`)}
                                                    className="boton-primario"
                                                >
                                                    <i className="fa-solid fa-exchange-alt"></i>
                                                </button>
                                                <button
                                                    onClick={() => router.delete(`/admin/casos/${caso.id}`)}
                                                    className="boton-primario"
                                                >
                                                    <i class="fa-solid fa-check-double"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="casos-vacio">
                            <i className="fa-solid fa-folder-open"></i>
                            <p>Este usuario no tiene casos registrados</p>
                        </div>
                    )}
                </section>
            </main>
            {alerta && <Alerta tipo={alerta.tipo} message={alerta.mensaje} recargar={true}/>}
        </>
    );
}