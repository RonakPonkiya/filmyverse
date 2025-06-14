import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { addDoc } from "firebase/firestore";
import { moviesref } from "../firebase/Firebase";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    rated: 0,
    rating: 0,
    category: "Bollywood",
  });

  const [loading, setLoading] = useState(false);

  const addMovie = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        await addDoc(moviesref, form);
        swal({
          title: "sucessfully added",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate("/");
        setForm({
          title: "",
          year: "",
          description: "",
          image: "",
        });
      } else {
        navigate("/login");
      }
    } catch (err) {
      swal({
        title: "err",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  return (
    <div className="p-5 md:p-0">
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-4">
            <h1 className="sm:text-3xl text-3xl font-medium title-font mb-4 text-gray-200">
              MOVIE DETAIL
            </h1>
          </div>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/3">
              <div className="relative">
                <label htmlFor="name" class="leading-7 text-sm text-gray-200">
                  Title
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/3">
              <div className="relative">
                <label htmlFor="email" class="leading-7 text-sm text-gray-200">
                  Year
                </label>
                <input
                  type=""
                  id="year"
                  name="year"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

              <div className="p-2 w-1/3">
                <div className="relative">
                  <label
                    htmlFor="category"
                    className="leading-7 text-sm text-gray-200"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                    className="w-full h-10 bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-1 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option value="Bollywood">Bollywood</option>
                    <option value="Hollywood">Hollywood</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="South">South</option>
                  </select>
                </div>
              </div>

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  class="leading-7 text-sm text-gray-200"
                >
                  Image Link
                </label>
                <input
                  id="message"
                  name="message"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    class="leading-7 text-sm text-gray-200"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={addMovie}
                  class="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg"
                >
                  {loading ? <TailSpin height={25} color="white" /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddMovie;
