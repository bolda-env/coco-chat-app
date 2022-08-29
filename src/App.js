import React from "react";
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
  Navigate,
} from "react-router-dom";

/**********************/
/*    COMPONENTS      */
/**********************/
import SignUp from "./Compo/SignUp";
import LogIn from "./Compo/LogIn";
import Home from "./Compo/Home";
import useToken from "./Compo/useToken";

function App() {
  // const { token, setToken, userId, setUserId } = useToken();
  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/signup"
            element={!token ? <SignUp /> : <Home userId={token} />}
          />
          <Route
            path="/login"
            element={
              !token ? (
                <LogIn setToken={setToken} setUserId={setUserId} />
              ) : (
                <Navigate to={`/user/${userId}`} />
              )
            }
          />
          <Route path="/user/:id" element={!token ? <LogIn /> : <Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Switch>
      </Router>
    </>
  );
}

const PageNotFound = () => <h1>Page Not Found</h1>;
export default App;
