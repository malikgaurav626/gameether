"use client";
import "bootstrap/dist/css/bootstrap.css";

import { useEffect, useRef } from "react";
import "./globals.css";
import KUTE from "kute.js";
import store from "./store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import Homepage from "./homepage";
import Dashboard from "./dashboard";
import { getAuthToken } from "./apicalls";
import { setDotMatrix } from "./store";

export default function RootLayout({ children }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  });

  return (
    <Provider store={store}>
      <html lang="en">
        <body className="body-class">
          <MainBody>
            <Base>{children}</Base>
          </MainBody>
          {/* <div className="row d-none d-md-flex m-0 p-0 background-container orange">
            <div className="col-12 col-md-6 d-none d-md-block"></div>
            <div className="col-12 col-md-6">
              <OrangeSVG />
            </div>
          </div> */}
          {/* <div className="row d-none d-md-flex m-0 p-0 background-container green">
            <div className="col-12 col-md-6 d-none d-md-block"></div>
            <div className="col-12 col-md-6">
              <GreenSVG />
            </div>
          </div> */}
          {/* <div className="row m-0 p-0 background-container violet">
            <div className="col-12 col-md-6">
              <VioletSVG />
            </div>
            <div className="col-12 col-md-6 d-none d-md-block"></div>
          </div> */}
        </body>
      </html>
    </Provider>
  );
}

function MainBody({ children }) {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background =
      "linear-gradient(0deg, rgba(34,193,195,0.7337436195181197) 0%, rgba(253,187,45,0.663715608313638) 100%)";
    const context = canvas.getContext("2d");

    drawDemDots(context);

    // Set up the resize event handler using an anonymous function
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawDemDots(context);
    };

    // Attach the resize event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function drawDemDots(context) {
    context.fillStyle = "black";
    const matrix = [];
    let k = 0;
    for (let i = 10; i < context.canvas.width; i += 60) {
      let l = 0;
      matrix[k] = [];
      for (let j = 10; j < context.canvas.height; j += 60) {
        context.beginPath();
        context.arc(i, j, 1, 0, Math.PI * 2);
        context.fill();
        matrix[k][l] = { x: i, y: j };
        l++;
      }
      k++;
    }
    dispatch(setDotMatrix(matrix));
  }

  return (
    <>
      <canvas ref={canvasRef} className="canvas-class"></canvas>
      {children}
    </>
  );
}

function Base({ children }) {
  const routeLocation = useSelector((state) => state.routeLocation);
  const dispatch = useDispatch();

  useEffect(() => {
    getAuthToken(dispatch);
  }, []);

  return (
    <>
      {routeLocation == 0 ? (
        <Homepage childrenstuff={children} />
      ) : (
        <Dashboard childrenstuff={children} />
      )}
    </>
  );
}

function VioletSVG(props) {
  useEffect(() => {
    const startPath =
      "M202.5-165.5C264.2-84 317.3.3 298.4 62.1 279.5 123.9 188.6 163.3 106 192.5c-82.6 29.1-156.8 48.1-212.5 23.3-55.8-24.8-93.1-93.3-130.9-183.3-37.8-90-76.1-201.5-36.6-277.9 39.5-76.3 156.7-117.5 250.5-98.8 93.9 18.8 164.2 97.3 226 178.7"; // Starting path data
    const midPath =
      "M152.2 -149.4C203 -101.4 254 -50.7 272.9 18.9C291.7 88.4 278.4 176.8 227.6 218.6C176.8 260.4 88.4 255.7 22.1 233.6C-44.2 211.5 -88.4 172.1 -142.1 130.2C-195.7 88.4 -258.9 44.2 -268.1 -9.3C-277.4 -62.7 -232.7 -125.4 -179.1 -173.4C-125.4 -221.4 -62.7 -254.7 -6 -248.7C50.7 -242.7 101.4 -197.4 152.2 -149.4";
    const endPath =
      "M183.8 -189.3C240.8 -126.8 291.4 -63.4 284.7 -6.7C278 50 213.9 99.9 156.9 147.8C99.9 195.6 50 241.3 -2.2 243.5C-54.4 245.8 -108.9 204.6 -148.9 156.7C-188.9 108.9 -214.4 54.4 -209.3 5.1C-204.2 -44.2 -168.4 -88.4 -128.4 -150.9C-88.4 -213.4 -44.2 -294.2 9.6 -303.8C63.4 -313.4 126.8 -251.8 183.8 -189.3"; // Ending path data

    const pathElement = document.querySelector("#firstviolet path");
    const morphAnimation = KUTE.fromTo(
      pathElement,
      { path: startPath },
      { path: endPath },
      {
        duration: 20000,
        easing: "easingCubicInOut",
        yoyo: true,
        repeat: true,
      }
    );
    morphAnimation.start();
  }, []);

  return (
    <svg
      className="background-svg violet-svg"
      viewBox="0 0 900 600"
      width={900}
      height={600}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="firstviolet" transform="translate(444.19 360.71)">
        <path
          d="M202.5-165.5C264.2-84 317.3.3 298.4 62.1 279.5 123.9 188.6 163.3 106 192.5c-82.6 29.1-156.8 48.1-212.5 23.3-55.8-24.8-93.1-93.3-130.9-183.3-37.8-90-76.1-201.5-36.6-277.9 39.5-76.3 156.7-117.5 250.5-98.8 93.9 18.8 164.2 97.3 226 178.7"
          fill="#715DF2"
        />
      </g>
    </svg>
  );
}

