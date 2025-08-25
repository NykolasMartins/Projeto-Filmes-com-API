import { useState } from "react";
import "./App.css";
import MovieCarousel from "./components/movieCarousel";

function App() {



  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("")

const handleSearch = () => {
    setQuery(searchTerm); // quando clicar, define a query para o carrossel
  };

const handleKeyDown = (e) => {
  if(e.key === "Enter"){
    handleSearch();
  }
}


  return (
    <div className="App">
      
      <div className="titleGroup">
        <h1>Catálogo de filmes</h1>
        <h3>Descubra o seu filme preferido!</h3>
      </div>
      <div style={{display: 'flex', gap: '20px'}}>
        <input type="text" placeholder="Digite um Filme" className="input" id="pesquisa" onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleKeyDown}/> 
        <button onClick={handleSearch}>Procurar</button>
      </div>
      <div className="carousels">
      {query &&(
        <MovieCarousel titulo="Pesquisa" query={query}/>
      )}
      <MovieCarousel titulo="Ação" genreId={28}/>
      <MovieCarousel titulo="Guerra" genreId={10752}/>
      <MovieCarousel titulo="Animação" genreId={16}/>
      </div>
    </div>
  );
}

export default App;
