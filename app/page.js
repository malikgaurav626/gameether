"use client";
import "./globals.css";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setrouteLocation } from "./store";
import ReactLoading from "react-loading";

export default function Home() {
  const homepageRef = useRef();
  const homepageCanvasRef = useRef();
  const dotMatrix = useSelector((state) => state.dotMatrix);
  const auth_token = useSelector((state) => state.authToken);
  const dispatch = useDispatch();

  function handleEnterClick() {
    dispatch(setrouteLocation(1));
  }

  useEffect(() => {
    // Set the canvas dimensions
    const homepage = homepageRef.current;
    const canvas = homepageCanvasRef.current;
    const boundingRect = homepage.getBoundingClientRect();
    const canvasWidth = boundingRect.width;
    const canvasHeight = boundingRect.height;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const context = canvas.getContext("2d");

    drawDemNewDots(context, boundingRect);
    setTimeout(() => {
      const homepage = homepageRef.current;
      const canvas = homepageCanvasRef.current;
      const boundingRect = homepage.getBoundingClientRect();
      const canvasWidth = boundingRect.width;
      const canvasHeight = boundingRect.height;

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.background = "linear-gradient( to bottom, #d1c361, #49c4b7)";

      const context = canvas.getContext("2d");

      drawDemNewDots(context, boundingRect);
    }, 1100);
  }, [dotMatrix]);

  function drawDemNewDots(context, boundingRect) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.fillStyle = "black";
    const topLeft = { x: boundingRect.left, y: boundingRect.top };
    const bottomRight = {
      x: boundingRect.left + boundingRect.width,
      y: boundingRect.top + boundingRect.height,
    };

    const filteredMatrix = dotMatrix
      .map((row) =>
        row.filter((dot) => {
          if (
            dot.x > topLeft.x &&
            dot.y > topLeft.y &&
            dot.x < bottomRight.x &&
            dot.y < bottomRight.y
          ) {
            return true;
          }
          return false;
        })
      )
      .filter((row) => row.length > 0);

    for (let i = 0; i < filteredMatrix.length; i++) {
      for (let j = 0; j < filteredMatrix[i].length; j++) {
        context.beginPath();
        context.arc(
          filteredMatrix[i][j].x - topLeft.x,
          filteredMatrix[i][j].y - topLeft.y,
          1,
          0,
          Math.PI * 2
        );
        context.fill();
      }
    }
  }

  return (
    <>
      <div className="homepage row m-0 p-0">
        <div className="col-md-5 col-12 title-screen">
          <div className="d-block text-center title-container">
            <span className="welcome">Welcome</span> <br />{" "}
            <span className="to">to</span>
            <br />
            <ul className="game-container">
              <li>
                <span className="game">Game</span>
                <span className="ether">Ether</span>
              </li>
              <li>
                <span className="game">Game</span>
                <span className="ether">Ether</span>
              </li>
            </ul>
            <div className="title-subtitle">
              <span className="me-auto d-flex align-items-center">
                <span>check </span>
                <span className="d-flex align-items-center mt-3">
                  <ul className="it-out-container">
                    <li className="it-out-li">
                      <span className="it-out">it out</span>
                    </li>
                    <li className="it-out-li">
                      <span className="it-out">it out</span>
                    </li>
                  </ul>
                </span>
              </span>

              {auth_token.access_token ? (
                <button
                  className="light-glass-btn ms-auto"
                  onClick={handleEnterClick}
                >
                  Enter Now
                </button>
              ) : (
                <button className="light-glass-btn ms-auto">
                  <ReactLoading type={"balls"} color="black" width={"28px"} />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-7 col-12 justify-content-start d-none d-md-flex align-items-center">
          <div className="homepage-content position-relative" ref={homepageRef}>
            <canvas
              className="homepage-canvas position-absolute top-0 start-0"
              ref={homepageCanvasRef}
            ></canvas>
            <div>
              gameEther is an online game directory web app that you can use to
              browse through all games ever made, get{" "}
              <span className="orange">synopsis</span>, get current{" "}
              <span className="green">newsfeed</span>,{" "}
              <span className="orange"> track</span>,
              <span className="green"> discover</span> all your favourite games
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
