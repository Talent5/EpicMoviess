

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Backup from "../assets/backup.png"

export const MovieDetail = ({title}) => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  const [trailer, setTrailer] = useState(null); // For storing trailer video key
  const image = movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : Backup;

  useEffect (() =>{
    async function fetchMovie() {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`);
      const json = await response.json();
      setMovie(json);
    }
    fetchMovie();
  }, [params.id])

  // Fetch trailer
  useEffect(() => {
    async function fetchTrailer() {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
      const data = await response.json();
      const trailerVideo = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailerVideo) {
        setTrailer(trailerVideo.key); // Store the YouTube video key
      }
    }
    fetchTrailer();
  }, [params.id]);

  useEffect (() =>
  {
    document.title= `${movie.title} - Epic Movies `
  }, [movie.title])

  return (
    <main>
      <section className="flex justify-around flex-wrap py-5">
        <div className="max-w-sm">
          <img className="rounded" src={image} alt={movie.title} />
        </div>
        <div className="max-w-2xl text-gray-700 text-lg dark:text-white">
          <h1 className="text-4xl font-bold my-3 text-center lg:text-left">{movie.title}</h1>
          <p className="my-4">{movie.overview}</p>
            {movie.genres ? (
              <p className="my-7 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span className="mr-2 border border-gray-200 rounded dark:border-gray-600 p-2 " key={genre.id}>
                    {genre.name}
                  </span>
                ))}
              </p>
            ) : ""}

          {/* Movie Rating */}
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-yellow-300 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <p className="ms-2 text-sm  text-gray-900 dark:text-white">{movie.vote_average}</p>
            <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
            <span className=" text-gray-900 dark:text-white">{movie.vote_count}</span>
          </div>

          {/* Movie Details */}
          <p className="my-4">
            <span className="mr-2 font-bold">Runtime:</span>
            <span>{movie.runtime} minutes</span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Budget:</span>
            <span>${movie.budget}</span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Revenue:</span>
            <span>${movie.revenue}</span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Release Date:</span>
            <span>{movie.release_date}</span>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">IMDB Code:</span>
            <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noreferrer">
              {movie.imdb_id}
            </a>
          </p>
          <p className="my-4">
            <span className="mr-2 font-bold">Status:</span>
            <span>{movie.status}</span>
          </p>

          {/* Responsive Movie Trailer */}
          {trailer ? (
            <div className="my-4">
              <h2 className="text-2xl font-bold">Watch the Trailer</h2>
              <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}> {/* 16:9 Aspect Ratio */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${trailer}`}
                  title="Movie Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <p>No trailer available</p>
          )}
        </div>
      </section>
    </main>
  )
}
