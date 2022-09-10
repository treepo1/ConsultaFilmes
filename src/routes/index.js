import { BrowserRouter, Route, Routes } from "react-router-dom"
import MovieDetails from "../components/movie-details"
import Home from "../pages/home"


export default function AppRoutes() {


    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<MovieDetails />} path="/movie/:id" />
            </Routes>
        </BrowserRouter>)

}