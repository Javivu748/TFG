import { usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Layout from '../../Layouts/dashLayout.jsx';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import '../../../css/detective/detalle.css';
import AlertConfirm from '@/Components/AlertConfirm.jsx';
import Alerta from '@/Components/alerta';

const MAP_STYLE = { width: '100%', height: '220px', borderRadius: '6px' };

export default function DetalleCaso() {
    const { caso, flash } = usePage().props;
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [expandedEvidencia, setExpandedEvidencia] = useState(null);
    const [alerta, setAlerta] = useState(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

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
    }, [flash]);

    if (!caso) {
        return (
            <>
                <Layout />
                <main className="detalle-container">
                    <p>Caso no encontrado</p>
                </main>
            </>
        );
    }

    const badgeEstado = (estado) => {
        const estilos = {
            Pendiente: { background: '#f0fdf4', color: '#166534' },
            Proceso: { background: '#fef2f2', color: '#991b1b' },
            pendiente: { background: '#fffbeb', color: '#92400e' },
        };
        return (
            <span
                className="estado-badge"
                style={estilos[estado] ?? { background: '#f3f4f6', color: '#374151' }}
            >
                {estado}
            </span>
        );
    };

    const iniciales = (nombre = '') =>
        nombre
            .split(' ')
            .slice(0, 2)
            .map((n) => n[0]?.toUpperCase() ?? '')
            .join('');

    const descargarEvidencia = (evidenciaId) => {
        window.location.href = `/detective/evidencia/${evidenciaId}/descargar`;
    };

    return (
        <>
            <Layout />
            <main className="detalle-container">
                {mostrarAlerta && (
                    <AlertConfirm
                        message={`¿Estás seguro de que deseas cerrar este caso?`}
                        onConfirm={() => router.delete(`/detective/casos/${caso.id}`)}
                        onCancel={() => setMostrarAlerta(false)}
                    />
                )}

                {/* Header */}
                <div className="detalle-page-header">
                    <div>
                        <h1>{caso.titulo}</h1>
                        <div className="header-meta">
                            {badgeEstado(caso.estado)}
                            <span className="meta-fecha">
                                {new Date(caso.created_at).toLocaleDateString('es-ES')}
                            </span>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => router.get('/detective/dashboard')}
                            className="boton-volver"
                            title="Volver al dashboard"
                        >
                            <i className="fa-solid fa-arrow-left"></i> Volver
                        </button>
                        <button
                            onClick={() => router.post(`/detective/casos/${caso.id}/alternar-estado`)}
                            className="boton-volver"
                            title="Alternar estado"
                        >
                            <i className="fa-solid fa-sync"></i>
                        </button>
                        <button onClick={() => setMostrarAlerta(true)} className="boton-volver">
                            <i className="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>

                {/* Grid de dos columnas */}
                <div className="detalle-grid">

                    {/* ── Columna izquierda ── */}
                    <div>
                        {/* Información del caso */}
                        <div className="detalle-card">
                            <p className="detalle-card-title">
                                <i className="fa-solid fa-file-lines"></i>
                                Información del caso
                            </p>

                            <div className="info-field">
                                <label>Descripción</label>
                                <p>{caso.descripcion || 'Sin descripción'}</p>
                            </div>

                            <div className="info-field">
                                <label>Estado</label>
                                <p>{badgeEstado(caso.estado)}</p>
                            </div>

                            {caso.lat && caso.lng && (
                                <div className="info-field">
                                    <label>Ubicación</label>
                                    <span className="location-pill" style={{ marginBottom: '10px', display: 'inline-flex' }}>
                                        <i className="fa-solid fa-location-dot"></i>
                                        {caso.lat}, {caso.lng}
                                    </span>
                                    <div style={{ marginTop: '10px' }}>
                                        {isLoaded ? (
                                            <GoogleMap
                                                mapContainerStyle={MAP_STYLE}
                                                center={{
                                                    lat: parseFloat(caso.lat),
                                                    lng: parseFloat(caso.lng),
                                                }}
                                                zoom={14}
                                                options={{
                                                    disableDefaultUI: true,
                                                    zoomControl: true,
                                                    scrollwheel: false,
                                                }}
                                            >
                                                <Marker
                                                    position={{
                                                        lat: parseFloat(caso.lat),
                                                        lng: parseFloat(caso.lng),
                                                    }}
                                                    icon={{
                                                        url: '/images/GINPERFINAL.jpg',
                                                        scaledSize: new window.google.maps.Size(36, 36),
                                                        anchor: new window.google.maps.Point(18, 36),
                                                    }}
                                                />
                                            </GoogleMap>
                                        ) : (
                                            <div className="mapa-cargando">
                                                Cargando mapa...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Solicitante */}
                        <div className="detalle-card">
                            <p className="detalle-card-title">
                                <i className="fa-solid fa-user"></i>
                                Solicitante
                            </p>

                            <div className="usuario-row">
                                <div className="usuario-avatar">
                                    {iniciales(caso.user?.nombre)}
                                </div>
                                <div>
                                    <p className="usuario-nombre">{caso.user?.nombre}</p>
                                    <p className="usuario-rol">Cliente</p>
                                </div>
                            </div>

                            <hr className="info-divider" />

                            <div className="info-field">
                                <label>Email</label>
                                <a href={`mailto:${caso.user?.email}`}>
                                    {caso.user?.email}
                                </a>
                            </div>

                            {caso.user?.telefono && (
                                <div className="info-field">
                                    <label>Teléfono</label>
                                    <a href={`tel:${caso.user?.telefono}`}>
                                        {caso.user?.telefono}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Columna derecha: Evidencias ── */}
                    <div className="detalle-card">
                        <div className="evidencias-header">
                            <p className="detalle-card-title" style={{ marginBottom: 0 }}>
                                <i className="fa-solid fa-paperclip"></i>
                                Evidencias
                            </p>
                            <span className="badge-count">
                                {caso.evidencias?.length || 0}
                            </span>
                        </div>

                        {caso.evidencias && caso.evidencias.length > 0 ? (
                            <div className="evidencias-lista">
                                {caso.evidencias.map((evidencia) => (
                                    <div key={evidencia.id} className="evidencia-item">
                                        <div
                                            className="evidencia-header"
                                            onClick={() =>
                                                setExpandedEvidencia(
                                                    expandedEvidencia === evidencia.id
                                                        ? null
                                                        : evidencia.id
                                                )
                                            }
                                        >
                                            <div className="evidencia-titulo">
                                                <i className="fa-solid fa-file-alt"></i>
                                                <span>{evidencia.titulo}</span>
                                            </div>
                                            <i
                                                className={`fa-solid fa-chevron-down chevron ${expandedEvidencia === evidencia.id
                                                    ? 'expanded'
                                                    : ''
                                                    }`}
                                            ></i>
                                        </div>

                                        {expandedEvidencia === evidencia.id && (
                                            <div className="evidencia-detalles">
                                                <div className="detalles-info">
                                                    <p>
                                                        <strong>Archivo:</strong>{' '}
                                                        {evidencia.archivo}
                                                    </p>
                                                    <p>
                                                        <strong>Subido:</strong>{' '}
                                                        {new Date(
                                                            evidencia.created_at
                                                        ).toLocaleDateString('es-ES')}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        descargarEvidencia(evidencia.id)
                                                    }
                                                    className="boton-descargar"
                                                    title="Descargar evidencia"
                                                >
                                                    <i className="fa-solid fa-download"></i>{' '}
                                                    Descargar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="sin-evidencias">
                                <i className="fa-solid fa-folder-open"></i>
                                <p>No hay evidencias registradas</p>
                            </div>
                        )}
                    </div>
                </div>

                {alerta && <Alerta tipo={alerta.tipo} message={alerta.mensaje} recargar={true} />}
            </main>
        </>
    );
}