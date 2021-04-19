import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../apiService";
import { Card, Button, Modal, Container, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Recommen from "../components/Recommen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const DetailPage = () => {
  const [movieTrailer, setMovieTrailer] = useState(null);
  const [movieDetail, setMovieDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewList, setReviewList] = useState([]);
  const [genres, setGenres] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const ImgLink = process.env.REACT_APP_IMAGE;

  const params = useParams();
  const MOVIE_ID = params.id;
  const handleCloseTrailer = () => {
    setShowTrailer(false);
  };

  const handleOpenTrailer = () => {
    setShowTrailer(true);
  };
  useEffect(() => {
    let url = `genre/movie/list?language=en-US`;
    const fetchMovieGenreData = async () => {
      const response = await api.get(url);
      const data = response.data;
      setGenres(data.genres);
    };
    fetchMovieGenreData();
  }, []);
  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        setIsLoading(true);
        const API_URL = `/movie/${MOVIE_ID}`;
        const response = await api.get(API_URL);
        const data = response.data;
        console.log("data from select", data);
        setMovieDetail(data);
      } catch (error) {
        window.alert("not found");
      }
      setIsLoading(false);
    };

    const getTrailer = async () => {
      try {
        setIsLoading(true);
        let res = await api.get(
          `/movie/${MOVIE_ID}/videos?language=en-US&page=1`
        );
        setMovieTrailer(res.data.results);
        //
        // setIsLoading(false);
      } catch (error) {}
      setIsLoading(false);
    };
    console.log("ID+++++", MOVIE_ID);

    const getReview = async () => {
      try {
        setIsLoading(true);
        let res = await api.get(
          `/movie/${MOVIE_ID}/reviews?language=en-US&page=1`
        );
        setReviewList(res.data.results);
      } catch (error) {
        console.log("Not found");
      }
      setIsLoading(false);
    };
    getMovieDetail();
    getTrailer();
    getReview();
  }, []);
  const RenderDetail = () => {
    return (
      <Container>
        {isLoading || !movieDetail ? (
          <>
            <p>Loading</p>
          </>
        ) : (
          <>
            <div className="control-detailpage">
              <div className="nav-bar-1"></div>

              <section className="all-in">
                <div className="Detail-film d-flex">
                  <div className="col-6 photo">
                    <Card.Img
                      variant="top"
                      src={`${ImgLink}${
                        movieDetail?.backdrop_path == null
                          ? movieDetail?.backdrop_path
                          : movieDetail?.poster_path
                      }`}
                    />
                  </div>
                  <div className="col-6 infor">
                    {/* <span className="type-film">
                      {movieDetail.genres[0].name}
                    </span> */}
                    <div className="movie-title">
                      <h1 className="detailTitle">{movieDetail.title}</h1>
                      <h5 style={{ color: "white" }}>{movieDetail.tagline}</h5>
                      <div
                        style={{
                          color: "white",
                        }}
                      >
                        {movieDetail?.genres.map((genre) => {
                          return (
                            <Badge
                              key={genre.Id}
                              className="badge badge-danger mr-2 "
                              style={{ fontSize: "15px" }}
                            >
                              {genre ? genre.name : "unknown"}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                    <div className="d-flex control">
                      <div className="card-text-nowplay">
                        <p>
                          <Badge className="badge badge-info">
                            Release Day:
                          </Badge>{" "}
                          {movieDetail.release_date}
                        </p>
                        <p>
                          <Badge className="badge badge-info">Popular:</Badge>{" "}
                          {movieDetail.popularity}
                        </p>
                        <p>
                          <Badge className="badge badge-info">
                            Time remaining:
                          </Badge>
                          {movieDetail.runtime} minutes
                        </p>
                      </div>
                    </div>
                    <div style={{ color: "yellow" }}>
                      <span>
                        <FontAwesomeIcon
                          icon={faStar}
                          className="mr-2 "
                          style={{
                            fontSize: "25px",
                            color: "yellow",
                          }}
                        />{" "}
                        {movieDetail.vote_average}
                      </span>{" "}
                      <span> / {movieDetail.vote_count} Voted</span>
                    </div>
                    <div className="text-group"></div>
                    <div className="control-fav-list">
                      <Button
                        className="button-trailer"
                        onClick={handleOpenTrailer}
                      >
                        Trailer
                      </Button>
                    </div>
                    <section className="cmt">
                      <div className="overview">
                        <h2 className="overviewTitle">Overview</h2>
                        <p style={{ color: "white" }}>{movieDetail.overview}</p>
                      </div>
                      <div className="comment-review">
                        <h2 className="overviewTitle">
                          Review ({reviewList.length})
                        </h2>
                        {reviewList.map((review) => (
                          <div>
                            <h4 className="authorReview">
                              {review.author_details.username} :
                            </h4>
                            <span style={{ color: "white", fontSize: "13px" }}>
                              {review.content.length <= 500
                                ? review.content
                                : review.content.slice(0, 500) + "......"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </section>
            </div>
            <Modal show={showTrailer} size="xl" onHide={handleCloseTrailer}>
              <Modal.Header closeButton>
                <Modal.Title>{movieDetail.original_title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {movieTrailer ? (
                  <iframe
                    src={`${process.env.REACT_APP_VIDEO}/${movieTrailer[0]}`}
                    width="100%"
                    height="570px"
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="video"
                  />
                ) : (
                  <p>No Trailer Found For This Movie</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseTrailer}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        )}
      </Container>
    );
  };
  return (
    <Container fluid>
      <RenderDetail />
      <Recommen movieIdRecommen={MOVIE_ID} />
    </Container>
  );
};

export default DetailPage;
