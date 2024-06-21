import styled from "styled-components";
import { NombresSimpsons, INFO_SIMPSONS } from "./constants";
import { SkyBackground } from "../../assets";


//contenedor principal
export const BioContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
width: 100%;
height: 100%;
`;

interface BioImagenProps {
    src: string;
    alt: string;
}

//imagen de la Bio
export const BioImagen = styled.img<BioImagenProps>`
max-width: 200px;
max-height: 300px;
margin-bottom: 1rem;
`;

//nombre del personaje
export const BioNombre = styled.h3`
font-size: 2em;
margin-bottom: 1rem;
`;

// descripción del personaje
export const BioDescripcion = styled.p`
font-size: 1.3em;
width: 70%;
margin: 1rem auto;
`;

//contenedor de los botones
export const ContenedorBotones = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
width: 100%;
margin-bottom: 1rem;
`;

interface BotonBioProps {
    activo?: boolean | undefined;
    key: string;
    onClick: () => void;
    children: React.ReactNode;
}

//botón para seleccionar la bio
export const BotonBio = styled.button<BotonBioProps>`
border-radius: 5px;
border: 1px solid darkgray;
box-shadow: 0px 0pc 5px 0px rgba (0, 0, 0, 0.75);
padding: 1rem;
margin: 1rem;
font-family: "Homer Simpson Revised", sans-serif;
font-size: 1.4rem;
background-color: ${(props) => (props.activo ? "#fdd835" : "whitesmoke")};
color: ${(props) => (props.activo ? "whitesmoke" : "#333")};
text-shadow: ${(props) =>
props.activo ? "2px 2px 0 #000000, 2px -2px 0 #000000, -2px 2px 0 #000000, -2px -2px 0 #000000, 2px 0px 0 #000000, 0px 2px 0 #000000, -2px 0px 0 #000000, 0px -2px 0 #000000"
: "none"};
&:hover { 
    cursor: pointer;
};
`;


