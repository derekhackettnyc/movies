import React from 'react'
import {IMAGE_BASE_URL, PROFILE_SIZE} from '../../../config'
import './Profile.css'


const Profile = ({person}) => {

    console.log(person)
        return(
            <div className='person'>
                <div className='portrait'>
                    <h1>{person.name}</h1>	
                    <img src={`${IMAGE_BASE_URL}${PROFILE_SIZE}/${person.profile_path}`} alt="profile-pic" />
                </div> 
                <div className='bio'>	
                    <h2>Biography</h2>
                    <p className="item-description">{person.biography}</p>
                </div>
                <div className="personal-info">	
                    <h2 className='header'>Personal Info</h2>                          
                    <h4 className='key'>Know For</h4>
                    <p className='property'>{person.known_for_department}</p>
                    <h4 className='key'>Gender</h4>
                    <p className='property'>{person.gender === 1 ? 'Female': 'Male'}</p>
                    <h4 className='key'>Popularity</h4>
                    <p className='property'>{person.popularity}</p>
                    <h4 className='key'>Birthday</h4>
                    <p className='property'>{person.birthday}</p>
                    <h4 className='key'>Place of Birth</h4>
                    <p className='property'>{person.place_of_birth}</p>
                    <h4 className='key'>Official Site</h4>
                    <p className='property'>{person.homepage}</p>
                </div>
            </div>
        )
}


export default Profile