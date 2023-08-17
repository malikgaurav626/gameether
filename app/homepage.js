"use client";
import { setrouteLocation } from "./store";
import { useDispatch } from "react-redux";
export default function Homepage({ childrenstuff }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="surface">
        <div className="navbar navbar-expand-md">
          <button
            className="navbar-brand ms-4 mt-2 mb-2 light-glass-btn"
            onClick={() => dispatch(setrouteLocation(0))}
          >
            gameEther
          </button>
          <button
            className="d-md-none navbar-toggler d-inline me-4 toggler-icon light-glass-btn-light-border"
            aria-label="Toggle navigation"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapseId"
            aria-controls="navbarCollapseId"
            aria-expanded="false"
            aria-labelledby="Da toggle"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapseId">
            <div className="navbar-nav d-flex flex-row d-md-block justify-content-sm-between justify-content-center ms-auto">
              <button
                className="nav-item ms-4 mt-2 mb-2 light-glass-btn light-glass-btn-light-border me-btn"
                onClick={() =>
                  window.open("https://malikgaurav626.netlify.app/", "_blank")
                }
              >
                <span className="d-none d-sm-inline">Contact </span>
                <div className="d-inline-block">
                  <ul className="me-container d-flex flex-column">
                    <li>Us</li>
                    <li>Me</li>
                  </ul>
                </div>
              </button>

              <button
                className="nav-item ms-4 mt-2 mb-2 light-glass-btn light-glass-btn-light-border me-btn"
                onClick={() =>
                  window.open(
                    "https://github.com/malikgaurav626/gameether",
                    "_blank"
                  )
                }
              >
                <span className="d-none d-sm-inline">Source </span>
                <div className="d-inline-block">
                  <ul className="me-container d-flex flex-column">
                    <li>Code</li>
                    <li className="fw-bold">नियम</li>
                  </ul>
                </div>
              </button>
              <button
                className="nav-item ms-4 me-4 mt-2 mb-2 light-glass-btn light-glass-btn-light-border me-btn"
                onClick={() =>
                  window.open("https://github.com/malikgaurav626/", "_blank")
                }
              >
                <div className="d-inline-block">
                  <ul className="me-container d-flex flex-column">
                    <li>Other</li>
                    <li className="fw-bold">अन्य</li>
                  </ul>
                </div>{" "}
                <span className="d-none d-sm-inline">Projects </span>
              </button>
            </div>
          </div>
        </div>
        {childrenstuff}
      </div>
    </>
  );
}
