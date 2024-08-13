import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Header from "./Components/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Footer from "./Components/Footer";

function App() {
  const location = useLocation();
  const [showLoginInForm, setShowLoginInForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const showLogin = () => {
    setShowLoginInForm(true);
  };

  const closeLoginForm = () => {
    setShowLoginInForm(false);
  };

  const onClickRegister = () => {
    setShowLoginInForm(false);
    setShowRegisterForm(true);
  };

  const onClickLogin = () => {
    setShowLoginInForm(true);
    setShowRegisterForm(false);
  };

  const closeRegisterForm = () => {
    setShowRegisterForm(false);
  };

  return (
    <div className="h-screen max-h-screen pl-6 pr-6 pb-20">
      {showLoginInForm && (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-50">
          <Login
            closeLoginForm={closeLoginForm}
            onClickRegister={onClickRegister}
          />
        </div>
      )}
      {showRegisterForm && (
        <div className="fixed top-0 bottom-0 right-0 left-0 bg-slate-500 bg-opacity-50">
          <Register
            closeRegisterForm={closeRegisterForm}
            onClickLogin={onClickLogin}
          />
        </div>
      )}

      <div>
        <div className="pt-5 sticky top-0 bg-stone-100 -mx-10">
          <Header showLogin={showLogin} />
        </div>
        <div className="pb-10">
          <Outlet />
        </div>

        <ToastContainer position="top-right" />
        {location.pathname !== "/admin" && (
          <div>
            <Footer />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
