import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense } from "react";
import { Loader } from "semantic-ui-react";
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyle from './GlobalStyles';

const Home = lazy(() => import("./pages/Home.js"));
const Coinflip = lazy(() => import("./pages/Coinflip.js"));



function App() {
  return (
    <Router>
       <GlobalStyle />
      <Suspense
        fallback={
          <div className="text-center py-5 mt-5">
            <Loader size="large" active>
            </Loader>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/dashboard" element={<Coinflip />} />          

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
