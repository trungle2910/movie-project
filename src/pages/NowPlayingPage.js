import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import api from "../apiService";
import "bootstrap/dist/css/bootstrap.min.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import PaginationBar from "../components/PaginationBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Badge, Carousel, Col, Container, Row } from "react-bootstrap";
import SearchForm from "../components/SearchForm";
import FilterBoard from "../components/FilterBoard";

const NowPlayingPage = () => {
  const ImgLink = process.env.REACT_APP_IMAGE;
  const [pageNum, setPageNum] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);
  let [year, setYear] = useState({ min: 1980, max: 2020 });
  let [rating, setRating] = useState({ min: 0, max: 10 });
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const history = useHistory();

  const handleClickMovie = (movieID) => {
    history.push(`/movie/${movieID}`);
  };
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchInput);
  };
  const sortByRate = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.vote_average - b.vote_average);
    } else {
      sortedList = movieList.sort((a, b) => b.vote_average - a.vote_average);
    }
    setMovieList([...sortedList]);
  };

  const sortByPopular = (direction) => {
    let sortedList;
    if (direction === "asc") {
      sortedList = movieList.sort((a, b) => a.popularity - b.popularity);
    } else {
      sortedList = movieList.sort((a, b) => b.popularity - a.popularity);
    }

    setMovieList([...sortedList]);
  };
  const filterByRate = (value) => {
    let filteredList = movieList.filter(
      (movie) =>
        movie.vote_average > value.min && movie.vote_average < value.max
    );
    setRating(value);
    setMovieList(filteredList);
  };

  const filterByYear = (value) => {
    let filteredList = movieList.filter((movie) => {
      let year = parseInt(movie.release_date.split("-")[0]);
      return year > value.min && year < value.max;
    });
    setYear(value);
    setMovieList(filteredList);
  };

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        let url = `/movie/now_playing?page=${pageNum}`;
        if (query) {
          url = `/search/movie?language=en-US&page=1&query=${query}`;
        }
        let res = await api.get(url);
        setMovieList(res.data.results);
        setPageNum(res.data.page);
        setTotalPage(res.data.total_pages);
        setTotalResult(res.data.total_results);
        console.log(movieList);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getData();
  }, [pageNum, query]);

  useEffect(() => {
    let url = `genre/movie/list?language=en-US`;
    const fetchMovieGenreData = async () => {
      const response = await api.get(url);
      const data = response.data;
      setGenres(data.genres);
    };
    fetchMovieGenreData();
  }, []);
  return (
    <Container fluid>
      <Row>
        <Col sm={2} style={{ position: "relative" }}>
          <FilterBoard
            sortByRate={sortByRate}
            sortByPopular={sortByPopular}
            filterByYear={filterByYear}
            filterByRate={filterByRate}
            year={year}
            rating={rating}
          />
        </Col>
        <Col
          sm={10}
          style={{
            paddingRight: "2px",
            paddingLeft: "2px",
          }}
        >
          <div>
            {loading ? (
              <ScaleLoader
                height="50px"
                width="10px"
                radius="4px"
                margin="5px"
                color="yellow"
              />
            ) : (
              <Carousel className="mr-0">
                <Carousel.Item interval={1000}>
                  <img
                    className="d-block w-100"
                    src={`${ImgLink}${
                      movieList.length >= 3
                        ? movieList[0].backdrop_path == null
                          ? movieList[0].poster_path
                          : movieList[0].backdrop_path
                        : false
                    }`}
                    alt="First slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                  <img
                    className="d-block w-100"
                    src={`${ImgLink}${
                      movieList.length >= 3 ? movieList[1].backdrop_path : false
                    }`}
                    alt="Third slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src={`${ImgLink}${
                      movieList.length >= 3 ? movieList[3].backdrop_path : false
                    }`}
                    alt="Third slide"
                  />
                  <Carousel.Caption></Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            )}
            <SearchForm
              className={{}}
              loading={loading}
              searchInput={searchInput}
              handleSearchChange={handleSearchInputChange}
              handleSubmit={handleSubmit}
            />
            <section id="team">
              <div
                className=" d-flex justify-content-around flex-wrap"
                style={{ margin: "50px" }}
              >
                {movieList.map((movie) => {
                  return (
                    <div
                      style={{ margin: "20px" }}
                      className="image-flip"
                      ontouchstart="this.classList.toggle('hover');"
                    >
                      <div className="mainflip">
                        <div className="frontside">
                          <div className="card">
                            <div className="card-body text-center">
                              <p>
                                <img
                                  className=" img-fluid imgCardStyle"
                                  src={`${ImgLink}${
                                    movie?.backdrop_path == null
                                      ? movie?.poster_path
                                      : movie?.backdrop_path
                                  }`}
                                  alt="card image"
                                />
                              </p>
                              <h6 className="card-title">{movie.title}</h6>
                              <div>
                                {movie.genre_ids.map((genreId) => {
                                  const genre = genres.find(
                                    (genre) => genre.id === genreId
                                  );
                                  return (
                                    <Badge
                                      key={genreId}
                                      className="badge badge-info mr-2"
                                    >
                                      {genre ? genre.name : "unknown"}
                                    </Badge>
                                  );
                                })}
                              </div>
                              <div
                                className="card-text"
                                style={{
                                  fontSize: "16px",
                                  color: "white",
                                  paddingTop: "10px",
                                }}
                              >
                                <span>
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
                                </span>{" "}
                                <span> / {movie.vote_count} Voted</span>
                              </div>
                              <div>
                                {movie.adult === true ? (
                                  <p
                                    style={{
                                      fontSize: "20px",
                                      color: "red",
                                      fontWeight: "800",
                                      paddingTop: "10px",
                                    }}
                                  >
                                    Adult Content Need 18+
                                  </p>
                                ) : (
                                  <p
                                    style={{
                                      fontSize: "16px",
                                      color: "white",
                                      fontWeight: "700",
                                    }}
                                  >
                                    Not Adult Content
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="backside">
                          <div
                            className="card"
                            style={{ borderRadius: "100px" }}
                          >
                            <div className="card-body text-center mt-4">
                              <h6
                                className="card-title"
                                style={{ fontSize: "20px", fontWeight: "700" }}
                              >
                                {movie.title}
                              </h6>
                              <div className="card-text-nowplay">
                                <p>Release In {movie.release_date}</p>
                                <p>Popular: {movie.popularity}</p>
                                <p>
                                  {movie.overview.length <= 250
                                    ? movie.overview
                                    : movie.overview.slice(0, 220) + "......"}
                                </p>
                              </div>
                              <button
                                className="button button--calypso"
                                style={{ outline: "none" }}
                                onClick={() => handleClickMovie(movie.id)}
                              >
                                <span>Expand now</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPage}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default NowPlayingPage;
