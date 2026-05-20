import '../../css/sobre.css'
import Header from '../Layouts/PrLayout';
import Footer from '../Layouts/Footer';
import BlurText from "../Components/BlurText.jsx";
import ApplicationLogo from '@/Components/ApplicationLogo';


export default function Sobre() {
    return (    
        <>
            <Header></Header>
            <section className='informacion'>
                <BlurText
                    text="Sobre GinPer"
                    delay={200}
                    animateBy="words"
                    direction="top"
                    className="sobre-titulo"
                />
                <div className="cajaContenido">
                    <div className="cuadroImagen">
                        <ApplicationLogo></ApplicationLogo>
                    </div>
                    <div className="cuadroTexto">
                        <h3>Francisco Javier Giner Perez</h3>
                        <div className="informacionDetallada">
                            <p>Soy Francisco Javier , conocido como ginper soy de San Fernando pero naci en el Puerto de Santa Maria,
                                llevo investigaciones por todo Cádiz, llevo varios años de experiencia en el sector de las investigaciones
                                puedes contactar conmigo a traves de correo/telefono, o bien puedes iniciar sesion y escribirme un caso en particular
                                 </p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}