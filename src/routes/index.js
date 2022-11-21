import { BrowserRouter, Route, Routes } from "react-router-dom"
import GenreForm from "../components/genre-form"
import MovieForm from "../components/movie-form"
import MovieDetails from "../components/movie-details"
import Home from "../pages/home"


export default function AppRoutes() {


    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<MovieDetails />} path="/movie/:id" />
                <Route element={<GenreForm/>} path="/form/genre" />
                <Route element={<MovieForm/>} path="/form/movie/:id" />
                <Route element={<MovieForm/>} path="/form/movie" />
            </Routes>
        </BrowserRouter>)

}