import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/shared/Home";
import ErrorPage from "../pages/shared/ErrorPage";
import Product from "../pages/general user/Product";
import About from "../pages/shared/About";
import Products from "../pages/shared/Products";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/products',
        element: <Products />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/products/:id',
        element: <Product />,
        loader:  ({params}) => params.id
      }
    ]
  }
])


export default router;