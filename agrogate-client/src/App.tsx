import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authentication from "./components/pages/auths/auths";
import ProtectedRoute from "./UtilityComponent/ProtectedRoute";

import SharedPost from "./components/pages/share";
import Home from "./components/pages/home";
import Profile from "./components/pages/profile";
import WeatherSoil from "./components/pages/weatherSoil";
import Diagnosis from "./components/pages/diagnosis";
import MarketCommunity from "./components/pages/marketCommunity";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <SharedPost />,
  },
  {
    path: "/signup",
    element: <Authentication />,
  },
  {
    path: "/signin",
    element: <Authentication />,
  },
  {
    path: "/diagnosis",
    element: (
      <ProtectedRoute>
        <Diagnosis />
      </ProtectedRoute>
    ),
  },
  {
    path: "/weathersoil",
    element: (
      <ProtectedRoute>
        <WeatherSoil />
      </ProtectedRoute>
    ),
  },
  {
    path: "/marketcommunity",
    element: (
      <ProtectedRoute>
        <MarketCommunity />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
