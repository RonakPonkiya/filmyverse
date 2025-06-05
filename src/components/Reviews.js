import React, { useContext, useEffect, useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "../firebase/Firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { Appstate } from "../App";
import { useNavigate } from "react-router-dom";

const Reviews = ({ id, prevRating, userRated }) => {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  const [form, setForm] = useState("");
  const [data, setData] = useState([]);

  const sendReview = async () => {
    setLoading(true);
    try {
      if (useAppstate.login) {
        const newReview = {
          movieid: id,
          name: useAppstate.userName,
          rating: rating,
          thought: form,
          timestamp: new Date().getTime(),
        };

        await addDoc(reviewsRef, newReview);

        const ref = doc(db, "movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1,
        });

        setData((prev) => [newReview, ...prev]);

        setRating(0);
        setForm("");

        swal({
          title: "Review Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
      } else {
        navigate("/login");
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      let quer = query(reviewsRef, where("movieid", "==", id));
      const querySnapShot = await getDocs(quer);

      querySnapShot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });

      setReviewsLoading(false);
    }
    getData();
  }, []);
  return (
    <div className="w-full mt-4 border-t-2 border-gray-600">
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />

      <input
        value={form}
        onChange={(e) => setForm(e.target.value)}
        placeholder="Share Your Thoughts..."
        className="w-full mt-2 p-3 outline-none bg-gray-900"
      />
      <button
        onClick={sendReview}
        className="bg-green-600 flex justify-center w-full p-2"
      >
        {loading ? <TailSpin height={20} color="white" /> : "Share"}
      </button>
      {reviewsLoading ? (
        <div className="mt-6 flex justify-center">
          <ThreeDots height={10} color="white" />
        </div>
      ) : (
        <div className="mt-4">
          {data.map((e, i) => {
            return (
              <div
                className="p-2 w-full mt-2 border-b border-gray-600 bg-gray-900 bg-opacity-35"
                key={i}
              >
                <div className="flex items-center">
                  <p className="text-blue-500">{e.name}</p>
                  <p className="ml-3 text-xs ">
                    ({new Date(e.timestamp).toLocaleString()})
                  </p>
                </div>
                <ReactStars
                  size={15}
                  half={true}
                  value={e.rating}
                  edit={false}
                />

                <p>{e.thought}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Reviews;
