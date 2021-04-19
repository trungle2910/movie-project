import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import api from "../apiService";
const FavoriteList = () => {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const posterUrl = process.env.REACT_APP_POSTER_BASE_URL;
  // const movieIds = Object.keys(sessionStorage);
  // console.log("check movieid", movieIds);

  // const getFavMovies = async () => {
  //   const movieIds = Object.keys(sessionStorage);
  //   console.log("check movieid", movieIds);
  //   const movies = await Promise.all(
  //     movieIds
  //       .filter((id) => id !== "ACCESS_TOKEN")
  //       .map(async (id) => {
  //         const res = await api.get(`/movie/${id}`);
  //         const movie = res.data;
  //         return movie;
  //       })
  //   );
  //   return movies;
  // };

  // const loadingFav = async () => {
  //   setIsLoading(true);
  //   let favMovies = await getFavMovies();
  //   setMovieList(favMovies);
  //   console.log(movieList);
  //   setIsLoading(false);
  // };
  // useEffect(() => {
  //   loadingFav();
  // }, []);

  return (
    <div>
      <div className="control-fav">
        {/* {isLoading && movieList ? (
          <p>Loading</p>
        ) : (
          <div className="d-flex flex-wrap control-card-favo-list">
            {movieList.map((movie) => (
              <div key={movie.id} className="d-flex">
                <div className="wrap-card">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={`${posterUrl}${movie.data.poster_path}`}
                    />
                    <Card.Body>
                      <Card.Title>{movie.data.original_title}</Card.Title>
                      <Card.Text>{movie.data.overview}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </div>
  );
};

export default FavoriteList;
