import React, { useEffect, useState } from 'react';

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError]=useState(null);
  const [search,setSearch]=useState('');

  useEffect(() => {
    const API = "https://pokeapi.co/api/v2/pokemon?limit=500";

    const fetchPokemon = async () => {
      try {
        const res = await fetch(API);
        const data = await res.json();

        const pokemonData = data.results.map(async (curElem) => {
          const res = await fetch(curElem.url);
          const data = await res.json();
          console.log(data)
          return data;
        });

        const Response = await Promise.all(pokemonData);
        setPokemon(Response);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error);
      }
    };

    fetchPokemon();
  }, []);

const searchData= pokemon.filter((curElem)=>curElem.name.toLowerCase().includes(search.toLowerCase()))


  if (loading) return <h2 className="loading">Loading...</h2>;
  if(error){
    return(
        <div>
            <h1>{error.massage}</h1>
        </div>
    )
  }

  return (
    <section className="container">
      <header>
        <h1 className="main-heading">Pokemon</h1>
      </header>
      <div>
        <input type='text' placeholder='search something' value={search} onChange={(e)=>setSearch(e.target.value)}/>
      </div>
      <br />
      <br />
      <div>
        <ul className="pokemon-grid">
          {searchData.map((curElem) => {
            return (
              <li key={curElem.id} className="pokemon-card">
                <img
                  src={curElem.sprites.other['official-artwork'].front_default}
                  alt={curElem.name}
                  className="pokemon-img"
                />
                <h3 className="pokemon-name">{curElem.name}</h3>
                <p>weight: {curElem.weight}</p>
                <p>Id: {curElem.id}</p>
                <p>Order: {curElem.order}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Pokemon;