// HomeComp.jsx

import React, { useState, useEffect } from "react";
import logo from "../img/logo.png";
import carouselImage1 from "../img/carousel1.jpg";
import carouselImage2 from "../img/carousel2.jpg";
import carouselImage3 from "../img/carousel3.jpg";
import AnimatedCounter from "./AnimatedCounter.jsx";

const HomeComp = () => {


//   return (
//     <div className="container mt-5">
//       <div className="row">
//         {/* Sidebar */}
//         <div className="col-md-4">
//           <div className="card bg-dark text-light p-3">
//             <img
//               src={logo}
//               alt="Logo"
//               className="mb-3"
//               style={{ width: "100%" }}
//             />
//             <p>
//               Welcome to our project description. Lorem ipsum dolor sit amet,
//               consectetur adipiscing elit. Nulla eget efficitur odio. Integer
//               efficitur malesuada arcu, in faucibus arcu fringilla non.
//             </p>
//             {/* Add a link to the project list or any other relevant page */}
//             <a href="/projectList" className="btn btn-light">
//               View Projects
//             </a>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="col-md-8">
//           {/* Picture Carousel */}
//           <div
//             id="carouselExample"
//             className="carousel slide"
//             data-ride="carousel"
//           >
//             <div className="carousel-inner">
//               <div className="carousel-item active">
//                 <img
//                   src={carouselImage1}
//                   className="d-block w-100"
//                   alt="Carousel 1"
//                 />
//               </div>
//               <div className="carousel-item">
//                 <img
//                   src={carouselImage2}
//                   className="d-block w-100"
//                   alt="Carousel 2"
//                 />
//               </div>
//               <div className="carousel-item">
//                 <img
//                   src={carouselImage3}
//                   className="d-block w-100"
//                   alt="Carousel 3"
//                 />
//               </div>
//             </div>
//             <a
//               className="carousel-control-prev"
//               href="#carouselExample"
//               role="button"
//               data-slide="prev"
//             >
//               <span
//                 className="carousel-control-prev-icon"
//                 aria-hidden="true"
//               ></span>
//               <span className="sr-only">Previous</span>
//             </a>
//             <a
//               className="carousel-control-next"
//               href="#carouselExample"
//               role="button"
//               data-slide="next"
//             >
//               <span
//                 className="carousel-control-next-icon"
//                 aria-hidden="true"
//               ></span>
//               <span className="sr-only">Next</span>
//             </a>
//           </div>
//         </div>

//         {/* Number of Creators Cards */}
//         <div className="row mt-4">
//           <div className="col-md-4 d-flex align-items-center justify-content-center">
//             <div className="card bg-dark text-white">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Creators Work With Us</h5>
//                 <AnimatedCounter value={56} />
//               </div>
//             </div>
//           </div>

//           {/* Add two more cards with different values */}
//           <div className="col-md-4 d-flex align-items-center justify-content-center">
//             <div className="card bg-dark text-white">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Talented Students We Have</h5>
//                 <AnimatedCounter value={123} />
//               </div>
//             </div>
//           </div>

//           <div className="col-md-4 d-flex align-items-center justify-content-center">
//             <div className="card bg-dark text-white">
//               <div className="card-body text-center">
//                 <h5 className="card-title">Skilles Where Sync</h5>
//                 <AnimatedCounter value={39} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
return (
    <div className="container mt-5">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-4">
          <div className="card bg-dark text-light p-3">
            <img
              src={logo}
              alt="Logo"
              className="mb-3"
              style={{ width: "100%" }}
            />
            <p>
              Welcome to our project description. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nulla eget efficitur odio. Integer
              efficitur malesuada arcu, in faucibus arcu fringilla non.
            </p>
            {/* Add a link to the project list or any other relevant page */}
            <a href="/projectList" className="btn btn-light">
              View Projects
            </a>
          </div>
        </div>
  
        {/* Content */}
        <div className="col-md-8">
          {/* Picture Carousel */}
          <div
            id="carouselExample"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={carouselImage1}
                  className="d-block w-100"
                  alt="Carousel 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carouselImage2}
                  className="d-block w-100"
                  alt="Carousel 2"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carouselImage3}
                  className="d-block w-100"
                  alt="Carousel 3"
                />
              </div>
            </div>
            <a
              className="carousel-control-prev"
              href="#carouselExample"
              role="button"
              data-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExample"
              role="button"
              data-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="sr-only">Next</span>
            </a>
          </div>
        </div>
      </div>
  
      {/* Number of Creators Cards */}
      <div className="row mt-4">
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <div className="card bg-dark text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Creators Work With Us</h5>
              <AnimatedCounter value={56} />
            </div>
          </div>
        </div>
  
        {/* Add two more cards with different values */}
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <div className="card bg-dark text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Talented Students We Have</h5>
              <AnimatedCounter value={123} />
            </div>
          </div>
        </div>
  
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <div className="card bg-dark text-white">
            <div className="card-body text-center">
              <h5 className="card-title">Skills Where Sync</h5>
              <AnimatedCounter value={39} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default HomeComp;
