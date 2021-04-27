import React from 'react';
import axios from 'axios'

import { API_URL, API_KEY } from '../../config';

const tmdbAPI =  axios.create({
    baseURL: API_URL
})

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const INITIAL_STATE = {
    movies: [],
    currentPage: 0,
    totalPages: 0,
    totalResults: 0,
    heroImage: null,
    searchTerm: ''
} 


/////////
 
const useApiRequest = (url) => {

    const [responseData, setResponseData] = React.useState(INITIAL_STATE)
    const [isLoading, setIsLoading] = React.useState(false)

    const makeRequest = React.useCallback(async ({ verb='get', endpoint='', params={}, data={} } = {}) => {

        params = { 
            ...params,
            api_key: API_KEY, 
            language: 'en-US'
        }

        console.log("params",params)

        try {
            // remove any 'empty' keys where value = '' pairs. Axios doesn't like this.
            const queryParams = Object.entries(params).reduce((arr, [key, value]) => value ? { ...arr, [key]: value } : arr, {})

            setIsLoading(true)

            await delay(500) // production only 

            const response = await tmdbAPI[verb](`${endpoint}`, {
                params: queryParams,
                ...data
            })

            // Remove this porperty from the response data
            delete(response.data.params)

            setIsLoading(false)


            // setUsers(users => users.filter((user) => user.id !== id))

            setResponseData(responseData => (
                {
                    ...responseData,
                    movies: [...responseData.movies, ...response.data.results],
                    currentPage: response.data.page,
                    totalPages: response.data.total_pages,
                    totalResults: response.data.total_results,
                    // heroImage: response.data.results[Math.floor(Math.random() * response.data.results.length)]
                    heroImage: response.data.results[0]

                }
            ))   


            // setResponseData({
            //     movies: [...responseData.movies, ...response.data.results],
            //     currentPage: response.data.page,
            //     totalPages: response.data.total_pages,
            //     totalResults: response.data.total_results,
            //     heroImage: response.data.results[Math.floor(Math.random() * response.data.results.length)]
            // })    

        } catch (e) {
            console.log("useApiRequest ERROR ", e)
        }

    }, [url,responseData]);

    return [isLoading, responseData, setResponseData, makeRequest];

};

export default useApiRequest