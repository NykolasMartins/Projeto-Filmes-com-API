

function MovieCard({ title, image, genre, onClick }) {
  return (
    // O onClick agora está no wrapper principal
    <div className="movieCardWrapper" onClick={onClick}>
      <div className="movieCard">
        <div className="movieImg">
          <img src={image} alt={title} loading="lazy" /> {/* Adicionado loading="lazy" para performance */}
        </div>
        <div className="movieInfo">
          <h2>{title}</h2>
          <h4>{genre}</h4>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;