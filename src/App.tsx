import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Pred from "./components/Pred";
import Index from "./components/Index";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Additems from "./components/Additems";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/artificialintelligence" element={<Pred />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/additems" element={<Additems />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
