import { Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Index from "./Index/Index";

function App(){
    return(
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/index" element={<Index/>}/>
        </Routes>
    );
}

export default App;