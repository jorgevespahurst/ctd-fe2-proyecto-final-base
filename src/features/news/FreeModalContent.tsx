import { FC } from "react";
import {
    ContenedorTexto,
    TituloModal,
    DescripcionModal,
    ImagenModal,
} from "./styled";
import { INoticiasNormalizadas } from "./Noticias";

interface FreeModalContentProps {
    news: INoticiasNormalizadas;
    onClose: () => void;
}

const FreeModalContent: FC <FreeModalContentProps> = ({ news, onClose }) => (
    <>
    <ImagenModal src = { news.imagen } alt = "news-image" />
    <ContenedorTexto>
        <TituloModal> { news.titulo } </TituloModal>
        <DescripcionModal> { news.descripcion } </DescripcionModal>
    </ContenedorTexto>
    </>
);

export default FreeModalContent;
