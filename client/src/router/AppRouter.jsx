import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Home from "../pages/dashboard/Home";
import Profile from "../pages/dashboard/Profile";
import NotFound from "../pages/NotFound";
import PrivateRoute from "../components/common/PrivateRoute";
import TasteQuiz from "../pages/tastes/TasteQuiz";
import Explore from "../pages/dashboard/Explore";
import DishManagement from "../pages/admin/DishManagement";
import EditDish from "../pages/admin/EditDish";
import AddDish from "../pages/admin/AddDish";
import MapView from "../pages/dashboard/MapView";
import RecipePage from "../pages/dashboard/RecipePage";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/taste"
          element={
            <PrivateRoute>
              <TasteQuiz />
            </PrivateRoute>
          }
        />

        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <Explore />
            </PrivateRoute>
          }
        />

        <Route
          path="/recipe/:dishName"
          element={
            <PrivateRoute>
              <RecipePage />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/dishes"
          element={
            <PrivateRoute adminOnly>
              <DishManagement />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/dishes/:id"
          element={
            <PrivateRoute adminOnly>
              <EditDish />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/dishes/new"
          element={
            <PrivateRoute adminOnly>
              <AddDish />
            </PrivateRoute>
          }
        />

        <Route
          path="/map"
          element={
            <PrivateRoute>
              <MapView />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
