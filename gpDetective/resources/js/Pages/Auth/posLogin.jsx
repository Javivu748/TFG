import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/auth-css/posLogin.css';

export default function CompleteProfile() {
    const { data, setData, post, processing, errors, reset } = useForm({
        apellido: '',
        telefono: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/completar-perfil', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="poslogin-container">
            <Head title="Completa tu perfil" />

            <div className="poslogin-card">

                <div className="poslogin-logo">
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <p className="poslogin-description">
                    Para continuar, completa los datos de tu perfil.
                </p>

                <form onSubmit={submit} className="poslogin-form">

                    <div className="form-group">
                        <label htmlFor="telefono" className="form-label">Teléfono</label>
                        <input
                            id="telefono"
                            name="telefono"
                            type="text"
                            value={data.telefono}
                            className="form-input"
                            autoComplete="tel"
                            onChange={(e) => setData('telefono', e.target.value)}
                            required
                        />
                        {errors.telefono && (
                            <span className="error-message">{errors.telefono}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="form-input"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirmation" className="form-label">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="form-input"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                        />
                        {errors.password_confirmation && (
                            <span className="error-message">{errors.password_confirmation}</span>
                        )}
                    </div>

                    <div className="poslogin-actions">
                        <button type="submit" className="boton-primario" disabled={processing}>
                            Guardar y continuar
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}