import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import Profil from "../pages/profil";
import UpdatePage from "../pages/update";
import Index from "../pages/index";
import Sessions from "../pages/sessions";
import UpdateSession from "../pages/updateSession";
import CreateSession from "../pages/createSession";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import PrivateRoute from "../components/privateRoute";

const RoutesComponent = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/sessions/"
          element={
            <PrivateRoute>
              <Sessions />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-session"
          element={
            <PrivateRoute>
              <CreateSession />
            </PrivateRoute>
          }
        />
        <Route
          path="/update-session/:id"
          element={
            <PrivateRoute>
              <UpdateSession />
            </PrivateRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <Profil />
            </PrivateRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <PrivateRoute>
              <UpdatePage />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default RoutesComponent;
