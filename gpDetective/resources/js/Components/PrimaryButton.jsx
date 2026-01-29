import '../../css/botonPrimario.css'

export default function BotonPrimario({nombre, href}) {
    return (
        <a href={href} className="boton-primario">{nombre}</a>   
    );
}