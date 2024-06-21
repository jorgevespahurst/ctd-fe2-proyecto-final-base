import { FC } from "react";
import {
    TarjetaNoticia,
    ImagenTarjetaNoticia,
    TituloTarjetaNoticia,
    FechaTarjetaNoticia,
    DescripcionTarjetaNoticia,
    BotonLectura,
} from "./styled";
import { INoticiasNormalizadas } from "./Noticias";

interface NewsCardProps {
    news: INoticiasNormalizadas;
    onReadMore: () => void;
}

const NewsCard: FC<NewsCardProps> = ( { news, onReadMore }) => {
    return (
        <TarjetaNoticia>
            <ImagenTarjetaNoticia src = {news.imagen} />
            <TituloTarjetaNoticia> {news.titulo} </TituloTarjetaNoticia>
            <FechaTarjetaNoticia> {news.fecha} </FechaTarjetaNoticia>

            <DescripcionTarjetaNoticia> {news.descripcionCorta} </DescripcionTarjetaNoticia>
            <BotonLectura onClick = { onReadMore } >Ver más</BotonLectura>
        </TarjetaNoticia>
    );
};

export default NewsCard;
