import {  Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
export function RoutesReact(){
    return(

        <>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
            </Routes>
        </>
    );
}