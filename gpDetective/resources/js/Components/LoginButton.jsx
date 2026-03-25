import '../../css/auth-css/google.css'

export default function GoogleButton() {
    const handleGoogleLogin = () => {
        window.location.href = '/auth/google';
    };

    return (
        <div className="google-btn-container">
            <button onClick={handleGoogleLogin} className="google-btn">
                <img
                    src="/images/google.webp"
                    alt="Google"
                    width={40}
                    height={40}
                />
                Continuar con Google
            </button>
        </div>
    );
}