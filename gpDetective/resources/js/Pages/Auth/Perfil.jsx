

import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useForm } from '@inertiajs/react';
import BotonPrimario from '@/Components/PrimaryButton.jsx';
import '../../../css/auth-css/perfil.css';

export default function Perfil({ user }) {
    const { data, setData, patch, errors, processing } = useForm({
        nombre: user.nombre ?? '',
        email: user.email ?? '',
        telefono: user.telefono ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <div className="login-container">
            <Head title="Editar perfil" />

            <div className="login-card">
                <ApplicationLogo />

                <h2 className="login-title">Editar perfil</h2>



                <form onSubmit={submit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="nombre" className="form-label">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            type="text"
                            name="nombre"
                            value={data.nombre}
                            className="form-input"
                            autoComplete="name"
                            onChange={(e) => setData('nombre', e.target.value)}
                            required
                        />
                        {errors.nombre && (
                            <span className="error-message">{errors.nombre}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Correo electrónico
                        </label>
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
                        <label htmlFor="telefono" className="form-label">
                            Teléfono
                        </label>
                        <input
                            id="telefono"
                            type="text"
                            name="telefono"
                            value={data.telefono}
                            className="form-input"
                            autoComplete="tel"
                            onChange={(e) => setData('telefono', e.target.value)}
                        />
                        {errors.telefono && (
                            <span className="error-message">{errors.telefono}</span>
                        )}
                    </div>
                    <div className="editBoton">
                    <button type="submit" className="boton-primario" disabled={processing}>
                        Guardar cambios
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
}