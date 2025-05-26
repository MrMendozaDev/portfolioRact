import { Routes, Route } from "react-router-dom";
import FaceDetection from "Components/Body/Pages/FaceDetection/FaceDetection";
import Home from "Components/Body/Home";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/face-detection" element={<FaceDetection msg="Route" />} />
    </Routes>
  );
};

export default AppRoutes;
