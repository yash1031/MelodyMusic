import "./App.css";
import Home from "./Components/Pages/Home/Home";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import SignUp from "./Components/Pages/UserAuthorization/SignUp/SignUp";
import EnterMobile from "./Components/Pages/UserAuthorization/SignUp/MobileSignUp/EnterMobile";
import EnterOTP from "./Components/Pages/UserAuthorization/SignUp/MobileSignUp/EnterOTP";
import LogIn from "./Components/Pages/UserAuthorization/LogIn/LogIn";
import ForgotPassword from "./Components/Pages/UserAuthorization/ForgotPassword/ForgotPassword";
import SearchAll from "./Components/MainScreen/SearchAll/SearchAll";
import ExplorePremium from "./Components/MainScreen/ExplorePremium/ExplorePremium";
import InstallApp from "./Components/MainScreen/InstallApp/InstallApp";
import WhatsNew from "./Components/MainScreen/WhatsNew/WhatsNew";
import AllContent from "./Components/MainScreen/AllContent/AllContent";
import GoogleAuth from "./Components/Pages/UserAuthorization/SignUp/SignUpWithGoogle/GoogleAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
    children: [
      {
        path: "/",
        element: <AllContent/>,
      },
      {
        path: "search",
        element: <SearchAll/>,
      },
      {
        path: "premium",
        element: <ExplorePremium/>,
      },
      {
        path: "download",
        element: <InstallApp />,
      },
      {
        path: "content-feed",
        element: <WhatsNew/>,
      },
    ],
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
  },
  {
    path: "/log-in",
    element: <LogIn/>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword/>,
  },
  {
    path: "/enter-mobile",
    element: <EnterMobile/>,
  },
  {
    path: "/enter-otp",
    element: <EnterOTP/>,
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <SignUp></SignUp> */}
      {/* <EnterMobile></EnterMobile> */}
      {/* <EnterOTP></EnterOTP> */}
      {/* <LogIn></LogIn> */}
      {/* <ForgotPassword></ForgotPassword> */}
    </>
  );
}

export default App;
