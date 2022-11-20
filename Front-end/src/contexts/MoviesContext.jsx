import axios from "axios";
import { createContext, useLayoutEffect, useState } from "react";
import apiClient from "../api";

export const FilterOptions = {
    0:"upcoming",
    1:"popular" 
}

export const Modes = {
    0:'all',
    1: 'search'
}

export const MoviesContext = createContext({})

export const MoviesProvider = ({ children }) => {
    const [movies, setMovies] = useState([])
    const [moviesTop, setMoviestTop] = useState([])
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState('upcoming')
    const [mode, setMode] = useState('all')
    const [query, setQuery] = useState('')

    useLayoutEffect(() => {
        const getMovies = async() => {
            setMovies([])
            const res = await apiClient.get('/filme');
            setMovies(res.data)
            setTotalPages(0)
        }
        const getMoviesTop = async() => {
            setMoviestTop([])
            const res = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&page=${page}`)
            console.log(res.data)
            setMoviestTop(res.data.results)
        }
        setIsLoading(true)
        getMovies()
        getMoviesTop()
        setIsLoading(false)
    }, [page, filter, mode, query])

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
        return
        // if(query.trim() === '') return
        // setIsLoading(true)
        // setMovies([])
        // const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d49de9500030e9647cb9119bd7cb3b2c&query=${encodeURI(query)}&language=pt-BR&page=${page}`)
        // console.log('query', query)
        // console.log(res.data)
        // setMovies(res.data.results)
        // setIsLoading(false)
        // setQuery(query)
        // setMode('search')
        // setPage(1)
        
    }

    async function filterFor(FilterOption) {
        return
        // setFilter(FilterOptions[FilterOption])
        // setMode('all')
    }

    return (
        <MoviesContext.Provider
          value={{
            movies,
            moviesTop,
            isLoading,
            page,
            query,
            mode,
            totalPages,
            nextPage,
            prevPage,
            goToPage,
            searchFor,
            filterFor
          }}
        >
          {children}
        </MoviesContext.Provider>
      );
}