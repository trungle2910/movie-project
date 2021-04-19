import React from "react";
import { Container } from "react-bootstrap";
import NowPlaying from "../components/NowPlaying";
import Popular from "../components/Popular";
import TopRated from "../components/TopRated";

import Upcoming from "../components/Upcoming";

const HomePage = () => {
  return (
    <>
      <div style={{ height: "100%" }}>
        <div className="bg-image-home"></div>
        <div className="bg-text-home">
          <h1 className="nav-text"> Fast Movies </h1>
        </div>
      </div>
      <Container fluid>
        <div>
          <h1 className="TvShowTitle">Upcoming Movies</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "30px",
            }}
          >
            <Upcoming />
          </div>
        </div>
        <div>
          <h1 className="TvShowTitle">Popular Movies</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "30px",
            }}
          >
            <Popular />
          </div>
        </div>
        <div>
          <h1 className="TvShowTitle">Top Rated Movies</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "30px",
            }}
          >
            <TopRated />
          </div>
        </div>
        <div>
          <h1 className="TvShowTitle"> Now Playing Movies</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              padding: "30px",
            }}
          >
            <NowPlaying />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
