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
import Statistics from "../pages/dashboard/admin/Statistics";
import ManageCoupon from "../pages/dashboard/admin/ManageCoupon";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import ManageReports from "../pages/dashboard/moderator/ManageReports";
import Payment from "../pages/dashboard/user/Payment";
import ManagePayment from "../pages/dashboard/admin/ManagePayment";

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
    element: <PrivateRoute><DashboardContainer /></PrivateRoute>,
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
      {
        path: 'payment',
        element: <Payment />
      },
      // moderator only dashboard
      {
        path: 'product-review',
        element: <ModeratorRoute><ProductReview /></ModeratorRoute>
      },
      {
        path: 'manage-reports',
        element: <ModeratorRoute><ManageReports /></ModeratorRoute>
      },
      // admin only dashboard
      {
        path: 'statistics',
        element: <AdminRoute><Statistics /></AdminRoute>
      },
      {
        path: 'manage-user',
        element: <AdminRoute><ManageUser /></AdminRoute>
      },
      {
        path: 'manage-payments',
        element: <AdminRoute><ManagePayment /></AdminRoute>
      },
      {
        path: 'manage-coupons',
        element: <AdminRoute><ManageCoupon /></AdminRoute>
      }
    ]
  }
])


export default router;