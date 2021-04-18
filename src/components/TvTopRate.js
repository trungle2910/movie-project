import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";

import api from "../apiService";

const TvTopRate = () => {
  const [movieList, setMovieList] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  // const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        let url = `/tv/top_rated?page=${pageNum}`;
        let res = await api.get(url);
        // setMovieList(...movieList, ...res.data.results);
        setMovieList(res.data.results);
        console.log("hahaha", res.data.results);
        console.log(movieList.length);
        setTotalPage(res.data.total_pages);
        // setTimeout(getData(), 1000);
      } catch (error) {
        toast.error(error);
      }
    };
    getData();
  }, [pageNum]);

  function ShowImg() {
    return (
      <div>
        <InfiniteScroll
          style={{ display: "flex", height: "auto" }}
          dataLength={movieList.length}
          next={() => {
            pageNum < totalPage
              ? setPageNum(pageNum + 1)
              : setPageNum(totalPage);
          }}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          height={"auto"}
        >
          {movieList.map((movie) => {
            return (
              <div
                style={{
                  height: "300px",
                  width: "300px",
                  border: "solid 10px red",
                  margin: "10px",
                  display: "flex",
                }}
              >
                <h1>{movie.name}</h1>
              </div>
            );
          })}
        </InfiniteScroll>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1>top rated</h1>
        <ShowImg />
      </div>
      <div>
        <h1>top </h1>
        <ShowImg />
      </div>
      <div>
        <h1> rated</h1>
        <ShowImg />
      </div>
    </div>
  );
};

export default TvTopRate;
