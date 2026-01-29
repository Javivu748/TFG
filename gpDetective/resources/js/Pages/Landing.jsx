import Layout from '../Layouts/PrLayout.jsx'
import Footer from '../Layouts/Footer.jsx'
import '../../css/landing.css'
import { useEffect, useRef, useState } from 'react';

export default function Landing() {

    const sectionRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        //IntersectionObserver sirve para que se ejecute una accion al verse en la vista
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.4 } // Cuando se vea un 40% el efecto se carga
        );

        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <Layout></Layout>

            <section className="fondoImagen">
                <div className="entradaImagen">
                    <h1>Detective a tu disposición</h1>
                    <p>Detective privado en la provincia de cadiz para investigaciones de cualquier tipo</p>
                </div>
            </section>

            <section ref={sectionRef} className={`informacion ${visible ? 'aparecer' : ''}`}>
                <h1>Que ofrecemos</h1>
                <div className="cajas-info">
                    <div className="caja-info">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <h3>Investigaciones Privadas</h3>
                            </div>
                            <div className="flip-card-back">
                                <p>Ofrecemos una amplia disposición y servicios</p>
                            </div>
                        </div>
                    </div>

                    <div className="caja-info">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <h3>Servicios Corporativos</h3>
                            </div>
                            <div className="flip-card-back">
                                <p>Investigación de fraudes empresariales, verificación de antecedentes y due diligence</p>
                            </div>
                        </div>
                    </div>

                    <div className="caja-info">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <h3>Informes Detallados</h3>
                            </div>
                            <div className="flip-card-back">
                                <p>Documentación completa con evidencias fotográficas y vídeos para uso legal</p>
                            </div>
                        </div>
                    </div>

                    <div className="caja-info">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <h3>Asesoría Legal</h3>
                            </div>
                            <div className="flip-card-back">
                                <p>Colaboración con abogados y preparación de pruebas para procesos judiciales</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <Footer></Footer>

        </>
    );
}
