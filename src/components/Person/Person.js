import React from 'react'
import { API_URL, API_KEY } from '../../config';
import PersonInfo from '../elements/PersonInfo/PersonInfo'

// const Person = () => {
//     return(
//         <div>HELLO</div>
//     )
// }

class Person extends React.Component {

    state = {
        person: null,
        loading:false
    }    
    
    componentDidMount() {
        // ES6 destructuring the props
        console.log('params',this.props.match.params)
        const { actorId } = this.props.match.params;
        
        console.log(actorId);
        console.log('person mounted')
        //https://api.themoviedb.org/3/person/10669?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US
        let endpoint = `${API_URL}person/${actorId}?api_key=${API_KEY}&language=en-US`
        fetch(endpoint)
        .then(result => result.json())
        .then(result => {
            //console.log('Person', result)
            this.setState({ 
                person: result,
                loading: false 
            });
            //console.log(this.state.person.name)
        })
    }



    render() {

        // console.log('location', this.props.location)

        return(
            <div>
              <PersonInfo person={this.state.person} />
            </div>
        )
    }
}

export default Person