"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSearch, getsimilarGames } from "./apicalls";

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

export default function SearchBody({
  offcanvasContent,
  setOffcanvasContent,
  setSimilarGames,
  imageSize,
}) {
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState([]);
  const auth_token = useSelector((state) => state.authToken);

  useEffect(() => {
    const processData = async () => {
      try {
        const data = await getSearch(auth_token.access_token, query);
        setQueryResults(data.data);
      } catch (e) {
        console.error(e);
      }
    };

    processData();
  }, [query]);

  function handleClick(ele) {
    setOffcanvasContent(ele);
  }
  function handleCarouselClick(e) {
    e.stopPropagation();
  }
  return (
    <>
      <div className="search-container">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            className="search-input"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
        </form>
      </div>
      <div className="dashboard-search-results-container row m-0 p-0 mt-3">
        {queryResults?.map((ele, i) => (
          <div
            className="col-lg-4 col-md-6 col-12 dashboard-element"
            key={"db" + i}
          >
            <div
              className="card row flex-row m-0 p-0 card-class"
              onClick={() => handleClick(ele)}
            >
              <div className="col-lg-6 col-sm-6 col-12 m-0 p-0">
                <div
                  id={"carouselExample-" + i}
                  className="carousel slide"
                  style={{
                    width: "fit-content",
                  }}
                >
                  <div className="carousel-inner card-img-top">
                    {ele?.screenshots?.map((image, j) => (
                      <div
                        className={"carousel-item " + (j === 0 ? "active" : "")}
                        key={"db" + i + "-" + j}
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
                    data-bs-target={"#carouselExample-" + i}
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
                    data-bs-target={"#carouselExample-" + i}
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
                role="button"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanavsExample"
              >
                {
                  <div className="dashboard-element-name pt-1 pt-sm-0 card-title">
                    {ele.name}
                  </div>
                }
                {
                  <div className="dashboard-element-release-date card-subtitle">
                    {ele?.release_dates?.length
                      ? ele.release_dates[0].human
                      : ""}
                  </div>
                }
                {
                  <div className="dashboard-element-platforms d-md-none">
                    {ele?.platforms?.map((platform) => (
                      <span className="badge text-dark rounded-5 platform-pills">
                        {platform.name}
                      </span>
                    ))}
                  </div>
                }
              </div>
              <hr className="m-0 p-0" />
              <div className="col-12 m-0 p-0 dashboard-element-synopsis d-none d-sm-block">
                {ele?.summary
                  ? ele?.summary?.slice(0, 100) + "... "
                  : "No Synopsis available"}
                {/* <button className="read-more-button">read more</button> */}
              </div>
              <div className="col-12 m-0 p-0 dashboard-element-synopsis d-sm-none">
                {ele?.summary
                  ? ele?.summary?.slice(0, 190) + "... "
                  : "No Synopsis available"}
                {/* <button className="read-more-button">read more</button> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
