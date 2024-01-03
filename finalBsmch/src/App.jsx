import React from 'react';
import AppRoutes from './comps_routes/appRoutes';
// import CountryComp from './api/countryComp'
import SignUp from './forms/signUp';
import SignUpStudent from './forms/SignUpStudent';
// import ChatContainer from './chat/components/chatContainer';
export default function App() {
  return (
    <React.Fragment>
      <AppRoutes />
      {/* <ChatContainer /> */}
      {/* <SignUpStudent/> */}
      {/* <CountryComp/> */}
      {/* <SelectComponent/> */}
      {/* <SignUp /> */}
    </React.Fragment>
  );
}