import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import VehicleDetails from "./pages/VehicleDetails/VehicleDetails";

const HomePage = lazy(() => import("./pages/Home/Home"));
const CatalogPage = lazy(() => import("./pages/Catalog/Catalog"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<VehicleDetails />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
