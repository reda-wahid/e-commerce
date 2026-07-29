import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Main from "./LayOut/Main/index";
import Home from "./Pages/Home/index";
import About from "./Pages/About/index";
import ProductDetails from "./Pages/ProductDetails/index";
import Cart from "./Pages/Cart/index";
import Favorts from "./Pages/Favorites";
import Categourys from "./Pages/Category";
import { CartContext } from "./context/CartContext";
import ContextProduct from "./context/Context";
import Search from "./Pages/Search/Search";
import Contact from "./Pages/Contact/Contact";
import LogIn from "./LayOut/Auth/LogIn";
import Register from "./LayOut/Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "favorts", element: <Favorts /> },
      { path: "categourys/:cat", element: <Categourys /> },
      { path: "search", element: <Search /> },
    ],
  },
  {
    path: "auth",
    children:[
      {path:"login", element:<LogIn />},
      {path:"register", element:<Register />}
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProduct>
      <RouterProvider router={router} />
    </ContextProduct>
  </StrictMode>,
);
