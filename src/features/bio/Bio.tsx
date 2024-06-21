import { useState } from "react";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import styles from "./styles.module.css";
import { BioContainer, BioImagen, BioNombre, BioDescripcion, ContenedorBotones, BotonBio, } from "./styled";


const Bio = () => {
  const [bioActiva, setBioActiva] = useState(
    INFO_SIMPSONS[NombresSimpsons.BART]
  );

  const onClick = (nombre: NombresSimpsons) => 
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () => {
    return Object.keys(INFO_SIMPSONS).map((nombre) => (
      <BotonBio
        key={nombre}
        onClick={() => onClick(nombre as NombresSimpsons)}
        activo = {bioActiva.id === nombre}> 
        {nombre} 
        </BotonBio>
    ));
  };

  return (
    <BioContainer>
      <ContenedorBotones> { crearBotones () } </ContenedorBotones>
      <div>
        <div>
          <BioImagen src={bioActiva.image} alt = {bioActiva.nombre} />
        </div>
        <div>
          <BioNombre> {bioActiva.nombre} </BioNombre>
          <BioDescripcion> {bioActiva.descripcion} </BioDescripcion>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
