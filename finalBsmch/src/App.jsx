import React from 'react';
import AppRoutes from './comps_routes/appRoutes';
import CountryComp from './newApi/countryComp'
import SignUp from './connect/signUp';
// import SelectComponent from './newApi/selectComp';
// import HomePage from './routes/home';

import SignUpStudent from './connect/signUpStudent';
export default function App() {
  return (
    // <HomePage/>
    <React.Fragment>
      {/* <AppRoutes /> */}
      {/* <SignUpStudent/> */}
      {/* <CountryComp/> */}
      {/* <SelectComponent/> */}
      <SignUp />
    </React.Fragment>
  );
}