import { Route, Routes } from "react-router";
import Home from "../Components/Home/Home";
import { Helmet } from "react-helmet-async";
import UserRegistrationForm from "../Components/UserRegistrationForm/UserRegistrationForm";
import FoodDetails from "../Components/FoodDetails/FoodDetails";
import AllFoodItems from "../Components/AllFoodItems/AllFoodItems";
import Gallery from "../Components/Gallery/Gallery";
import Login from "../Components/Login/Login";
import AddFood from "../Components/AddFood/AddFood";
import PrivateRoute from "./PrivateRoute";
import UserAddedFoods from "../Components/UserAddedFoods/UserAddedFoods";
import UpdateFood from "../Components/UpdateFood/UpdateFood";
import MyOrders from "../Components/MyOrders/MyOrders";
import RecoverPassword from "../Components/RecoverPassword/RecoverPassword";
import FoodPurchase from "../Components/FoodPurchase/FoodPurchase";
import NotFound from "../Components/NotFound/NotFound";
import BookTable from "../Components/BookTable/BookTable";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        index
        element={
          <>
            <Helmet>
              <title>Home | Food Zone</title>
            </Helmet>
            <Home />
          </>
        }
      />

      <Route
        path="/food/:id"
        element={
          <>
            <Helmet>
              <title>Item Details | Food Zone</title>
            </Helmet>
            <FoodDetails />
          </>
        }
      />
      <Route
        path="/all-foods"
        element={
          <>
            <Helmet>
              <title>All Foods | Food Zone</title>
            </Helmet>
            <AllFoodItems />
          </>
        }
      />
      <Route
        path="/gallery"
        element={
          <>
            <Helmet>
              <title>Gallery | Food Zone</title>
            </Helmet>
            <Gallery />
          </>
        }
      />
      <Route
        path="/login"
        element={
          <>
            <Helmet>
              <title>Login | Food Zone</title>
            </Helmet>
            <Login />
          </>
        }
      />
      <Route
        path="/registration"
        element={
          <>
            <Helmet>
              <title>Register an Account | Food Zone</title>
            </Helmet>
            <UserRegistrationForm />
          </>
        }
      />
      <Route
        path="/add-food"
        element={
          <PrivateRoute>
            <Helmet>
              <title>Add an Food Item | Food Zone</title>
            </Helmet>
            <AddFood />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-foods"
        element={
          <PrivateRoute>
            <Helmet>
              <title>My Food Items | Food Zone</title>
            </Helmet>
            <UserAddedFoods />
          </PrivateRoute>
        }
      />
      <Route
        path="/update-food/:id"
        element={
          <PrivateRoute>
            <Helmet>
              <title>Update Food Item | Food Zone</title>
            </Helmet>
            <UpdateFood />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-orders"
        element={
          <PrivateRoute>
            <Helmet>
              <title>My Orders | Food Zone</title>
            </Helmet>
            <MyOrders />
          </PrivateRoute>
        }
      />

      <Route
        path="/recover-password"
        element={
          <>
            <Helmet>
              <title>Recover Password | Food Zone</title>
            </Helmet>
            <RecoverPassword />
          </>
        }
      />

      <Route
        path="/purchase-food/:id"
        element={
          <PrivateRoute>
            <Helmet>
              <title>Purchase Food | Food Zone</title>
            </Helmet>
            <FoodPurchase />
          </PrivateRoute>
        }
      />

      <Route
        path="/book-table"
        element={
          <PrivateRoute>
            <Helmet>
              <title>Book a Table | Food Zone</title>
            </Helmet>
            <BookTable />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