function OrangeSVG(props) {
  useEffect(() => {
    const startPath =
      "M92.9-161.4c29.6 17.5 57.1 38.2 78.8 65.6 21.7 27.5 37.5 61.6 34.9 94.3-2.6 32.7-23.6 63.8-47.1 88.2-23.4 24.4-49.3 41.9-76.3 55.7-26.9 13.7-55.1 23.7-86.7 29.7-31.7 6.1-66.8 8.4-96.4-3.9-29.6-12.2-53.6-39-69.4-69.4-15.7-30.5-23.2-64.6-21.3-97.7C-188.8-32-177.5-64-161-93.2c16.5-29.1 38.2-55.4 66-74.1C-67.3-186-33.7-197-1-195.2c32.7 1.7 64.3 16.2 93.9 33.8"; // Starting path data
    const endPath =
      "M109.4 -127.9C134.4 -84.4 142.2 -42.2 154.5 12.3C166.7 66.7 183.4 133.4 158.4 178.9C133.4 224.4 66.7 248.7 -0.9 249.6C-68.6 250.6 -137.2 228.2 -187.2 182.7C-237.2 137.2 -268.6 68.6 -257.6 11C-246.7 -46.7 -193.3 -93.3 -143.3 -136.8C-93.3 -180.3 -46.7 -220.7 -2.2 -218.4C42.2 -216.2 84.4 -171.4 109.4 -127.9"; // Ending path data

    const pathElement = document.querySelector("#orangePathId");
    const morphAnimation = KUTE.fromTo(
      pathElement,
      { path: startPath },
      { path: endPath },
      {
        duration: 10000,
        easing: "easingCubicInOut",
        yoyo: true,
        repeat: true,
      }
    );
    morphAnimation.start();
  }, []);
  return (
    <svg
      className="morphing-orange background-svg"
      id="orangesvg"
      viewBox="0 0 900 600"
      width={900}
      height={600}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path fill="rgba(255,255,255,0)" d="M0 0H900V600H0z" />
      <path
        id="orangePathId"
        d="M92.9-161.4c29.6 17.5 57.1 38.2 78.8 65.6 21.7 27.5 37.5 61.6 34.9 94.3-2.6 32.7-23.6 63.8-47.1 88.2-23.4 24.4-49.3 41.9-76.3 55.7-26.9 13.7-55.1 23.7-86.7 29.7-31.7 6.1-66.8 8.4-96.4-3.9-29.6-12.2-53.6-39-69.4-69.4-15.7-30.5-23.2-64.6-21.3-97.7C-188.8-32-177.5-64-161-93.2c16.5-29.1 38.2-55.4 66-74.1C-67.3-186-33.7-197-1-195.2c32.7 1.7 64.3 16.2 93.9 33.8"
        fill="#FF6F61"
        transform="translate(442.005 309.164)"
      />
    </svg>
  );
}

function GreenSVG(props) {
  useEffect(() => {
    const startPath =
      "M209.2-209.7c48.5 49 65.2 129.3 67.9 212.4 2.7 83.1-8.5 168.9-57 217.4s-134.3 59.7-221.4 61c-87.1 1.3-175.5-7.3-235.1-55.8-59.7-48.5-90.7-136.9-68.6-203.2 22.1-66.3 97.3-110.5 156.9-159.5 59.7-49 103.9-102.8 166.2-120.9 62.3-18.1 142.6-.4 191.1 48.6"; // Starting path data
    const endPath =
      "M220.5 -221.2C281.7 -159.3 324.3 -79.7 306.6 -17.7C288.9 44.2 210.7 88.4 149.6 131.6C88.4 174.7 44.2 216.9 -16.1 232.9C-76.4 249 -152.7 239.1 -211.2 195.9C-269.7 152.7 -310.4 76.4 -316.4 -6C-322.4 -88.4 -293.8 -176.8 -235.3 -238.6C-176.8 -300.4 -88.4 -335.7 -4.4 -331.4C79.7 -327 159.3 -283 220.5 -221.2"; // Ending path data

    const pathElement = document.querySelector("#greenPathId");
    const morphAnimation = KUTE.fromTo(
      pathElement,
      { path: startPath },
      { path: endPath },
      {
        duration: 30000,
        easing: "easingCubicInOut",
        yoyo: true,
        repeat: true,
      }
    );
    morphAnimation.start();
  }, []);
  return (
    <svg
      className="morphing-demo background-svg"
      viewBox="0 0 900 600"
      width={900}
      height={600}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        id="greenPathId"
        d="M209.2-209.7c48.5 49 65.2 129.3 67.9 212.4 2.7 83.1-8.5 168.9-57 217.4s-134.3 59.7-221.4 61c-87.1 1.3-175.5-7.3-235.1-55.8-59.7-48.5-90.7-136.9-68.6-203.2 22.1-66.3 97.3-110.5 156.9-159.5 59.7-49 103.9-102.8 166.2-120.9 62.3-18.1 142.6-.4 191.1 48.6"
        fill="#0dc652"
        transform="translate(467.33 292.009)"
      />
    </svg>
  );
}
