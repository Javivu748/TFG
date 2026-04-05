import ApplicationLogo from '@/Components/ApplicationLogoSecond';
import '../../css/footer.css'

export default function footer(){
    return(
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
        </section>
        </>
    );
}