import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/shared/Home";
import ErrorPage from "../pages/shared/ErrorPage";
import Product from "../pages/general user/Product";

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
        path: '/products/:id',
        element: <Product />,
        loader:  ({params}) => params.id
      }
    ]
  }
])


export default router;