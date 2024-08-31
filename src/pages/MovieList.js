import { useEffect, useState } from "react";
import { Card } from "../components/Card"

export const MovieList = () => {
    const [movies, setMovies] = useState([]);

    useEffect (() => {
        async function fetchMovies() {
            const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=e466499a38fbb6c457506d31101b73b2");
            const data = await response.json();
            setMovies(data.results);
        }
        fetchMovies();
    }, []) 
    return (
        <main>
            <section className='max-w-7xl mx-auto py-7'>
                <div className='flex justify-start flex-wrap'>
                    { movies.map((movie) =>(
                        <Card key ={movie.id} movie={movie}/>
                    ))}
                </div>
            </section>
        </main>
    )
}
