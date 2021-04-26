import React from 'react';
import { IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from '../../../config';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import Actor from '../Actor/Actor';
import MovieThumb from '../MovieThumb/MovieThumb'
import './PersonInfo.css'; 

const personinfo = person => (

    <div className='portrait'>
      <h1>{person.name}</h1>
      <h2>BLAH</h2>
    </div> 

)

personinfo.propTypes = {
  movie: PropTypes.object,
  directors: PropTypes.array
}

export default personinfo;