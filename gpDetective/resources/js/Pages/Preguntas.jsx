import Header from '../Layouts/PrLayout';
import $ from 'jquery';
import Footer from '../Layouts/Footer';
import BlurText from "../Components/BlurText.jsx";
import '../../css/preguntas.css'
import { useEffect } from 'react';
import { Head } from '@inertiajs/react';

export default function Preguntas() {

    useEffect(() => {
        $('.pregunta-caja-tit').on('click', function () {
            const $card = $(this).closest('.pregunta-caja');
            $card.find('.pregunta-caja-resp').slideToggle();
            $card.find('#cambio-icon').toggleClass('fa-angle-down fa-angle-up');
        });
    }, []);
    return (
        <>
            <Header />
            <Head title="Preguntas" />
            <div className="preguntas-cont">
                <BlurText
                    text="Preguntas Frecuentes"
                    delay={200}
                    animateBy="words"
                    direction="top"
                    className="preguntas-titulo"
                />
            </div>
            <div className="pregunta-caja">
                <div className="pregunta-caja-tit">
                    <h2>¿Qué es un detective privado y qué puede hacer legalmente?</h2> <i id='cambio-icon' class="fa-solid fa-angle-down"></i>
                </div>
                <div className="pregunta-caja-resp">
                    <p>Un detective privado es un profesional habilitado legalmente para investigar personas, hechos y situaciones por encargo de particulares o empresas.
                        Puede realizar vigilancias, seguimientos, verificaciones de información, localización de personas y obtención de pruebas admisibles en juicio, siempre dentro del marco legal.</p>
                </div>
            </div>
            <div className="pregunta-caja">
                <div className="pregunta-caja-tit">
                    <h2>¿Las pruebas obtenidas por un detective son válidas ante un tribunal?</h2> <i id='cambio-icon' class="fa-solid fa-angle-down"></i>
                </div>
                <div className="pregunta-caja-resp">
                    <p>Sí. Las pruebas recopiladas por un detective privado con licencia oficial tienen plena validez legal y 
                        pueden ser presentadas en procesos judiciales, 
                        siempre que se hayan obtenido respetando la legalidad vigente y los derechos fundamentales de las personas.</p>
                </div>
            </div>
            <div className="pregunta-caja">
                <div className="pregunta-caja-tit">
                    <h2>¿Qué tipos de casos investiga un detective privado?</h2> <i id='cambio-icon' class="fa-solid fa-angle-down"></i>
                </div>
                <div className="pregunta-caja-resp">
                    <p>Los casos más habituales incluyen: infidelidades y casos matrimoniales, localización de personas desaparecidas, 
                        investigaciones de fraude laboral o de seguros, verificación de antecedentes, sustracción parental, espionaje industrial y seguimiento de menores.</p>
                </div>
            </div>
            <div className="pregunta-caja">
                <div className="pregunta-caja-tit">
                    <h2>¿Es confidencial la información que comparto con un detective?</h2> <i id='cambio-icon' class="fa-solid fa-angle-down"></i>
                </div>
                <div className="pregunta-caja-resp">
                    <p>Absolutamente. Todo detective privado está obligado por ley al secreto profesional. 
                        Toda la información que el cliente aporte, así como los resultados de la investigación, 
                        se tratan con total discreción y nunca son compartidos con terceros.</p>
                </div>
            </div>
            <div className="pregunta-caja">
                <div className="pregunta-caja-tit">
                    <h2>¿Cómo sé si necesito contratar a un detective privado?</h2> <i id='cambio-icon' class="fa-solid fa-angle-down"></i>
                </div>
                <div className="pregunta-caja-resp">
                    <p>Si sospechas de una infidelidad, necesitas localizar a alguien, 
                        tienes dudas sobre un empleado o socio, o precisas pruebas documentadas para un proceso legal, 
                        un detective privado puede ser la solución. Una consulta inicial (generalmente gratuita) te ayudará a valorarlo.</p>
                </div>
            </div>
            <div className="pregunta-caja">
                <div className="pregunta-caja-tit">
                    <h2>¿Cuánto cuesta contratar a un detective privado?</h2> <i id='cambio-icon' class="fa-solid fa-angle-down"></i>
                </div>
                <div className="pregunta-caja-resp">
                    <p>El coste varía según el tipo de investigación, la duración, la complejidad y los medios necesarios. 
                        La mayoría de despachos ofrecen una consulta inicial gratuita y un presupuesto personalizado sin compromiso antes de iniciar cualquier trabajo.</p>
                </div>
            </div>
            <div className="pregunta-caja">
                <div className="pregunta-caja-tit">
                    <h2>¿Un detective puede investigar a cualquier persona?</h2> <i id='cambio-icon' class="fa-solid fa-angle-down"></i>
                </div>
                <div className="pregunta-caja-resp">
                    <p>No. Un detective solo puede actuar con un encargo legítimo y dentro de la legalidad. 
                        No puede vulnerar derechos fundamentales como la intimidad domiciliaria, 
                        intervenir comunicaciones privadas ni actuar sin una causa justificada. Toda actuación está regulada por la ley.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}


