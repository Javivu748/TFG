import { Head, useForm, usePage } from '@inertiajs/react';
import Logo from '@/Components/ApplicationLogo';
import '../../../css/auth-css/crearEvidencia.css';

export default function CrearEvidencia() {
    const { caso, evidencias_count = 0, flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        titulo: '',
        archivo: null,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('caso.evidencia.store', caso.id), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="login-container">
            <Head title={`Añadir evidencia - ${caso.titulo}`} />

            <div className="login-card evidencia-card">
                <Logo />

                <div className="evidencia-header">
                    <span className="evidencia-pill">Caso #{caso.id}</span>
                    <h1 className="login-title">Añadir evidencia</h1>
                    <p className="evidencia-subcopy">
                        Sube un archivo para este caso. Cada caso admite un máximo de 3 evidencias.
                    </p>
                    <div className="evidencia-counter">
                        {evidencias_count}/3 evidencias añadidas
                    </div>
                </div>

                {flash?.success && <div className="status-message">{flash.success}</div>}

                <form onSubmit={submit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="titulo" className="form-label">Título de la evidencia</label>
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
                        <label htmlFor="archivo" className="form-label">Archivo de evidencia</label>
                        <input
                            type="file"
                            id="archivo"
                            className="form-input"
                            accept=".jpg,.jpeg,.png,.pdf,.mp4"
                            onChange={(e) => setData('archivo', e.target.files[0])}
                            required
                        />
                        {errors.archivo && <span className="error-message">{errors.archivo}</span>}
                    </div>

                    <div className="editBoton">
                        <button type="submit" className="submit-button" disabled={processing}>
                            Guardar evidencia
                        </button>
                    </div>
                </form>

                <div className="evidencia-footer">
                    <a href={route('dashboard')} className="evidencia-link">Volver al dashboard</a>
                </div>
            </div>
        </div>
    );
}
