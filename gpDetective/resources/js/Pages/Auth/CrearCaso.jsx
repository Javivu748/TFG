import { Head, useForm, usePage } from '@inertiajs/react';
import Logo from '@/Components/ApplicationLogo';
import '../../../css/auth-css/crearCaso.css';

export default function CrearCaso() {
    const { flash } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        titulo: '',
        descripcion: '',
        estado: 'Pendiente',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('crear.caso.store'), {
            onSuccess: () => reset('titulo', 'descripcion'),
        });
    };

    return (
        <div className="login-container">
            <Head title="Crear caso" />
            <div className="login-card">
                <Logo></Logo>
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
                            name="titulo"
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
                            name="descripcion"
                            className="form-input"
                            rows="8"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                        />
                        {errors.descripcion && <span className="error-message">{errors.descripcion}</span>}
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
