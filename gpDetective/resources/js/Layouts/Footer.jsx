import ApplicationLogo from '@/Components/ApplicationLogoSecond';
import '../../css/footer.css'

export default function footer() {
    return (
        <>
            <section className="marcoFooter">
                <div className="imagenFooter">
                    <ApplicationLogo></ApplicationLogo>
                </div>
                <div className="lineaDivisoria">

                </div>
                <div className="contactos">
                    <h5>Contactos</h5>
                    <ul>
                        <li>Ginper@gmail.com</li>
                        <li>630855870</li>
                        <li>C. Arapiles, 11, 11100 San Fernando, Cádiz</li>
                    </ul>
                </div>
                <div className="rrss">
                    <h5>Redes Sociales</h5>
                    <ul>
                        <li><a href="">Facebook</a></li>
                        <li><a href="">Instagram</a></li>
                        <li><a href="">Linkedin</a></li>
                    </ul>
                </div>

                <div className="googleMaps">
                    <h5>Ubicación</h5>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d854.1477169295207!2d-6.190333328367302!3d36.47566620081914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0dcd8e2af01819%3A0x44a2cf6e2bf8b2bb!2sGINPER%20DETECTIVES!5e0!3m2!1ses!2ses!4v1775748503049!5m2!1ses!2ses"
                        width="350"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </section>
        </>
    );
}