import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const MoviesContext = createContext({})

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([])
    const [moviesTop, setMoviestTop] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [query, setQuery] = useState('')

    useEffect(() => {
        const getMovies = async() => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&page=${page}`)
            console.log(res.data)
            setMovies(res.data.results)
            setTotalPages(res.data.total_pages)
        }
        const getMoviesTop = async() => {
            const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&page=${page}`)
            console.log(res.data)
            setMoviestTop(res.data.results)
        }
        setIsLoading(true)
        getMovies()
        getMoviesTop()
        setIsLoading(false)
    }, [page])

    async function nextPage() {
        setPage(page + 1)
    }

    async function prevPage() {
        if(page - 1 < 1 ) return 
        setPage(page - 1)
    }

    async function goToPage(page) {
        if(page > totalPages){
            setPage(totalPages)
            return
        }
        setPage(page)
    }

    async function searchFor(query) {
        setIsLoading(true)
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d49de9500030e9647cb9119bd7cb3b2c&query=${encodeURI(query)}`)
        console.log('query', query)
        setMovies(res.data.results)
        setIsLoading(false)
        setQuery(query)
    }

    return (
        <MoviesContext.Provider
          value={{
            movies,
            moviesTop,
            isLoading,
            page,
            totalPages,
            nextPage,
            prevPage,
            goToPage,
            searchFor
          }}
        >
          {children}
        </MoviesContext.Provider>
      );
}