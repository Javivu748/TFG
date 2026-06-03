import { usePage, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Layout from '../../Layouts/dashLayout.jsx';
import ApplicationLogo from '@/Components/ApplicationLogo';
import BotonPrimario from '@/Components/PrimaryButton.jsx';
import Alerta from '@/Components/alerta';
import '../../../css/detective/dash.css';

const MAP_STYLE = { width: '100%', height: '500px', borderRadius: '12px' };
const DEFAULT_CENTER = { lat: 36.5271, lng: -6.2886 };

export default function DashboardDetective() {
    const { casos = { data: [] }, casosMapa = [], totalCasos, detective, flash } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [alerta, setAlerta] = useState(null);
    const [selectedCaso, setSelectedCaso] = useState(null); // para el popup

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

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

    const badgeEstado = (estado) => {
        const estilos = {
            abierto: { background: '#22c55e22', color: '#22c55e' },
            cerrado: { background: '#ef444422', color: '#ef4444' },
            pendiente: { background: '#f59e0b22', color: '#f59e0b' },
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
                        <h2>Bienvenido, {detective?.user?.nombre}</h2>
                        <p>Especialidad: {detective?.especialidad ?? 'Sin especificar'}</p>
                    </div>
                </section>

                {casosMapa.length > 0 && (
                    <section className="dashboard-casos" style={{ marginBottom: '1.5rem' }}>
                        <div className="header-casos">
                            <h2>Mapa de casos</h2>
                            <p>{casosMapa.length} caso{casosMapa.length !== 1 ? 's' : ''} geolocalizados</p>
                        </div>

                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={MAP_STYLE}
                                center={
                                    casosMapa.length > 0
                                        ? { lat: 36.523389, lng: -5.839438 } //Por defecto el centramos el mapa para que se vea cadiz
                                        : DEFAULT_CENTER
                                }
                                zoom={9}
                            >
                                {casosMapa.map((caso) => (
                                    <Marker
                                        key={caso.id}
                                        position={{ lat: parseFloat(caso.lat), lng: parseFloat(caso.lng) }}
                                        onClick={() => setSelectedCaso(caso)}
                                        icon={{
                                            url: '/images/GINPERFINAL.jpg', 
                                            scaledSize: new window.google.maps.Size(40, 40), 
                                            anchor: new window.google.maps.Point(20, 40),    
                                        }}
                                    />
                                ))}

                                {selectedCaso && (
                                    <InfoWindow
                                        position={{ lat: parseFloat(selectedCaso.lat), lng: parseFloat(selectedCaso.lng) }}
                                        onCloseClick={() => setSelectedCaso(null)}
                                    >
                                        <div className="map-info-card">
                                            <div className="logoCartaMapa">
                                                <ApplicationLogo />
                                            </div>
                                            <p className="map-info-title"><strong>Titulo:</strong> {selectedCaso.titulo}</p>
                                            <p className="map-info-state"><strong>Estado:</strong> {selectedCaso.estado}</p>
                                            <p className="map-info-state"><strong>Solicitante:</strong> {selectedCaso.user?.nombre ?? selectedCaso.user_id}</p>
                                            <a
                                                href={`/detective/casos/${selectedCaso.id}`}
                                                className="boton-primario"
                                            >
                                                Ver caso <i className="fa-solid fa-arrow-right"></i>
                                            </a>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        ) : (
                            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Cargando mapa...
                            </div>
                        )}
                    </section>
                )}
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