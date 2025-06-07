import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesref } from "../firebase/Firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
    const [searchInput, setSearchInput] = useState(""); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setData([]);
      const _data = await getDocs(moviesref);
      const temp = [];
      _data.forEach((doc) => {
          temp.push({ ...doc.data(), id: doc.id });
      });
      setData(temp);
      setLoading(false);
    }
    getData();
  }, []);

    const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

   const filteredData = data.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
     <form
        onSubmit={handleSearchSubmit}
        className="w-full flex justify-center mt-4 gap-2"
      >
        <input
          type="text"
          placeholder="Search movie title..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[70%] md:w-1/2 p-2 rounded-md border border-gray-400 focus:outline-none focus:border-red-500 text-gray-700"
        />
        <button
          type="submit"
          className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600"
        >
          Search
        </button>
      </form>
      <div className="flex flex-wrap justify-between px-3 mt-4 gap-2 grid grid-cols-2 sm:flex">
        {loading ? (
          <div className="w-full flex justify-center items-center min-h-screen">
            <ThreeDots height={40} color="white" />
          </div>
        ) : filteredData.length === 0 ? (
          <p className="text-white text-xl mt-10 text-center w-full">No movies found.</p>
        ) : (
          filteredData.map((e, i) => (
            <Link to={`/detail/${e.id}`} key={i}>
              <div className="card font-bold shadow-xl p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
                <img className="h-40 w-full md:h-72" src={e.image} alt={e.title} />

                <h1 className="text-white mt-2 ml-2">{e.title}</h1>

                <h1 className="flex items-center ml-2 text-white text-sm sm:text-base">
                  <span className="text-gray-500 mr-1">Rating: </span>
                  <ReactStars
                    size={15}
                    half={true}
                    value={e.rating / e.rated}
                    edit={false}
                  />
                </h1>

                <h1 className="text-white ml-2">
                  <span className="text-gray-500">Year: </span>
                  {e.year}
                </h1>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default Cards;
