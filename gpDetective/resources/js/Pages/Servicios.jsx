import Header from '../Layouts/PrLayout';
import Footer from '../Layouts/Footer';
import BlurText from "../Components/BlurText.jsx";
import ApplicationLogo from '@/Components/ApplicationLogo';
import '../../css/servicios.css'
import { useEffect, useRef, useState } from 'react';



export default function Servicios() {


    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const images = Array.from(sectionRef.current.querySelectorAll('.servicio-imagen'));
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aparecer');
                    }
                });
            },
            { threshold: 0.35 }
        );

        images.forEach((image) => observer.observe(image));
        return () => observer.disconnect();
    }, []);



    return (
        <>
            <Header />
            <div className="servicios" ref={sectionRef}>
                <BlurText
                    text="Servicios de GinPer"
                    delay={200}
                    animateBy="words"
                    direction="top"
                    className="ServiciosTitulo"
                />
                <div className="servicio-conten">
                    <div className="servicio-imagen">
                        <img src="/images/localizar-personas.webp" alt="Localizar personas" className='imagen-servicio' />
                    </div>
                    <div className="servicio-texto">
                        <h2>Localización de personas</h2>
                        <p>Servicio orientado a encontrar el paradero de personas desaparecidas, familiares con los que se ha perdido el contacto,
                            deudores que evitan sus responsabilidades o cualquier individuo cuya localización sea necesaria.
                            Mediante técnicas de investigación contrastadas y fuentes de información legales,
                            se obtiene la ubicación actual de la persona con la máxima discreción y en el menor tiempo posible</p>
                    </div>
                </div>
                <div className="servicio-conten">
                    <div className="servicio-texto">
                        <h2>Infidelidades</h2>
                        <p>Uno de los servicios más solicitados. Si tienes sospechas sobre la fidelidad de tu pareja, un detective privado puede confirmar o desmentirlas de forma objetiva, 
                            aportando pruebas documentales con plena validez. 
                            Se realizan vigilancias y seguimientos discretos que permiten obtener imágenes, vídeos e informes detallados, 
                            útiles tanto para tu tranquilidad personal como para un eventual proceso de separación o divorcio</p>
                    </div>
                    <div className="servicio-imagen">
                        <img src="/images/infidelidad.webp" alt="Infidelidad" className='imagen-servicio' />
                    </div>
                </div>
                <div className="servicio-conten">
                    <div className="servicio-imagen">
                        <img src="/images/trabajo.webp" alt="Localizar personas" className='imagen-servicio' />
                    </div>
                    <div className="servicio-texto">
                        <h2>Investigación laboral</h2>
                        <p>Dirigido a empresas y autónomos que sospechan de comportamientos irregulares por parte de sus empleados. 
                            Se investigan situaciones como bajas médicas fraudulentas, trabajadores que desarrollan actividades incompatibles con su baja, robos internos, 
                            filtración de información confidencial o competencia desleal. 
                            Toda la investigación se lleva a cabo con pleno respeto a la legalidad vigente y con documentación apta para procedimientos disciplinarios o judiciales</p>
                    </div>
                </div>
                <div className="servicio-conten">
                    <div className="servicio-texto">
                        <h2>Seguimientos y vigilancias</h2>
                        <p>Servicio de control y monitorización discreta de personas o inmuebles durante el tiempo que sea necesario. 
                            Se elaboran informes detallados con registro horario, fotografías y vídeos que documentan los movimientos, 
                            rutinas y contactos del sujeto investigado. Toda la documentación obtenida tiene validez probatoria ante notaría y tribunales, 
                            por lo que puede utilizarse como prueba en juicios civiles, penales o de familia</p>
                    </div>
                    <div className="servicio-imagen">
                        <img src="/images/vigilancia.webp" alt="Seguimiento" className='imagen-servicio' />
                    </div>
                </div>
                <div className="servicio-conten">
                    <div className="servicio-imagen">
                        <img src="/images/patrimonial.png" alt="Localizar personas" className='imagen-servicio' />
                    </div>
                    <div className="servicio-texto">
                        <h2>Investigación patrimonial</h2>
                        <p>Permite conocer la situación económica real de una persona física o jurídica: bienes inmuebles, vehículos, cuentas, sociedades, activos ocultos o patrimonio disimulado.
                            Es especialmente útil en procesos de divorcio para evitar que el cónyuge oculte bienes, en reclamaciones de deudas o antes de formalizar acuerdos comerciales con terceros. 
                            La información se obtiene de forma legal y se presenta en un informe estructurado listo para su uso judicial</p>
                    </div>
                </div>
                <div className="servicio-conten">
                    <div className="servicio-texto">
                        <h2>Control de menores</h2>
                        <p>Servicio pensado para padres preocupados por las actividades, amistades o hábitos de sus hijos menores de edad.
                         De forma completamente discreta y sin interferir en la vida del menor, se realiza un seguimiento que permite conocer con quién se relaciona,
                         qué lugares frecuenta y si existe alguna situación de riesgo como consumo de sustancias, malas compañías o comportamientos peligrosos. 
                         Un servicio que aporta tranquilidad y, cuando es necesario, una base para actuar a tiempo</p>
                    </div>
                    <div className="servicio-imagen">
                        <img src="/images/menores.webp" alt="Seguimiento" className='imagen-servicio' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}