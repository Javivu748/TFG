import PrimaryButton from '@/Components/PrimaryButton';
import ApplicationLogo from '@/Components/ApplicationLogo';
import GoogleButton from '@/Components/LoginButton';
import Alert from '@/Components/alerta';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/auth-css/login.css'

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="login-container">
            <Head title="Log in" />
            <div className="login-card">

                <ApplicationLogo></ApplicationLogo>

                {status && (
                    <div className="status-message">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
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
                            <Alert message="El Email y la contraseña no son correctos, intentelo de nuevo" tipo="Error"></Alert>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="form-input"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && (
                            <Alert message="La Contraseña no es correcta" tipo="Error"></Alert>
                        )}
                    </div>

                    <div className="form-group-checkbox">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="checkbox-input"
                            />
                            <span>Remember me</span>
                        </label>
                    </div>

                    <div className="editBoton">
                        <button type="submit" className="boton-primario ms-4" disabled={processing}>
                            Login
                        </button>
                    </div>

                    <div className="logGoogle">
                        <GoogleButton></GoogleButton>
                        {errors.google && (
                            <div className="error-message">{errors.google}</div>
                        )}
                    </div>

                    <div className='register-link'>
                        <Link href={route('register')}>
                            Registrate
                        </Link>
                    </div>

                    {canResetPassword && (
                        <div className="forgot-password">
                            <Link href={route('password.request')}>
                                Olvidaste tu contraseña?
                            </Link>
                        </div>
                    )}


                </form>

            </div>
        </div>
    );
}