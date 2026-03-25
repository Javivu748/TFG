// resources/js/Pages/Auth/CompleteProfile.jsx
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

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
        <GuestLayout>
            <Head title="Completa tu perfil" />

            <div className="mb-4 text-sm text-gray-600">
                Para continuar, completa los datos de tu perfil.
            </div>

            <form onSubmit={submit}>

                <div className="mt-4">
                    <InputLabel htmlFor="telefono" value="Teléfono" />
                    <TextInput
                        id="telefono"
                        name="telefono"
                        value={data.telefono}
                        className="mt-1 block w-full"
                        autoComplete="telefono"
                        onChange={(e) => setData('telefono', e.target.value)}
                        required
                    />
                    <InputError message={errors.telefono} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <button
                        type="submit"
                        className="boton-primario ms-4"
                        disabled={processing}
                    >
                        Guardar y continuar
                    </button>
                </div>
            </form>
        </GuestLayout>
    );
}