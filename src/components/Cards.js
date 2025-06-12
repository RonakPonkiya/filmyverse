import React, { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesref } from "../firebase/Firebase";
import { Link } from "react-router-dom";

const Cards = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const filteredData = data.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
    <div className="flex">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="p-2 rounded-md border mt-4 border-gray-400 m-2 text-gray-700"
      >
        <option value="All">All</option>
        <option value="Bollywood">Bollywood</option>
        <option value="Hollywood">Hollywood</option>
        <option value="Gujarati">Gujarati</option>
        <option value="South">South</option>
      </select>

      <div className="w-full flex justify-center mt-4 ">
        <input
          type="text"
          placeholder="Search movie title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[90%] md:w-1/2 p-2 h-11 rounded-md border border-gray-400 focus:outline-none focus:border-red-500 text-gray-700"
        />
      </div>
      </div>

      <div className="flex flex-wrap justify-start px-3 gap-1 md:gap-7 md:ml-12 grid grid-cols-2 sm:flex">
        {loading ? (
          <div className="w-full inset-0 col-span-2 flex justify-center items-center h-96">
            <ThreeDots height={40} color="white" />
          </div>
        ) : filteredData.length === 0 ? (
          <p className="text-white text-xl mt-10 text-center w-full">
            No movies found.
          </p>
        ) : (
          filteredData.map((e, i) => (
            <Link to={`/detail/${e.id}`} key={i}>
              <div className="card font-bold shadow-xl p-2 hover:-translate-y-3 cursor-pointer mt-6 transition-all duration-500">
                <img
                  className="h-40 w-40 md:w-48 md:h-72 sm:object-cover"
                  src={e.image}
                  alt={e.title}
                />

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

                <h1 className="text-white ml-2">
                  <span className="text-gray-500">Movie: </span>
                  {e.category}
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
