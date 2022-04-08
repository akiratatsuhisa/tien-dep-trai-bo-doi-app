import { useRoutes, Navigate } from "react-router-dom";
import { BaseLayout } from "./Components/BaseLayout";
import { useAuth } from "./Context/AuthContext";
import { About } from "./Views/About";
import { Forums } from "./Views/Forums";
import { Login } from "./Views/Login";
import { Profile } from "./Views/Profile";
import { Register } from "./Views/Register";
import { Game } from "./Game/Index";

function App() {
  const { isLoggedIn } = useAuth();

  const routing = useRoutes([
    {
      path: "/",
      element: <BaseLayout></BaseLayout>,
      children: [
        {
          path: "",
          element: <Forums></Forums>,
        },
        {
          path: "about",
          element: <About></About>,
        },
        {
          path: "register",
          element: <Register></Register>,
        },
        {
          path: "login",
          element: <Login></Login>,
        },
        {
          path: "profile",
          element: isLoggedIn ? (
            <Profile></Profile>
          ) : (
            <Navigate to="/login"></Navigate>
          ),
        },
      ],
    },
    {
      path: "/game",
      element: <Game></Game>,
    },
  ]);
  return routing;
}

export default App;
