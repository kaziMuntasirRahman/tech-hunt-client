import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";
import Home from "../pages/shared/Home";
import ErrorPage from "../pages/shared/ErrorPage";
import About from "../pages/shared/About";
import Products from "../pages/shared/Products";
import Product from "../pages/private route/Product";
import DashboardContainer from "../pages/dashboard/DashboardContainer";
import MyProfile from "../pages/dashboard/user/MyProfile";
import AddProduct from "../pages/dashboard/user/AddProduct";
import MyProducts from "../pages/dashboard/user/MyProducts";
import UpdateProfile from "../pages/dashboard/user/UpdateProfile";
import ProductReview from "../pages/dashboard/moderator/ProductReview";
import ManageUser from "../pages/dashboard/admin/ManageUser";

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
        loader: ({ params }) => params.id
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardContainer />,
    children: [
      // users dashboard layout
      {
        path: '',
        element: <MyProfile />
      },
      {
        path: 'update-profile',
        element: <UpdateProfile />
      },
      {
        path: 'add-product',
        element: <AddProduct />
      },
      {
        path: 'my-products',
        element: <MyProducts />
      },
      // moderator only dashboard
      {
        path: 'product-review',
        element: <ProductReview />
      },
      // admin only dashboard
      {
        path: 'manage-user',
        element: <ManageUser/>
      }
    ]
  }
])


export default router;