import "./App.css"
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App(){
    return(
        <>
            <Nav/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default App;