import React, { useState, useEffect } from "react";
import axios from "axios";

export function Home() {
  const [characters, setCharacters] = useState([]);
  const [displayedCharacters, setDisplayedCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        const response = await axios.get("https://hp-api.onrender.com/api/characters");
        setCharacters(response.data);
        // Mostrar os primeiros 10 personagens ao carregar
        setDisplayedCharacters(response.data.slice(0, 10));
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar personagens");
        setLoading(false);
      }
    }

    fetchCharacters();
  }, []);

  // Função para pegar 10 personagens aleatórios
  function gerarAleatorio() {
    if (characters.length === 0) return;
    const shuffled = [...characters].sort(() => 0.5 - Math.random());
    setDisplayedCharacters(shuffled.slice(0, 10));
  }

  if (loading) return <p className="text-center mt-10 text-lg">Carregando personagens...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center text-purple-800">
        Personagens de Harry Potter
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={gerarAleatorio}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-md transition"
        >
          Gerar 10 Personagens Aleatórios
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {displayedCharacters.map((char) => (
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
    </div>
  );
}
