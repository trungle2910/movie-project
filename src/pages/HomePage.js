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

const HomePage = () => {
  const ImgLink = process.env.REACT_APP_IMAGE;
  const [pageNum, setPageNum] = useState(1);
  const [movieList, setMovieList] = useState([]);
  const [genres, setGenres] = useState([]);

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [totalPage, setTotalPage] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  // const history = useHistory();
  // const [searchInput, setSearchInput] = useState("");

  // const getTotalPage = async () => {
  //   const res = await api.get("/books");
  //   console.log(res.data.length);
  //   let maxPage = res.data.length;
  //   let maxPagi = Math.ceil(maxPage / limit);
  //   setTotalPage(maxPagi);
  // };

  // const handleClickMovie = (movieID) => {
  //   history.push(`/movies/${movieID}`);
  // };
  // const handleSearchInputChange = (e) => {
  //   setSearchInput(e.target.value);
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setQuery(searchInput);
  // };

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
      <PaginationBar
        pageNum={pageNum}
        setPageNum={setPageNum}
        totalPageNum={totalPage}
      />
      <Row>
        <Col sm={2} style={{ border: "1px solid red" }}>
          {" "}
          this is side bar
        </Col>
        <Col
          sm={10}
          style={{
            paddingRight: "2px",
            paddingLeft: "2px",
          }}
        >
          <Carousel className="mr-0">
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={`${ImgLink}${
                  movieList.length >= 3 ? movieList[0].backdrop_path : false
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
          <section id="team">
            <div
              class=" d-flex justify-content-around flex-wrap"
              style={{ margin: "50px" }}
            >
              {loading ? (
                <ScaleLoader
                  height="50px"
                  width="10px"
                  radius="4px"
                  margin="5px"
                  color="#329A8A"
                />
              ) : (
                movieList.map((movie) => {
                  return (
                    <div
                      style={{ margin: "20px" }}
                      class="image-flip"
                      ontouchstart="this.classList.toggle('hover');"
                    >
                      <div class="mainflip">
                        <div class="frontside">
                          <div class="card">
                            <div class="card-body text-center">
                              <p>
                                <img
                                  class=" img-fluid"
                                  src={`${ImgLink}${
                                    movie?.backdrop_path == null
                                      ? movie?.poster_path
                                      : movie?.backdrop_path
                                  }`}
                                  alt="card image"
                                />
                              </p>
                              <h6 class="card-title">{movie.title}</h6>
                              <p class="card-text">
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
                              <div>
                                {" "}
                                Genres:{" "}
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
                            </div>
                          </div>
                        </div>
                        <div class="backside">
                          <div class="card" style={{ borderRadius: "100px" }}>
                            <div class="card-body text-center mt-4">
                              <h6 class="card-title">{movie.title}</h6>
                              <p class="card-text">
                                {movie.overview.length <= 100
                                  ? movie.overview
                                  : movie.overview.slice(0, 100) + "......"}
                              </p>
                              <button
                                className="button button--calypso"
                                style={{ outline: "none" }}
                              >
                                <span>Expand now</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
