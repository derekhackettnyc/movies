import React from 'react';
import { Link } from 'react-router-dom';
import { IMAGE_BASE_URL } from '../../../config';
import PropTypes from 'prop-types';
import './Actor.css';

const Actor = ({ actor, actorId, movie }) => {

  //console.log('movie', movie)

  const POSTER_SIZE = "w154";
  //console.log(actor);

  return (
    <div className="rmdb-actor">
      <Link to={{ pathname: `/person/${actorId}`, movie: {movie} }}>
        <img
          className="clickable"
          src={actor.profile_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}` : './images/no_image.jpg'}
          alt="actorthumb"
        />
        <span className="rmdb-actor-name">{actor.name}</span>
        <span className="rmdb-actor-character">{actor.character}</span>
      </Link>
    </div>
  )
} 

Actor.propTypes = {
  actor: PropTypes.object,
  actorId: PropTypes.number,
  movieName:PropTypes.string
}

export default Actor;

