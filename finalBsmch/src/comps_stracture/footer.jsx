import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-dark text-white mt-3">
      <div className="container py-4">
        <section className="mb-4">
          {/* Social Media Icons */}
          <div className="d-flex justify-content-center">
            <a href="#!" className="btn btn-outline-light m-1" role="button">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#!" className="btn btn-outline-light m-1" role="button">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#!" className="btn btn-outline-light m-1" role="button">
              <i className="fab fa-google"></i>
            </a>
            <a href="#!" className="btn btn-outline-light m-1" role="button">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#!" className="btn btn-outline-light m-1" role="button">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#!" className="btn btn-outline-light m-1" role="button">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="mb-4">
          {/* Newsletter Subscription */}
          <form>
            <div className="row justify-content-center align-items-center">
              <div className="col-auto">
                <p className="pt-2">
                  <strong>Sign up for our newsletter</strong>
                </p>
              </div>
              <div className="col-md-5">
                <input type="email" className="form-control mb-4" placeholder="Email address" />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-outline-light mb-4">
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </section>

        <section className="mb-4">
          {/* Footer Description */}
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum repellat quaerat
            voluptatibus placeat nam, commodi optio pariatur est quia magnam eum harum corrupti dicta, aliquam
            sequi voluptate quas.
          </p>
        </section>

        {/* <section> */}
          {/* Links */}
          {/* <div className="row">
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase text-white">Links</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-white">
                    Link 1
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Link 2
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Link 3
                  </a>
                </li>
                <li>
                  <a href="#!" className="text-white">
                    Link 4
                  </a>
                </li>
              </ul>
            </div>

            {/* Add more columns as needed */}
          {/* </div>
        </section> */} 
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        {/* Copyright information */}
        © 2022 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/">
          Bootstrap.com
        </a>
      </div>
    </footer>
  );
}
