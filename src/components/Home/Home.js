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

const Home = () => {

  const [isLoading, data, makeRequest] = useApiRequest('movie/popular')

  // const [isLoading, data] = useResources(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`)

  React.useEffect(() => {
    console.log("RESULT >>>>>",data)
  },[data])

  React.useEffect(() => {
    makeRequest({params:{page:1}})
  },[])

  // React.useEffect(() => {
  //   (async () => {

  //     setData({ ...data, loading: true })

  //     const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  //     const result = await fetch(endpoint)
  //     const fetchData = await result.json()

  //     console.log("fetchData", fetchData)

  //     await delay(1000) // development only

      // setData({
      //   ...data,
      //   movies: fetchData.results,
      //   totalPages: fetchData.total_pages,
      //   heroImage: heroImage || fetchData.results[0],
      //   loading: false,
      //   currentPage: fetchData.page,
      // })

  //   })()
  // }, [])


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
    let endpoint = '';
    this.setState({
      movies: [],
      loading: true,
      searchTerm
    })

    if (searchTerm === "") {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
    }
    this.fetchItems(endpoint);
  }

  const loadMoreItems = () => {
    // ES6 Destructuring the state
    const { searchTerm, currentPage } = data;

    let endpoint = '';
    // this.setState({ loading: true }) 

    // setData({ ...data, loading: true })

    if (searchTerm === '') {
      // endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage + 1}`;
      makeRequest({params:{page:currentPage + 1}})
    } else {
      endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=${currentPage + 1}`;
    }

    
    // this.fetchItems(endpoint);
    // useResources(endpoint)
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
          <SearchBar callback={this.searchItems} />
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