import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

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
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
