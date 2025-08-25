import { useRef, useEffect } from "react";

function MovieCard({ title, image, genre, onClick}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((centerY - y) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;
      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      const lightX = (x / rect.width) * 100;
      const lightY = (y / rect.height) * 100;
      card.style.setProperty("--light-pos", `${lightX}% ${lightY}%`);

      card.style.boxShadow = `${(centerX - x) / 10}px ${(centerY - y) / 10}px 40px rgba(0,0,0,0.6),
                             inset -${lightX / 5}px -${lightY / 5}px 60px rgba(255,255,255,0.1)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
      card.style.boxShadow = "0 20px 40px rgba(0,0,0,0.5)";
      card.style.setProperty("--light-pos", `50% 50%`);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="movieCardWrapper" onClick={onClick}>
      <div className="movieCard" ref={cardRef}>
        <div className="movieImg">
          <img src={image} alt={title} />
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
