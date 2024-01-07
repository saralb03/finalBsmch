import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { AppContext } from '../context/context'
import SignUp from '../forms/signUp';
import LogIn from "../forms/login";
import ForgotPassword from "../forms/forgotPassword";
import ProjectProposal from "../forms/projectProposal";
import CreatorProjectProposel from "../forms/creatorProjectProposel";
import CreatorProList from "../forms/creatorProList";
import StudentProList from "../forms/studentProList";
import StudentInfo from '../forms/studentInfo';


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
                            <Link to="/projectProposal" className="text-light text-decoration-none mx-3">Project Proposal</Link>
                            <Link to="/creatorProjectProposel" className="text-light text-decoration-none mx-3">Creator Project Proposal</Link>
                            <Link to="/creatorProList" className="text-light text-decoration-none mx-3">Creator Project List</Link>
                            <Link to="/studentProList" className="text-light text-decoration-none mx-3">Student Project List</Link>
                        </div>
                        <div>
                            <Link to="/signup" className="text-light text-decoration-none mx-3">Sign Up</Link>
                            <Link to="/login" className="text-light text-decoration-none mx-3">Log In</Link>
                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn/>} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/projectProposal" element={<ProjectProposal />} />   
                    <Route path="/creatorProjectProposel" element={<CreatorProjectProposel/>} />   
                    <Route path="/creatorProList" element={<CreatorProList/>} />       
                    <Route path="/studentProList" element={<StudentProList/>} />    
                    <Route path="/studentInfo/:id" component={<StudentInfo/>} />  
                </Routes>
            </AppContext.Provider>
        </BrowserRouter>
    )
}