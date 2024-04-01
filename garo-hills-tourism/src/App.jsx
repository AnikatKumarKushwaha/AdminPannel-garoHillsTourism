import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Attraction from "./pages/Attraction";
import AddAttraction from "./pages/AddAttraction";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import RestPlace from "./pages/RestPlace";
import AddRestPlace from "./pages/AddRestPlace";
import TourOperator from "./pages/TourOperator";
import AddTourOperator from "./pages/AddTourOperator";
import Login from "./pages/Auth-screen/Login";
import Signup from "./pages/Auth-screen/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUserData } from "./redux/slice/UserSlice";

function App() {
  const { data, isLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (!!localStorage.getItem("user")) {
      dispatch(addUserData(JSON.parse(localStorage.getItem("user"))));
    } else {
      console.log("no item in local storage");
    }
  }, [dispatch, localStorage.getItem("user")]);

  useEffect(() => {
    if (!isLoading && data != null) {
      setIsLogin(JSON.stringify(data) !== "{}");
    }
  }, [data, isLoading]);
  let routes;

  if (!isLogin) {
    routes = (
      <>
        <Route index element={<Navigate replace to="login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound />} />
      </>
    );
  } else {
    routes = (
      <>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="attraction" />} />
          <Route path="attraction" element={<Attraction />} />
          <Route path="add-attraction" element={<AddAttraction />} />
          <Route path="rest-place" element={<RestPlace />} />
          <Route path="add-rest-place" element={<AddRestPlace />} />
          <Route path="tour-operator" element={<TourOperator />} />
          <Route path="add-tour-operator" element={<AddTourOperator />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routes>{routes}</Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },

          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#f8fafc",
            color: "#334155",
          },
        }}
      />
    </>
  );
}

export default App;
