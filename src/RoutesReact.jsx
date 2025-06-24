import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
export function RoutesReact(){
    return(

        <>
        <BrowserRouter basename="/hp-dex">
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </BrowserRouter>
        </>
    );
}