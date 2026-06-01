import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link, useForm } from '@inertiajs/react';
import Alert from '@/Components/alerta';
import '../../../css/auth-css/register.css';
import { useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        telefono: '',
        email: '',
        password: '',
        password_confirmation: '',
        avatar: null,
    });

    const [previewUrl, setPreviewUrl] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('avatar', file);
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewUrl(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            forceFormData: true,
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
                        <label htmlFor="avatar" className="form-label">Avatar</label>
                        {previewUrl && (
                            <div className="avatar-preview" style={{ marginBottom: '15px', textAlign: 'center' }}>
                                <img 
                                    src={previewUrl} 
                                    alt="Avatar preview" 
                                    style={{ 
                                        width: '100px', 
                                        height: '100px', 
                                        borderRadius: '50%', 
                                        objectFit: 'cover',
                                        border: '2px solid #ddd'
                                    }} 
                                />
                            </div>
                        )}
                        <input
                            id="avatar"
                            type="file"
                            name="avatar"
                            accept=".jpg,.jpeg,.png"
                            className="form-input"
                            onChange={handleAvatarChange}
                        />
                        <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                            Formatos permitidos: JPG, JPEG, PNG (máximo 2MB) - Opcional
                        </small>
                        {errors.avatar && (
                            <Alert message={Array.isArray(errors.avatar) ? errors.avatar[0] : errors.avatar} tipo="Error"></Alert>
                        )}
                    </div>

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
                            <Alert message={Array.isArray(errors.nombre) ? errors.nombre[0] : errors.nombre} tipo="Error"></Alert>
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
                            <Alert message={Array.isArray(errors.telefono) ? errors.telefono[0] : errors.telefono} tipo="Error"></Alert>
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
                            <Alert message={Array.isArray(errors.email) ? errors.email[0] : errors.email} tipo="Error"></Alert>
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
                            <Alert message={Array.isArray(errors.password) ? errors.password[0] : errors.password} tipo="Error"></Alert>
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
                            <Alert message={Array.isArray(errors.password_confirmation) ? errors.password_confirmation[0] : errors.password_confirmation} tipo="Error"></Alert>
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