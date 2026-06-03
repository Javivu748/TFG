import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/auth-css/contraseñaOlvidada.css';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="forgot-container">
            <Head title="Forgot Password" />

            <div className="forgot-card">

                <div className="forgot-logo">
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <p className="forgot-description">
                    ¿Olvidaste tu contraseña? Sin problema. Indícanos tu correo electrónico
                    y te enviaremos un enlace para que puedas establecer una nueva.
                </p>

                {status && (
                    <div className="forgot-status">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="forgot-form">

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="form-input"
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    <div className="forgot-actions">
                        <button type="submit" className="boton-primario" disabled={processing}>
                            Email Password Reset Link
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}