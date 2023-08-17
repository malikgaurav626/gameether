"use client";
import { useEffect, useState } from "react";
import { getGamingNews } from "./apicalls";
import ReactLoading from "react-loading";

export default function NewsBody({ setSelectedNews }) {
  const [query, setQuery] = useState("gaming");
  const [queryResponse, setQueryResponse] = useState([]);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const processData = async () => {
      try {
        const data = await getGamingNews(query, offset);
        setQueryResponse(data.data.value);
      } catch (e) {
        console.error(e);
      }
    };
    processData();
  }, [query]);

  useEffect(() => {
    const processData = async () => {
      try {
        const data = await getGamingNews(query, offset);
        setQueryResponse([...queryResponse, ...data.data.value]);
      } catch (e) {
        console.error(e);
      }
    };

    processData();
  }, [offset]);

  function handleShowMore() {
    setOffset(offset + 50);
  }
  return (
    <>
      {queryResponse.length === 0 ? (
        <div className="w-100 d-flex justify-content-center align-items-center">
          <ReactLoading type={"bars"} color="red" width={"40px"} />
        </div>
      ) : (
        <div className="news-container row m-0">
          {queryResponse?.map((res) => (
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 p-0">
              <div
                className="card m-1 news-card pb-0"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasNews"
                aria-controls="offcanvasNews"
                onClick={() => setSelectedNews(res)}
              >
                <div className="card-header">
                  <img
                    className="news-img"
                    src={
                      res?.image?.contentUrl
                        ? res?.image?.contentUrl
                        : "/tempo.png"
                    }
                  ></img>
                  <div className="news-keywords mt-2 mb-0">
                    {res?.about?.map((keyword) => (
                      <span className="news-keyword-element text-wrap badge border rounded-5">
                        {keyword.name}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="card-body news-card-body">
                  <div className="card-title news-headline">{res.name}</div>
                  <div className="news-date badge rounded-1 rounded-bottom-0 rounded-end-0">
                    {new Date(res.datePublished).toLocaleString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
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
