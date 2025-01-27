import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Home from "./Pages/Home";
import VerifyEmail from "./Pages/VerifyEmail";
import VerifyMobile from "./Pages/VerifyMobile";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        //this is the default route and if the user is logged in it will show up or signup sir.
        element: <PrivateRoute />,
        children: [
          //here we will have components that we will show after signin
          {
            path: "/",
            element: <Home />,
          },
        ],
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/verifyEmail",
        element: <VerifyEmail />,
      },
      {
        path: "/verifyMobile",
        element: <VerifyMobile />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
