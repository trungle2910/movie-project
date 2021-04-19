/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../apiService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { Badge } from "react-bootstrap";
import { useHistory } from "react-router";

const Recommen = ({ movieIdRecommen }) => {
  const ImgLink = process.env.REACT_APP_IMAGE;
  const [genres, setGenres] = useState([]);

  const [recommenList, setRecommenList] = useState([]);
  const history = useHistory();

  const handleClickMovie = (movieID) => {
    history.push(`/movie/${movieID}`);
  };
  // setId(movieIdRecommen);
  useEffect(() => {
    const getRecommen = async () => {
      try {
        let url = `/movie/${movieIdRecommen}/recommendations?`;
        const res = await api.get(url);
        setRecommenList(res.data.results);
      } catch (error) {
        toast.error(error);
      }
    };
    getRecommen();
  }, []);
  useEffect(() => {
    let url = `genre/movie/list?language=en-US`;
    const fetchMovieGenreData = async () => {
      const response = await api.get(url);
      const data = response.data;
      setGenres(data.genres);
    };
    fetchMovieGenreData();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    pauseOnHover: true,
  };
  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <h1 className="TvShowTitle">RECOMMEND FOR YOU</h1>
      </div>
      <Slider {...settings} style={{ width: "95%", paddingLeft: "20px" }}>
        {recommenList &&
          recommenList.map((movie) => (
            <div
              className="containerSlider"
              onClick={() => handleClickMovie(movie.id)}
            >
              <img
                src={`${ImgLink}${
                  movie?.backdrop_path == null
                    ? movie?.poster_path
                    : movie?.backdrop_path
                }`}
                alt=""
                className="imageSlider"
              />
              <div className="middleSlider">
                <h3 className="textSlider">{movie.title}</h3>
                <div
                  style={{
                    color: "white",
                  }}
                >
                  Genres:
                  {movie.genre_ids.map((genreId) => {
                    const genre = genres.find((genre) => genre.id === genreId);
                    return (
                      <Badge key={genreId} className="badge badge-info mr-2">
                        {genre ? genre.name : "unknown"}
                      </Badge>
                    );
                  })}
                </div>
                <p
                  className="card-text"
                  style={{
                    color: "yellow",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    spin
                    className="mr-2 "
                    style={{
                      fontSize: "25px",
                      color: "yellow",
                    }}
                  />{" "}
                  {movie.vote_average}
                </p>
              </div>
            </div>
          ))}
      </Slider>
    </>
  );
};

export default Recommen;
