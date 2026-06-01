import { Head, useForm, usePage } from '@inertiajs/react';
import { useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Logo from '@/Components/ApplicationLogo';
import '../../../css/auth-css/crearCaso.css';
import Alert from '@/Components/alerta';

const MAP_STYLE = { width: '100%', height: '300px', borderRadius: '8px' };
const DEFAULT_CENTER = { lat: 36.5271, lng: -6.2886 };

export default function CrearCaso() {
    const { flash, detectives = [] } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        titulo: '',
        descripcion: '',
        estado: 'Pendiente',
        detective_id: '',
        lat: null,
        lng: null,
        // --- Evidencia ---
        evidencia_titulo: '',
        evidencia_archivo: null,
    });

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    const handleMapClick = useCallback((e) => {
        setData(data => ({
            ...data,
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }));
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('crear.caso.store'), {
            // Necesario para que Inertia envíe el archivo correctamente
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="login-container">
            <Head title="Crear caso" />
            <div className="login-card">
                <Logo />
                <h1 className="login-title">Crear Caso</h1>

                {flash.success && (
                    <div className="status-message">{flash.success}</div>
                )}

                <form onSubmit={submit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="titulo" className="form-label">Título</label>
                        <input
                            type="text"
                            id="titulo"
                            className="form-input"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            required
                        />
                        {errors.titulo && <span className="error-message">{errors.titulo}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <textarea
                            id="descripcion"
                            className="form-input"
                            rows="8"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="detective_id" className="form-label">Asignar Detective</label>
                        <select
                            id="detective_id"
                            className="form-input"
                            value={data.detective_id}
                            onChange={(e) => setData('detective_id', e.target.value)}
                        >
                            <option value="">Sin asignar</option>
                            {detectives.map((d) => (
                                <option key={d.id} value={d.id}>{d.nombre}</option>
                            ))}
                        </select>
                        {errors.detective_id && <span className="error-message">{errors.detective_id}</span>}
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            Ubicación del caso
                            <span style={{ fontWeight: 'normal', fontSize: '0.85rem', marginLeft: '8px', opacity: 0.6 }}>
                                (opcional — haz clic en el mapa)
                            </span>
                        </label>

                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={MAP_STYLE}
                                center={DEFAULT_CENTER}
                                zoom={13}
                                onClick={handleMapClick}
                            >
                                {data.lat && (
                                    <Marker position={{ lat: data.lat, lng: data.lng }} icon={{
                                        url: '/images/GINPERFINAL.jpg',
                                        scaledSize: new window.google.maps.Size(40, 40),
                                        anchor: new window.google.maps.Point(20, 40),
                                    }} />
                                )}
                            </GoogleMap>
                        ) : (
                            <div className="form-input" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                Cargando mapa...
                            </div>
                        )}

                        {data.lat && (
                            <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: '6px' }}>
                                {data.lat.toFixed(5)}, {data.lng.toFixed(5)}
                                <button
                                    type="button"
                                    onClick={() => setData(d => ({ ...d, lat: null, lng: null }))}
                                    className='editBoton'
                                >
                                    ✕ quitar
                                </button>
                            </p>
                        )}
                    </div>

                    <hr style={{ opacity: 1, margin: '8px 0' }} />
                    <p className="login-title">
                        Evidencia (opcional)
                    </p>

                    <div className="form-group">
                        <label htmlFor="evidencia_titulo" className="form-label">Descripción de la evidencia</label>
                        <textarea
                            id="evidencia_titulo"
                            className="form-input"
                            rows="5"
                            placeholder="Descripción evidencia"
                            value={data.evidencia_titulo}
                            onChange={(e) => setData('evidencia_titulo', e.target.value)}
                        />
                        {errors.evidencia_titulo && <span className="error-message">{errors.evidencia_titulo}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="evidencia_archivo" className="form-label">Archivo de evidencia</label>
                        <input
                            type="file"
                            id="evidencia_archivo"
                            className="form-input"
                            accept=".jpg,.jpeg,.png,.pdf,.mp4"
                            // Importante: así es como se pasa un archivo con useForm de Inertia
                            onChange={(e) => setData('evidencia_archivo', e.target.files[0])}
                        />
                        {errors.evidencia_archivo && <Alert message={"El archivo no puede pesar mas de 2MB"} tipo={"Error"} recargar={true}></Alert>}
                    </div>

                    <div className="editBoton">
                        <button type="submit" className="submit-button" disabled={processing}>
                            Guardar caso
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}