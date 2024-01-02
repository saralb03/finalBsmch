import React from 'react';
import AppRoutes from './comps_routes/appRoutes';
import CountryComp from './newApi/countryComp'
import SignUp from './forms/signUp';
import SignUpStudent from './forms/SignUpStudent';

export default function App() {
  return (
    // <HomePage/>
    <React.Fragment>
      <AppRoutes />
      {/* <SignUpStudent/> */}
      {/* <CountryComp/> */}
      {/* <SelectComponent/> */}
      {/* <SignUp /> */}
    </React.Fragment>
  );
}