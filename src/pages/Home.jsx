import React, { useState, useEffect } from "react";
import axios from "axios";

export function Home() {
  const [characters, setCharacters] = useState([]);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchSpecies, setSearchSpecies] = useState("");
  const [speciesList, setSpeciesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await axios.get("https://hp-api.onrender.com/api/characters");
        const data = response.data;
        setCharacters(data);
        setDisplayedCharacters(data.slice(0, 10));
        // Gera uma lista de espécies únicas para o filtro
        const uniqueSpecies = [...new Set(data.map((char) => char.species).filter(Boolean))];
        setSpeciesList(uniqueSpecies);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar personagens");
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  // Filtrar personagens com base no nome e na espécie, slk eh osso a pessoa faz merda e eu tenho que estar fazendo isso, enfim...
  const filteredCharacters = displayedCharacters.filter((char) => {
    return (
      char.name.toLowerCase().includes(searchName.toLowerCase()) &&
      (searchSpecies === "" || char.species === searchSpecies)
    );
  });

  const gerarAleatorio = () => {
    const shuffled = [...characters].sort(() => 0.5 - Math.random());
    setDisplayedCharacters(shuffled.slice(0, 10));
  };

  if (loading) return <p className="text-center mt-10 text-lg">Carregando personagens...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-balck-600">Personagens de Harry Potter</h1>

      {/* Filtros :) */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por nome"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/3"
        />

        <select
          value={searchSpecies}
          onChange={(e) => setSearchSpecies(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/4"
        >
          <option value="">Todas as espécies</option>
          {speciesList.map((specie) => (
            <option key={specie} value={specie}>
              {specie}
            </option>
          ))}
        </select>

        <button
          onClick={gerarAleatorio}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-md"
        >
          Gerar Aleatórios
        </button>
      </div>

      {/* lista de personagens filtrada */}
      {filteredCharacters.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum personagem encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map((char) => (
            <div
              key={char.name}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={char.image || "https://via.placeholder.com/300x400?text=Sem+Imagem"}
                alt={char.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{char.name}</h2>
                <p className="text-gray-700">
                  <span className="font-semibold">Casa:</span> {char.house || "Desconhecida"}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Espécie:</span> {char.species}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Ator:</span> {char.actor || "Desconhecido"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
