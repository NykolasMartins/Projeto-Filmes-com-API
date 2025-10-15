import MovieCard from "./movieCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from 'swiper/modules';

function MovieCarousel({ titulo, genreId, query }) {
  const [movies, setMovies] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    const apiKey = "713e459c39ca69fffcf71378a606f644";


    const fetchGenresAndMovies = async () => {
  try {
    if (genreId) {
      // 1. Buscar gêneros
      const genresRes = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-BR`
      );
      setAllGenres(genresRes.data.genres);

      // 2. Buscar filmes do gênero
      const moviesRes = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=pt-BR`
      );
      setMovies(moviesRes.data.results || []);
    } else if (query) {
      // Busca por título
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&language=pt-BR&page=1`
      );
      const data = await response.json();
      setMovies(data.results || []);
    }
  } catch (error) {
    console.error(error);
  }
};

    fetchGenresAndMovies();
  }, [genreId, query]);

  

  const mapGenres = (genreIds) => {
    if (!allGenres.length) return ""; // ainda não carregou
    return genreIds
      .map((id) => allGenres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(", ");
  };

  

 

  const [clickedCard, setClickedCard] = useState(null);

  return (
    <div className="movieCarousel">
      {clickedCard && (
        <div
          className="modal"
          style={{
            
          }}
        >

  <div style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${clickedCard.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.7,
            borderRadius: '10px'
      }}>
        
      </div>

          <div className="modalInfo">
            <h2>
              <span>Titulo:</span> {clickedCard.title}
            </h2>
            <p>{clickedCard.overview}</p>
          </div>

          <div className="modalExtraInfos">
            <div className="lado1">
              <h2>Gêneros:</h2> <p>{mapGenres(clickedCard.genre_ids)}</p>
            </div>
            <div className="lado2">
              <h2>Data de Lançamento:</h2> <p>{clickedCard.release_date}</p>
            </div>
          </div>

          <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)', // 50% de transparência
        zIndex: 0,
        borderRadius: '10px'
      }}
    >
      
    </div>
          <button onClick={() => setClickedCard(null)}>Fechar</button>
        </div>
      )}

      <h3>{titulo}</h3>
      <div className="carouselContainer">
        
        <div className="carousel">
          <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={5}
          navigation={true}
          pagination={{ clickable: true }}
         slidesPerGroup={5}
         //watchSlidesProgress={true}
          >
            {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              
                <MovieCard
                  title={movie.title}
                  image={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/300x450?text=Sem+Imagem"
                  }
                  genre={mapGenres(movie.genre_ids)}
                  onClick={() => setClickedCard(movie)}
                />
            </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default MovieCarousel;
