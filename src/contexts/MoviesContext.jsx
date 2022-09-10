import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MoviesContext = createContext({})

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
    }, [])
}