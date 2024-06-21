import { useEffect, useState } from "react";
import closeImage from "../../assets/close.png";
import { obtenerNoticias } from "./fakeRest";
import {
  CloseButton, 
  TarjetaModal, 
  ContenedorModal, 
  ContenedorNoticias, 
  ListaNoticias, 
  TituloNoticias, 
} from "./styled";
import NewsCard from "./NewsCard";  //nuevo componente para las tarjetas noticias.
import { capitalizeTitle, calculateElapsedTime, truncateDescription } from "./utils";  //funciones utilitarias
import PremiumModalContent from "./PremiumModalContent";
import FreeModalContent from "./FreeModalContent";


export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

const Noticias = () => {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await obtenerNoticias();
      const normalizedData = response.map ((newsItem) => ( {
        id: newsItem.id,
        titulo: capitalizeTitle (newsItem.titulo),
        descripcion: newsItem.descripcion,
        fecha: calculateElapsedTime ( newsItem.fecha),
        esPremium: newsItem.esPremium,
        imagen: newsItem.imagen,
        descripcionCorta: truncateDescription ( newsItem.descripcion, 100),
        }));

      setNoticias(normalizedData);
    };

    fetchNews();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((news) => (
          <NewsCard 
          key = {news.id} 
          news = { news } 
          onReadMore = { () => setModal ( news )} />
        ))}
      </ListaNoticias>
      { modal && (
        <ContenedorModal>
          <TarjetaModal>
            <CloseButton onClick = { () => setModal ( null )}>
              <img src = { closeImage } alt = "close-button" />
            </CloseButton>
            { modal.esPremium ? (
              <PremiumModalContent onClose = { () => setModal ( null )} />
            ) : (
              <FreeModalContent news = { modal } onClose = { () =>
              setModal ( null )} />
            )}
          </TarjetaModal>
        </ContenedorModal>
      )}
    </ContenedorNoticias>
  );
};

export default Noticias;

