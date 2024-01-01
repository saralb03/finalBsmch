import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from '../context/context'
import SignUp from '../connect/signUp';
import SignIn from "../connect/signIn";
import ForgotPassword from "../connect/forgotPassword";
// import SignUpStudent from "../connect/signUpStudent";
import Home from '../routes/home';

export default function AppRoutes() {
    const [countriesAr, setCountriesAr] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(" ");

    useEffect(() => {
        console.log(`Email changed: ${countriesAr}`);
    }, [countriesAr]);

    return (
        <BrowserRouter>
            <AppContext.Provider value={{
                countriesAr, setCountriesAr,
                selectedCountry, setSelectedCountry,
            }}>
                <header className="p-2 container-fluid bg-dark text-light fixed-top w-100">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div>
                            <h2 className="m-0">My app</h2>
                            <Link to="/home" className="text-light text-decoration-none mx-3">Home</Link>
                        </div>
                        <div>
                            <Link to="/signup" className="text-light text-decoration-none mx-3">Sign Up</Link>
                            <Link to="/signin" className="text-light text-decoration-none mx-3">Sign In</Link>
                            {/* <Link to="/forgotpassword" className="text-light text-decoration-none mx-3">Forgot Password</Link> */}
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path="/home" element={<Home/>} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    {/* <Route path="/signupstudent" element={<SignUpStudent/>} />         */}
                </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    )
}