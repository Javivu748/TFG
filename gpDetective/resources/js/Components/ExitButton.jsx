import { Button } from '@headlessui/react';
import '../../css/botonPrimario.css'

export default function BotonPrimario({nombre ,pulsar}) {
    return (
           <button className='boton-primario' onClick={pulsar}>{nombre}</button>
    );
}