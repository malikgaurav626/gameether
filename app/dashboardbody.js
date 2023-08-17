"use client";
import { useSelector } from "react-redux";
import "./globals.css";
import { getgames } from "./apicalls";
import { useEffect, useState } from "react";
// import Loading from "./loadingComp";
import ReactLoading from "react-loading";

export default function DashboardBody({
  setOffcanvasContent,

  imageSize,
}) {
  const [recommendedData, setRecommendedData] = useState([]);
  const [offset, setOffset] = useState(0);
  const auth_token = useSelector((state) => state.authToken);

  useEffect(() => {
    const processData = async () => {
      try {
        const data = await getgames(auth_token.access_token, offset);
        setRecommendedData(data.data);
      } catch (e) {
        console.error(e);
      }
    };

    processData();
  }, []);

  useEffect(() => {
    const processData = async () => {
      try {
        const data = await getgames(auth_token.access_token, offset);
        setRecommendedData([...recommendedData, ...data.data]);
      } catch (e) {
        console.error(e);
      }
    };

    processData();
  }, [offset]);

  function handleClick(ele) {
    setOffcanvasContent(ele);
  }
  function handleCarouselClick(e) {
    e.stopPropagation();
  }

  function handleShowMore() {
    setOffset(offset + 12);
  }

  return (
    <>
      {recommendedData.length === 0 ? (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <ReactLoading type={"bars"} color="red" width={"40px"} />
        </div>
      ) : (
        <div className="dashboard-body-container row m-0 p-0">
          {recommendedData?.map((ele, i) => (
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
                          className={
                            "carousel-item " + (j === 0 ? "active" : "")
                          }
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
          <div className="showmore-btn-container">
            <button className="showmore-btn" onClick={handleShowMore}>
              show more...
            </button>
          </div>
        </div>
      )}
    </>
  );
}
