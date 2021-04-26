import React from 'react'

const CreditTable = ({credits}) => {

//     // console.log(credits)

//     console.log('CREDITS',credits)
// //         console.log('KEYS',Object.keys(credits))

// //         const groupedKeys = Object.keys(credits)

// // let sortedCreditTable = []
// //         groupedKeys.forEach( key => {
// //             sortedCreditTable = credits[key].map( (movie,i) => {
// //                 return(
// //                     <tbody key={i} className='credits_tbody'>
// //                     <tr >
// //                     <td>{key}</td>
// //                     <td className='title'>{movie.title} </td>
// //                     <td>{movie.character}</td>
// //                     </tr>
// //                     </tbody>
// //                     )                                
// //                 })
// //         })      


    const CreditList = credits.map( (credit,i) => {
        return(
            <tr key={i}>
            <td>{credit.year}</td>
            <td className='title'>{credit.title} </td>
            <td>{credit.character}</td>
            </tr>
        )
    })

    // const tableRowGroup = .map( (row,i) => {
    //     return <TableRowGroup key={i} row={row} />
    // })


    return(
        <div className='credit-list'>
            <table className='credits'>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Title</th>
                        <th>Character</th>
                    </tr>                      
                </thead>
                <tbody>{CreditList}</tbody>
            </table>
        </div>
    )
}

export default CreditTable