import axios from "axios";
import { createContext, useLayoutEffect, useState } from "react";

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
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState('upcoming')
    const [mode, setMode] = useState('all')
    const [query, setQuery] = useState('')

    useLayoutEffect(() => {
        const getMovies = async() => {
            setMovies([])
            if (mode === 'search') {
                const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d49de9500030e9647cb9119bd7cb3b2c&query=${encodeURI(query)}&language=pt-BR&page=${page}`)
                console.log(res.data)
                setMovies(res.data.results)
                setTotalPages(res.data.total_pages)
                return
            }
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${filter}?api_key=d49de9500030e9647cb9119bd7cb3b2c&language=pt-BR&page=${page}`)
            console.log(res.data)
            setMovies(res.data.results)
            setTotalPages(res.data.total_pages)
        }
        setIsLoading(true)
        getMovies()
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
        if(query.trim() === '') return
        setIsLoading(true)
        setMovies([])
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=d49de9500030e9647cb9119bd7cb3b2c&query=${encodeURI(query)}&language=pt-BR&page=${page}`)
        console.log('query', query)
        console.log(res.data)
        setMovies(res.data.results)
        setIsLoading(false)
        setQuery(query)
        setMode('search')
        
    }

    async function filterFor(FilterOption) {
        setFilter(FilterOptions[FilterOption])
        setMode('all')
    }

    return (
        <MoviesContext.Provider
          value={{
            movies,
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