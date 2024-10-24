import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";

const HomePage = lazy(() => import("./pages/Home/Home"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
