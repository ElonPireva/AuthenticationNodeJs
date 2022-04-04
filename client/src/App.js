import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";

const App = () => {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="/" component={<Login />}>
               <Route index element={<Login />} />
               <Route path="/register" element={<Register />} />
            </Route>
         </Routes>
      </BrowserRouter>
   )
}

export default App;
