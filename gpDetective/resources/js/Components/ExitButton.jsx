import { Button } from '@headlessui/react';

export default function BotonPrimario({nombre ,pulsar}) {
    return (
           <button className='boton-secundario' onClick={pulsar}>{nombre}</button>
    );
}