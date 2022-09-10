import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MoviesContext = createContext({})

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([])
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getMovies = async() => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&page=${page}`)
            setMovies(res.data.results)
        }
        setIsLoading(true)
        getMovies()
        setIsLoading(false)
    }, [])

    async function nextPage() {
        setPage(page + 1)
        setIsLoading(true)
        const res =  await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&page=${page}`)
        setMovies(res.data.results)
        setIsLoading(false)
    }

    async function prevPage() {
        setPage(page - 1 < 1 ? 1: page - 1)
        setIsLoading(true)
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&page=${page}`)
        setMovies(res.data.results)
        setIsLoading(false)
    }

    async function searchFor(query) {
        setIsLoading(true)
        const res = await axios.get
        (`https://api.themoviedb.org/3/search/movie?api_key=d49de9500030e9647cb9119bd7cb3b2c&query=${encodeURI(query)}`)
        setMovies(res.data.results)
        setIsLoading(false)
    }

    return (
        <MoviesContext.Provider
          value={{
            movies,
            isLoading,
            nextPage,
            prevPage,
            searchFor
          }}
        >
          {children}
        </MoviesContext.Provider>
      );
}