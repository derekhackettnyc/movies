import React from 'react'

const HGMovies = ({movies}) => {

    console.log('movies',movies)

    const renderedList = movies.map( (movie,i) => {
        return(
            <div key={i} className='movie_card'>
                <img  src={`http://image.tmdb.org/t/p/w150_and_h225_bestv2/${movie.poster_path}`} alt='movie' />
                <p>{movie.title}</p>
            </div> 
        )
        
    })

    return(
        <div>
            <h2>Highest Grossing Movies</h2>
            <div className="movies">{renderedList}</div>
        </div>
    )
}

export default HGMovies