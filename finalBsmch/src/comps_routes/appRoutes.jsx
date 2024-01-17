import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom"
import { AppContext } from '../context/context'
import SignUp from '../forms/signUp';
import LogIn from "../forms/login";
import ForgotPassword from "../forms/forgotPassword";
import ProjectProposal from "../forms/projectProposal";
import CreatorProjectProposel from "../forms/creatorProjectProposel";
import CreatorProList from "../forms/creatorProList";
import StudentProList from "../forms/studentProList";
import StudentInfo from "../forms/studentInfo";
import CreatorInfo from "../forms/creatorInfo";
import StudentProjectProposal from "../forms/studentProjectProposel";
import CreatorProjectProposal from "../forms/creatorProjectProposel";
import logo from '../img/logo.png';
import HomeComp from "../comps_stracture/homeComp";
import Footer from "../comps_stracture/footer";
import StudentProjectInfo from "../forms/studentProjectInfo";
import CreatorProjectInfo from "../forms/creatorProjectInfo";


export default function AppRoutes() {
  //  const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
   //     navigate('/homeComp');
    };

    const [countriesAr, setCountriesAr] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(" ");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    }, [isLoggedIn]);

    return (
        <BrowserRouter>
            <AppContext.Provider value={{
                isLoggedIn,setIsLoggedIn
            }}>
                <header className="p-2 container-fluid bg-dark text-light fixed-top w-100">
                    <div className="container d-flex justify-content-between align-items-center">
                        <div>
                            <Link to="/" className="text-light text-decoration-none">
                                <img src={logo} alt="Logo" height="40" />
                            </Link>
                            {isLoggedIn && (
                                <>
                                    <NavLink to="/projectProposal" className="text-light text-decoration-none mx-3" activeClassName="active">
                                        Project Proposal
                                    </NavLink>
                                    <NavLink to="/creatorProList" className="text-light text-decoration-none mx-3" activeClassName="active">
                                        Creator Project List
                                    </NavLink>
                                    <NavLink to="/studentProList" className="text-light text-decoration-none mx-3" activeClassName="active">
                                        Student Project List
                                    </NavLink>
                                </>
                            )}
                        </div>
                        <div>
                            <NavLink to="/signup" className="text-light text-decoration-none mx-3" activeClassName="active">Sign Up</NavLink>
                            <NavLink to="/login" className="text-light text-decoration-none mx-3" activeClassName="active">Log In</NavLink>
                            <button onClick={handleLogout} style={{ backgroundColor: 'black', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Log Out</button>

                        </div>
                    </div>
                </header>

                <Routes>
                    <Route path="/" element={<HomeComp />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/forgotpassword" element={<ForgotPassword />} />
                    <Route path="/projectProposal" element={<ProjectProposal />} />
                    <Route path="/creatorProjectProposel" element={<CreatorProjectProposel />} />
                    <Route path="/creatorProList" element={<CreatorProList />} />
                    <Route path="/studentProList" element={<StudentProList />} />
                    <Route path="/studentInfo" element={<StudentInfo />} />
                    <Route path="/creatorInfo" element={<CreatorInfo />} />
                    <Route path="/studentProjectProposel" element={<StudentProjectProposal />} />
                    <Route path="/creatorProjectProposel" element={<CreatorProjectProposal />} />
                    <Route path="/forgotPassword" element={<ForgotPassword />} />
                    <Route path="/studentProjectInfo" element={<StudentProjectInfo />} />
                    <Route path="/creatorProjectInfo" element={<CreatorProjectInfo />} />
                    <Route path="/homeComp" element={<HomeComp/>} />
                </Routes>
                <Footer />
            </AppContext.Provider>
        </BrowserRouter>
    )
}