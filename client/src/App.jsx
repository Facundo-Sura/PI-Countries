import {Route, Routes} from "react-router-dom"
import Landing from "./views/land/landing";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import Form from "./views/form/form";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Landing />}/>
        <Route path="/countries" element={<Home />}/>
        <Route path="/countries/:id" element={<Detail />}/>
        <Route path="/countries/form" element={<Form />}/>
      </Routes>
    </div>
  );
}

export default App;
