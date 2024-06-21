import { FC } from "react";
import { 
    ContenedorTexto,
    TituloModal,
    DescripcionModal,
    BotonSuscribir,
    ImagenModal,
} from "./styled";
import { SuscribeImage } from "../../assets";

interface PremiumModalContentProps {
    onClose: () => void;
}

const PremiumModalContent: FC <PremiumModalContentProps> = ({ onClose }) => (
    <>
    <ImagenModal src={ SuscribeImage } alt = "mr-burns-excelent" />
    <ContenedorTexto>
        <TituloModal>Suscríbete a nuestro Newsletter</TituloModal>
        <DescripcionModal>
            Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.
        </DescripcionModal>
        <BotonSuscribir onClick = {() => {
            setTimeout (() => {
                alert ( "Suscripto!" );
                onClose ();
            }, 1000);
        }}
        >Suscríbete</BotonSuscribir>
    </ContenedorTexto>
    </>
);

export default PremiumModalContent;
