

import { Head } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { useForm } from '@inertiajs/react';
import BotonPrimario from '@/Components/PrimaryButton.jsx';
import '../../../css/auth-css/perfil.css';
import { useState } from 'react';

export default function Perfil({ user }) {
    const { data, setData, patch, errors, processing } = useForm({
        nombre: user.nombre ?? '',
        email: user.email ?? '',
        telefono: user.telefono ?? '',
        avatar: null,
    });

    const [previewUrl, setPreviewUrl] = useState(user.avatar ? `/storage/${user.avatar}` : null);

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
        patch(route('profile.update'), {
            forceFormData: true,
        });
    };

    return (
        <div className="login-container">
            <Head title="Editar perfil" />

            <div className="login-card">
                <ApplicationLogo />

                <h2 className="login-title">Editar perfil</h2>

                <form onSubmit={submit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="avatar" className="form-label">
                            Avatar
                        </label>
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
                            Formatos permitidos: JPG, JPEG, PNG (máximo 2MB)
                        </small>
                        {errors.avatar && (
                            <span className="error-message">{errors.avatar}</span>
                        )}
                    </div>

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