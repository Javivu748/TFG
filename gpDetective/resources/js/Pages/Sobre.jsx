import '../../css/sobre.css'
import Header from '../Layouts/PrLayout';
import Footer from '../Layouts/Footer';
import ApplicationLogo from '@/Components/ApplicationLogo';


export default function Sobre() {
    return (    
        <>
            <Header></Header>
            <section className='informacion'>
                <h1>Sobre GinPer</h1>
                <div className="cajaContenido">
                    <div className="cuadroImagen">
                        <ApplicationLogo></ApplicationLogo>
                    </div>
                    <div className="cuadroTexto">
                        <h3>Francisco Javier Giner Perez</h3>
                        <div className="informacionDetallada">
                            <p>Soy Francisco Javier , conocido como ginper soy de San Fernando pero naci en el puerto de santa maria
                                soy diplomado en detective....</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </>
    );
}