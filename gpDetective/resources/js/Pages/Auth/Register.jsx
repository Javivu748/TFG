import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';
import '../../../css/auth-css/register.css';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        telefono: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="register-container">
            <Head title="Register" />

            <div className="register-card">

                <div className="register-logo">
                    <Link href="/">
                        <ApplicationLogo className="h-20 w-20 fill-current text-gray-500" />
                    </Link>
                </div>

                <form onSubmit={submit} className="register-form">

                    <div className="form-group">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            value={data.nombre}
                            className="form-input"
                            autoComplete="nombre"
                            autoFocus
                            onChange={(e) => setData('nombre', e.target.value)}
                            required
                        />
                        {errors.nombre && (
                            <span className="error-message">{errors.nombre}</span>
                        )}
                    </div>

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
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="form-input"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        {errors.email && (
                            <span className="error-message">{errors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="form-input"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        {errors.password && (
                            <span className="error-message">{errors.password}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password_confirmation" className="form-label">
                            Confirm Password
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="form-input"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        {errors.password_confirmation && (
                            <span className="error-message">{errors.password_confirmation}</span>
                        )}
                    </div>

                    <div className="register-actions">
                        <Link href={route('login')} className="register-link">
                            Ya estas registrado? Inicia sesión
                        </Link>
                        <button type="submit" className="boton-primario" disabled={processing}>
                            Registrate
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}