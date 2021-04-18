import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../apiService";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Recommen = ({ movieId }) => {
  const ImgLink = process.env.REACT_APP_IMAGE;
  const [id, setId] = useState(100);
  const [recommenList, setRecommenList] = useState([]);
  // setId(movieId);
  useEffect(() => {
    const getRecommen = async () => {
      try {
        let url = `/movie/100/recommendations?`;
        const res = await api.get(url);
        console.log("res", res);
        setRecommenList(res.data.results);
        console.log("recommen", recommenList);
      } catch (error) {
        toast.error(error);
      }
    };
    getRecommen();
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <>
      <h1>Recommen Video</h1>
      <Slider {...settings}>
        {recommenList.map((movie) => {
          return (
            <div>
              <img
                style={{
                  height: "250px",
                  width: "400px",
                  paddingRight: "10px",
                }}
                src={`${ImgLink}${
                  movie?.backdrop_path == null
                    ? movie?.poster_path
                    : movie?.backdrop_path
                }`}
                alt="card image"
              />
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default Recommen;
