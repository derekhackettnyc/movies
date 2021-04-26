import React from 'react'
import Profile from '../elements/Profile/Profile'
import HGMovies from '../elements/HGM/Hgm'
import CreditTable from '../elements/CreditTable/CreditTable'
import Navigation from '../elements/Navigation/Navigation'
import {API_URL,IMAGE_BASE_URL,THUMBNAIL, POSTER_SIZE} from '../../config'
import MovieThumb from '../elements/MovieThumb/MovieThumb'
import FourColGrid from '../elements/FourColGrid/FourColGrid'


class Person2 extends React.Component {

    state = {
        person:null,
        loading:false,
        searchTerm: '',
        movies:[],
        credits:[]
    }

    componentDidMount() {
        console.log('PERSON 2',this.props)

        const actorID = this.props.match.params.actorId
        console.log(actorID)

        this.setState({loading:true})
        const endpoint = `https://api.themoviedb.org/3/person/${actorID}?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US`
        this.fetchData(endpoint,actorID)
    }

    fetchData = (endpoint, actorID) => {
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            this.setState({person: result,loading:false})

            const endpointMovies = `https://api.themoviedb.org/3/discover/movie?with_people=${actorID}&sort_by=revenue.desc&api_key=844dba0bfd8f3a4f3799f6130ef9e335`
            fetch(endpointMovies)
            .then(result => result.json())
            .then(result => {
                this.setState({movies:result.results})
                const endpointCharacter = `https://api.themoviedb.org/3/person/${actorID}/movie_credits?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US`
                fetch(endpointCharacter)
                .then(result => result.json())
                .then(result => {

                    const actingMovies =  result.cast.map((movie) => {
                        return {
                            year : (movie.release_date || 'XXXX-00-00').substring(0,4),
                            title: movie.title,
                            character: movie.character
                        }
                    }).filter(movie => movie.year !== 'XXXX')
                    .sort((a,b) => (a.year< b.year) ? 1 : ((b.year < a.year) ? -1 : 0));


                    // const groupedYears = actingMovies
                    // .filter(movie => movie.year !== 'XXXX')
                    // .reduce((h, {year,title,character}) => Object.assign(h, { [year]:( h[year] || [] ).concat({title,character})}), {})
                    
                    // this.setState({credits:groupedYears})

                    this.setState({credits:actingMovies})
                }) 
            }) 

            
        })  
    }

    render() {
        return(
            <div>
                {this.state.person ?
                <div>
                    <Navigation movie={this.state.person.name} />
                    <Profile person={this.state.person} />
                    <div className="rmdb-home-grid">
                        <FourColGrid
                        header='Highest Grossing Movies'
                        loading={false}
                        >
                        {this.state.movies.map( (element, i) => (
                            <MovieThumb
                            key={i}
                            clickable={true}
                            image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                            movieId={element.id}
                            movieName={element.original_title}
                            />
                        ))}
                        </FourColGrid>
                    </div>
                    {/* <HGMovies movies={this.state.movies}/> */}
                    <CreditTable credits={this.state.credits} />
                </div> 
                :null}
            </div> 
        )
    }
}

export default Person2