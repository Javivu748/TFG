import '../../css/botonSecundario.css'

export default function BotonPrimario({nombre, href}) {
    return (
        <a href={href} className="boton-secundario">{nombre}</a>   
    );
}