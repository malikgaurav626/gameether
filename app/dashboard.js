"use client";
import { setrouteLocation } from "./store";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getsimilarGames } from "./apicalls";
import DashboardBody from "./dashboardbody";
import SearchBody from "./searchbody";
import NewsBody from "./newsbody";

const platformNames = {
  1: "Official",
  2: "Wikia",
  3: "Wikipedia",
  4: "Facebook",
  5: "Twitter",
  6: "Twitch",
  8: "Instagram",
  9: "YouTube",
  10: "iPhone",
  11: "iPad",
  12: "Android",
  13: "Steam",
  14: "Reddit",
  15: "Discord",
  16: "Google Plus",
  17: "Tumblr",
  18: "LinkedIn",
  19: "Pinterest",
  20: "SoundCloud",
};

export default function Dashboard() {
  const routeLocation = useSelector((state) => state.routeLocation);
  const auth_token = useSelector((state) => state.authToken);
  const dispatch = useDispatch();
  const [offcanvasContent, setOffcanvasContent] = useState({});
  const [similarGames, setSimilarGames] = useState([]);
  const [selectedNews, setSelectedNews] = useState({});
  const [imageSize, setImageSize] = useState(
    window.innerWidth < 576 ? "t_screenshot_big/" : "t_screenshot_med/"
  );

  useEffect(() => {
    const handleResize = () => {
      setImageSize(
        window.innerWidth < 576 ? "t_screenshot_big/" : "t_screenshot_med/"
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const similar_ids = offcanvasContent?.similar_games?.map(
      (games) => games.id
    );
    const processData = async () => {
      try {
        const data = await getsimilarGames(
          auth_token.access_token,
          similar_ids
        );
        setSimilarGames(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    processData();
  }, [offcanvasContent]);

  function handleCarouselClick(e) {
    e.stopPropagation();
  }
  function handleOffcanvasClose() {
    setOffcanvasContent({});
  }
  function handleSimilarClick(game_element) {
    setOffcanvasContent(game_element);
    const offcanvasElement = document.getElementById("offcanvas-body-id");
    setTimeout(() => {
      offcanvasElement.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 500);
  }
  return (
    <>
      <div
        className="surface"
        style={{
          backdropFilter: "none",
          backgroundColor: "transparent",
          border: "none",
          overflow: "auto",
          position: "relative",
        }}
      >
        <div className="navbar navbar-expand-md">
          <button
            className="navbar-brand ms-4 mt-2 mb-2 light-glass-btn me-btn"
            onClick={() => dispatch(setrouteLocation(0))}
          >
            <div className="d-inline-block m-0 p-0">
              <ul className="me-container m-0 p-0 d-flex flex-column">
                <li>game</li>
                <li className="m-0 p-0">Ether</li>
                <li className="fw-bold m-0 p-0">क्माध्यम</li>
              </ul>
            </div>
          </button>
          <button
            className="d-md-none navbar-toggler d-inline me-4 toggler-icon light-glass-btn-light-border"
            aria-label="Toggle navigation"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapseId2"
            aria-controls="navbarCollapseId2"
            aria-expanded="false"
            aria-labelledby="Da toggle2"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapseId2">
            <div className="navbar-nav d-flex flex-row d-md-block justify-content-center justify-content-sm-between">
              <button
                className="nav-item ms-4 mt-2 mb-2 light-glass-btn me-btn"
                onClick={() => dispatch(setrouteLocation(1))}
              >
                <div className="d-inline-block">
                  <ul className="me-container d-flex flex-column">
                    <li>Random</li>
                    <li className="fw-bold">अपूर्व</li>खोजें
                  </ul>
                </div>
              </button>
              <button
                className="nav-item ms-4 mt-2 mb-2 light-glass-btn me-btn"
                onClick={() => dispatch(setrouteLocation(2))}
              >
                <div className="d-inline-block">
                  <ul className="me-container d-flex flex-column">
                    <li>Search</li>
                    <li className="fw-bold">खोजें</li>
                  </ul>
                </div>
              </button>
              <button
                className="nav-item ms-4 me-4 mt-2 mb-2 light-glass-btn me-btn"
                onClick={() => dispatch(setrouteLocation(3))}
              >
                <div className="d-inline-block">
                  <ul className="me-container d-flex flex-column">
                    <li>News</li>
                    <li className="fw-bold">खबरें</li>
                  </ul>
                </div>
              </button>
            </div>
          </div>
        </div>
        <div>
          {routeLocation == 1 ? (
            <DashboardBody
              offcanvasContent={offcanvasContent}
              setOffcanvasContent={setOffcanvasContent}
              similarGames={similarGames}
              setSimilarGames={setSimilarGames}
              imageSize={imageSize}
            />
          ) : routeLocation == 2 ? (
            <SearchBody
              offcanvasContent={offcanvasContent}
              setOffcanvasContent={setOffcanvasContent}
              similarGames={similarGames}
              setSimilarGames={setSimilarGames}
              imageSize={imageSize}
            />
          ) : routeLocation == 3 ? (
            <NewsBody
              selectedNews={selectedNews}
              setSelectedNews={setSelectedNews}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        class="offcanvas offcanvas-start w-100"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            {offcanvasContent?.name}
            <span className="offcanvas-rating badge">
              {Math.round(
                offcanvasContent?.rating ? offcanvasContent?.rating : -1
              )}
            </span>
            <div className="offcanvas-subtitle">
              {offcanvasContent?.release_dates
                ? offcanvasContent.release_dates[0].human
                : "N/A"}
            </div>
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            onClick={handleOffcanvasClose}
          ></button>
        </div>
        <div className="offcanvas-body" id="offcanvas-body-id">
          <div className="offcanvas-genre">
            {offcanvasContent?.genres?.map((genre) => (
              <span className="badge rounded-5 ms-1 me-1 offcanvas-genre-element">
                {genre.name}
              </span>
            ))}
          </div>
          <hr></hr>
          <div className="offcanvas-platforms">
            {offcanvasContent?.platforms?.map((platform) => (
              <span className="badge rounded-5 offcanvas-platforms-element">
                {platform.name}
              </span>
            ))}
          </div>
          <div className="offcanvas-cover">
            {offcanvasContent?.cover ? (
              <img
                src={
                  "//images.igdb.com/igdb/image/upload/t_" +
                  "screenshot_big/" +
                  offcanvasContent.cover.image_id +
                  ".jpg"
                }
                width={"100%"}
                style={{
                  maxWidth: "600px",
                  height: "auto",
                }}
                className="cover-img"
              ></img>
            ) : (
              ""
            )}
            <div className="offcanvas-game-modes">
              {offcanvasContent?.game_modes?.map((mode) => (
                <span className="badge offcanvas-game-mode">{mode.name}</span>
              ))}
            </div>
          </div>
          <div className="offcanvas-summary text-sm-start text-center">
            {offcanvasContent?.summary}
          </div>
          <div className="offcanvas-keywords">
            {offcanvasContent?.keywords?.map((keyword) => (
              <span className="badge keyword">{keyword.name}</span>
            ))}
          </div>
          <div className="offcanvas-video">
            {offcanvasContent?.videos?.map((vid) => (
              <iframe
                width="560"
                height="315"
                className="videos"
                src={"https://www.youtube.com/embed/" + vid.video_id}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            ))}
          </div>
          <div className="offcanvas-websites">
            {offcanvasContent?.websites?.map((web, i) => (
              <a
                href={web.url}
                target="_blank"
                className="badge btn btn-outline-dark offcanvas-websites-link"
              >
                {platformNames[web.category]}
              </a>
            ))}
          </div>
          <hr></hr>
          <div className="offcanvas-similars row m-0 p-0">
            {similarGames?.map((ele, i) => (
              <div
                className="col-lg-4 col-md-6 col-12 dashboard-element"
                key={"db" + i}
              >
                <div
                  className="card row flex-row m-0 p-0 card-class"
                  onClick={() => handleSimilarClick(ele)}
                >
                  <div className="col-lg-6 col-sm-6 col-12 m-0 p-0">
                    <div
                      id={"carouselExampleOff-" + i}
                      className="carousel slide"
                      style={{
                        width: "fit-content",
                      }}
                    >
                      <div className="carousel-inner card-img-top">
                        {ele?.screenshots?.map((image, j) => (
                          <div
                            className={
                              "carousel-item " + (j === 0 ? "active" : "")
                            }
                            key={"dboc" + i + "-" + j}
                          >
                            <img
                              src={
                                "//images.igdb.com/igdb/image/upload/" +
                                imageSize +
                                image.image_id +
                                ".webp"
                              }
                              className="actualimage"
                              width="100%"
                              height="auto"
                              style={{
                                maxHeight: "250px",
                                maxWidth: "300px",
                              }}
                              alt={"screenshot " + i + "-" + j}
                            />
                          </div>
                        ))}
                        {ele.screenshots == undefined && (
                          <div className={"carousel-item active"}>
                            <img
                              src={"/tempo.png"}
                              width="100%"
                              height="auto"
                              className="actualimage"
                              style={{
                                maxHeight: "250px",
                                maxWidth: "300px",
                              }}
                              alt={"screenshot tempo-" + i}
                            ></img>
                          </div>
                        )}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={"#carouselExampleOff-" + i}
                        data-bs-slide="prev"
                        onClick={handleCarouselClick}
                      >
                        <span
                          className="carousel-control-prev-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={"#carouselExampleOff-" + i}
                        data-bs-slide="next"
                        onClick={handleCarouselClick}
                      >
                        <span
                          className="carousel-control-next-icon"
                          aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                  <div
                    className="go-link col-12 col-sm-6 col-lg-6 m-0 p-0"
                    // role="button"
                    // type="button"
                    // data-bs-toggle="offcanvas"
                    // data-bs-target="#offcanvasExample"
                    // aria-controls="offcanavsExample"
                  >
                    {
                      <div className="dashboard-element-name pt-1 pt-sm-0 card-title text-white">
                        {ele.name}
                      </div>
                    }
                    {
                      <div className="dashboard-element-release-date card-subtitle text-white">
                        {ele?.release_dates?.length
                          ? ele.release_dates[0].human
                          : ""}
                      </div>
                    }
                    {
                      <div className="dashboard-element-platforms d-md-none">
                        {ele?.platforms?.map((platform) => (
                          <span className="badge text-dark rounded-5 platform-pills text-white">
                            {platform.name}
                          </span>
                        ))}
                      </div>
                    }
                  </div>
                  <hr className="m-0 p-0" />
                  <div className="col-12 m-0 p-0 dashboard-element-synopsis d-none d-sm-block text-white">
                    {ele?.summary
                      ? ele?.summary?.slice(0, 100) + "... "
                      : "No Synopsis available"}
                    {/* <button className="read-more-button">read more</button> */}
                  </div>
                  <div className="col-12 m-0 p-0 dashboard-element-synopsis d-sm-none text-white">
                    {ele?.summary
                      ? ele?.summary?.slice(0, 190) + "... "
                      : "No Synopsis available"}
                    {/* <button className="read-more-button">read more</button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr></hr>
          <div className=" badge" id="originalfooter">
            By <span className="vapor">Vapor</span>
            <span className="squad">Squad</span>
          </div>
        </div>
      </div>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNews"
        aria-labelledby="offcanvasNewsLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNewsLabel">
            {selectedNews?.name}
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body pt-0">
          <hr className="m-0"></hr>
          <div className="news-offcanvas-date badge fst-italic">
            {selectedNews?.datePublished
              ? new Date(selectedNews?.datePublished).toLocaleString()
              : "N/A"}
          </div>
          <div className="news-offcanvas-img">
            <img
              className="news-img mt-2 mb-2"
              src={
                selectedNews?.image?.contentUrl
                  ? selectedNews?.image?.contentUrl
                  : "/tempo.png"
              }
            ></img>
          </div>
          <div className="news-offcanvas-keywords">
            {selectedNews?.about?.map((keyword) => (
              <span className="news-keyword-element badge border rounded-5">
                {keyword.name}
              </span>
            ))}
          </div>
          <hr></hr>
          <div className="news-offcanvas-description">
            {selectedNews?.description
              ? selectedNews?.description
              : "No description available"}
          </div>
          <hr></hr>
          <div className="news-offcanvas-source">
            {selectedNews?.provider?.url}
            <a
              href={selectedNews ? selectedNews?.url : "https://msn.com/"}
              target="_blank"
            >
              {selectedNews?.provider?.map((provid, i) => (
                <img
                  key={i}
                  src={
                    provid?.image?.thumbnail?.contentUrl
                      ? provid?.image?.thumbnail?.contentUrl
                      : "/tempo.png"
                  }
                  alt={provid?.name}
                  className="news-offcanvas-provider-img"
                ></img>
              ))}
            </a>
          </div>
          <br></br>
          <div className="footer position-relative">
            <div className=" badge vapor-squad">
              By <span className="vapor">Vapor</span>
              <span className="squad">Squad</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
