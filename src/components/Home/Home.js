import React from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import useApiRequest from '../hooks/useApiRequest'
// import useResources from '../hooks/useApiRequest'
import './Home.css';

//
//
// This will be a complete refactor - using hooks and local state for now.
// Created on the branch home-page
//
//

const Home = () => {

  const [isLoading, data, setData, makeRequest] = useApiRequest()

  React.useEffect(() => {
    console.log("RESULT >>>>>",data)
  },[data])

  React.useEffect(() => {
    makeRequest({endpoint:'movie/popular', params:{page:1}})
  },[])

  // componentDidMount() {
  //   if (sessionStorage.getItem('HomeState')) {
  //     let state = JSON.parse(sessionStorage.getItem('HomeState'))
  //     this.setState({ ...state })
  //   } else {
  //     this.setState({ loading: true })
  //     const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  //     this.fetchItems(endpoint);
  //   }
  // }

  const searchItems = (searchTerm) => {

    setData({
      movies:[],
      searchTerm
    })

    if(searchTerm)
      makeRequest({ endpoint:'/search/movie', params:{query:searchTerm}})
    else
      makeRequest({endpoint:'movie/popular', params:{page:1}})

  }

  const loadMoreItems = () => {
    // ES6 Destructuring the state
    const { searchTerm, currentPage } = data;

    let endpoint = '';

    if (searchTerm) {
      console.log("i was here")
      makeRequest({ endpoint:'search/movie', params:{query:searchTerm, page:currentPage + 1}})
      // endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
      
    } else {
      makeRequest({ endpoint:'movie/popular', params:{page:currentPage + 1}})
      // endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }
  }

  const fetchItems = (endpoint) => {
    // ES6 Destructuring the state
    const { movies, heroImage, searchTerm } = this.state;

    fetch(endpoint)
      .then(result => result.json())
      .then(result => {
        this.setState({
          movies: [...movies, ...result.results],
          heroImage: heroImage || result.results[0],
          loading: false,
          currentPage: result.page,
          totalPages: result.total_pages
        }, () => {
          // Remember state for the next mount if we´re not in a search view
          if (searchTerm === "") {
            sessionStorage.setItem('HomeState', JSON.stringify(this.state));
          }
        })
      })
      .catch(error => console.error('Error:', error))
  }

  const { movies, heroImage, currentPage, totalPages, searchTerm } = data

  return (
    <div className="rmdb-home">
      {
        heroImage && <div>
          <HeroImage
            image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
            title={heroImage.title}
            text={heroImage.overview}
          />
          <SearchBar term={searchTerm} callback={searchItems} />
        </div>
      }

      <div className="rmdb-home-grid">
        <FourColGrid
          header={searchTerm ? 'Search Result' : 'Popular Movies'}
          loading={isLoading}
        >
          {movies.map((movie, i) => (
            <MovieThumb
              key={i}
              clickable={true}
              image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}` : './images/no_image.jpg'}
              movieId={movie.id}
              movieName={movie.original_title}
            />
          ))}
        </FourColGrid>
        {isLoading ? <Spinner /> : null}
        {(currentPage <= totalPages && !isLoading) ?
          <LoadMoreBtn text="Load More" onClick={loadMoreItems} />
          : null
        }
      </div>
    </div>
  )

}

export default Home;