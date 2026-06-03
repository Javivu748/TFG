import { useState, useEffect } from 'react';
import { usePage, router, Head } from '@inertiajs/react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Layout from '../Layouts/dashLayout.jsx';
import '../../css/auth-css/dashboard.css';
import BotonPrimario from '@/Components/PrimaryButton';
import Alerta from '@/Components/alerta';

const MAP_STYLE = { width: '100%', height: '220px', borderRadius: '16px' };

export default function Dashboard() {
    const { auth, casos = { data: [], links: [] }, flash } = usePage().props;
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

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Pendiente':
                return '#fbbf24';
            case 'En Proceso':
                return '#3b82f6';
            case 'Resuelto':
                return '#10b981';
            default:
                return '#6b7280';
        }
    };

    const getEstadoStyles = (estado) => {
        switch (estado) {
            case 'Pendiente':
                return { backgroundColor: '#fef3c7', color: '#92400e' };
            case 'En Proceso':
                return { backgroundColor: '#dbeafe', color: '#1d4ed8' };
            case 'Resuelto':
                return { backgroundColor: '#dcfce7', color: '#166534' };
            default:
                return { backgroundColor: '#f3f4f6', color: '#4b5563' };
        }
    };

    const getFecha = (fecha) =>
        new Date(fecha).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
        });

    const isImageEvidence = (archivo = '') =>
        /\.(png|jpe?g|gif|webp|svg)$/i.test(archivo);

    const getExtension = (archivo = '') => {
        const match = archivo.match(/\.([a-z0-9]+)$/i);
        return match ? match[1].toUpperCase() : 'ARCHIVO';
    };

    return (
        <>
            <Layout />

            <main className="dashboard-container">
                <Head title="Dashboard" />

                <section className="dashboard-hero">
                    <div>
                        <h1>Bienvenido, {auth.user.nombre}</h1>
                        <p className="dashboard-copy">
                            Revisa tus casos, la ubicación registrada y las evidencias que has aportado.
                        </p>
                    </div>

                    <BotonPrimario nombre="Nuevo caso" href={route('crear.caso')} />
                </section>

                <section className="dashboard-casos">
                    <div className="header-casos">
                        <div>
                            <h2>Mis Casos</h2>
                            <p className="header-subtitle">{casos.data.length} caso{casos.data.length === 1 ? '' : 's'} en este panel</p>
                        </div>
                    </div>

                    {casos.data.length > 0 ? (
                        <>
                            <ul className="caso-lista">
                                {casos.data.map((caso) => {
                                    const lat = Number(caso.lat);
                                    const lng = Number(caso.lng);
                                    const tieneUbicacion = Number.isFinite(lat) && Number.isFinite(lng);

                                    return (
                                        <li key={caso.id} className="caso-card">
                                            <div className="caso-card-header">
                                                <div>
                                                    <h3>{caso.titulo ?? 'Caso sin título'}</h3>
                                                </div>
                                                <span
                                                    className="estado-chip"
                                                    style={{
                                                        ...getEstadoStyles(caso.estado),
                                                        border: `1px solid ${getEstadoColor(caso.estado)}`,
                                                    }}
                                                >
                                                    {caso.estado ?? 'Pendiente'}
                                                </span>
                                            </div>

                                            <div className="caso-meta-row">
                                                <span className="meta-pill"> <i class="fa-solid fa-calendar"> </i> {getFecha(caso.created_at)}</span>
                                                <span className="meta-pill"> <i class="fa-solid fa-paperclip"> </i> {caso.evidencias?.length ?? 0} evidencias</span>
                                            </div>

                                            <p className="caso-descripcion">
                                                {caso.descripcion?.trim() || 'Sin descripción disponible para este caso.'}
                                            </p>

                                            <div className="caso-body-grid">
                                                <article className="caso-map-block">
                                                    <div className="section-title-row">
                                                        <span className="section-label">Ubicación</span>
                                                        <span className="section-caption">{tieneUbicacion ? 'Mapa del caso' : 'Sin coordenadas'}</span>
                                                    </div>

                                                    {tieneUbicacion ? (
                                                        <div className="caso-map-frame">
                                                            {isLoaded ? (
                                                                <GoogleMap
                                                                    mapContainerStyle={MAP_STYLE}
                                                                    center={{ lat, lng }}
                                                                    zoom={13}
                                                                    options={{
                                                                        disableDefaultUI: true,
                                                                        zoomControl: false,
                                                                        scrollwheel: false,
                                                                        streetViewControl: false,
                                                                        fullscreenControl: false,
                                                                    }}
                                                                >
                                                                    <Marker position={{ lat, lng }} icon={{
                                                                        url: '/images/GINPERFINAL.jpg',
                                                                        scaledSize: new window.google.maps.Size(40, 40),
                                                                        anchor: new window.google.maps.Point(20, 40),
                                                                    }} />
                                                                </GoogleMap>
                                                            ) : (
                                                                <div className="caso-map-skeleton">Cargando mapa...</div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="caso-map-empty">
                                                            <span className="empty-map-icon"></span>
                                                            <p>Este caso no tiene ubicación registrada.</p>
                                                        </div>
                                                    )}

                                                    {tieneUbicacion && (
                                                        <p className="map-coordinates">{lat.toFixed(5)}, {lng.toFixed(5)}</p>
                                                    )}
                                                </article>

                                                <article className="caso-evidencias-block">
                                                    <div className="section-title-row">
                                                        <div className="section-title-content">
                                                            <span className="section-label">Evidencias</span>
                                                            <span className="section-caption">{caso.evidencias?.length ?? 0}/3 adjuntos · {Math.max(0, 3 - (caso.evidencias?.length ?? 0))} restantes</span>
                                                        </div>

                                                        {((caso.evidencias?.length ?? 0) < 3) ? (
                                                            <BotonPrimario nombre="+ Añadir evidencia" href={route('caso.evidencia.create', caso.id)} />
                                                        ) : (
                                                            <span className="evidencia-limit-pill">Límite alcanzado</span>
                                                        )}
                                                    </div>

                                                    {caso.evidencias && caso.evidencias.length > 0 ? (
                                                        <div className="evidencias-lista">
                                                            {caso.evidencias.map((evidencia) => (
                                                                <a
                                                                    key={evidencia.id}
                                                                    className="evidencia-item"
                                                                    href={evidencia.archivo_url || '#'}
                                                                    target={evidencia.archivo_url ? '_blank' : undefined}
                                                                    rel={evidencia.archivo_url ? 'noreferrer' : undefined}
                                                                >
                                                                    {isImageEvidence(evidencia.archivo) && evidencia.archivo_url ? (
                                                                        <img
                                                                            className="evidencia-thumb"
                                                                            src={evidencia.archivo_url}
                                                                            alt={evidencia.titulo || 'Evidencia adjunta'}
                                                                        />
                                                                    ) : (
                                                                        <div className="evidencia-thumb-placeholder">
                                                                            {getExtension(evidencia.archivo).slice(0, 2)}
                                                                        </div>
                                                                    )}

                                                                    <div className="evidencia-content">
                                                                        <p className="evidencia-title">{evidencia.titulo || 'Evidencia sin título'}</p>
                                                                        <p className="evidencia-subtitle">
                                                                            {getExtension(evidencia.archivo)} · {getFecha(evidencia.created_at)}
                                                                        </p>
                                                                    </div>
                                                                </a>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="caso-empty-state">
                                                            <span className="empty-state-icon"><i class="fa-solid fa-folder-open"></i></span>
                                                            <p>No hay evidencias registradas en este caso.</p>
                                                        </div>
                                                    )}
                                                </article>
                                            </div>
                                        </li>
                                    );
                                })}
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
                        <div className="caso-empty-state full-width">
                            <span className="empty-state-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
                            <p>No tienes casos registrados.</p>
                        </div>
                    )}

                    {alerta && <Alerta tipo={alerta.tipo} message={alerta.mensaje} />}
                </section>
            </main>
        </>
    );
}
