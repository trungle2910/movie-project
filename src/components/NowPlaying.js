/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../apiService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Badge } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router";

const NowPlaying = () => {
  const ImgLink = process.env.REACT_APP_IMAGE;
  const [pageNum, setPageNum] = useState(1);
  const [genres, setGenres] = useState([]);

  const [movieList, setMovieList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const history = useHistory();

  const handleClickMovie = (movieID) => {
    history.push(`/movie/${movieID}`);
  };
  // setId(movieId);
  useEffect(() => {
    const getTopRate = async () => {
      try {
        let url = `/movie/now_playing?page=${pageNum}`;
        const res = await api.get(url);
        // console.log("res", res);
        setMovieList(res.data.results);
        // console.log("recommen", recommenList);
        setTotalPage(res.data.total_pages);
      } catch (error) {
        toast.error(error);
      }
    };
    getTopRate();
  }, [pageNum]);
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
    slidesToShow: 4,
    slidesToScroll: 2,
    pauseOnHover: true,
  };
  return (
    <>
      <Slider {...settings} style={{ width: "80%" }}>
        {movieList.map((movie) => (
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
      <div
        className="wrap"
        style={{ alignSelf: "center", textAlign: "center" }}
      >
        <button
          className="buttonStyle"
          onClick={() =>
            setPageNum(pageNum < totalPage ? pageNum + 1 : totalPage)
          }
        >
          More
        </button>
      </div>
    </>
  );
};

export default NowPlaying;
