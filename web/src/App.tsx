import "./index.css";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import LinearRegression from "./pages/LinearRegression";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/linear-regression" element={<LinearRegression />} />
      </Routes>
    </>
  );
};

export default App;
