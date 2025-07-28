import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const MovieListingApp = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Action", "Drama", "Comedy", "Thriller", "Science-Fiction", "Horror"];

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((response) => response.json())
      .then((data) => setMovies(data));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || movie.genres.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white px-10">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-yellow-400">Movie Listing</h1>
        <div className="relative w-full mb-4">
          <input
            className="w-full p-3 pl-10 rounded-lg bg-gray-800 text-white focus:outline-none"
            placeholder="Search for movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-3 text-gray-400" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                selectedCategory === category
                  ? "bg-yellow-500 text-black"
                  : "bg-gray-700 text-white hover:bg-yellow-400 hover:text-black"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg flex flex-col relative group transition-transform duration-300 hover:scale-105"
            >
              <div className="w-full aspect-[2/3]">
                <img
                  src={movie.image?.medium}
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col justify-center items-center text-center p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-80">
                <h2 className="text-lg font-bold uppercase tracking-wide">{movie.name}</h2>
                <p className="text-gray-300 text-sm mt-2">{movie.genres.join(", ")}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieListingApp;
