import React from 'react'

const Search = ({searchTerm,setSearchTerm  }) => {
  return (
   <>
   <div className='search'>
    <div>
      <img src="./search.svg" alt="searc_icon" />
      <input 
      type="text" 
      placeholder='Search for the movie'
      value={searchTerm}
      onChange={ e =>setSearchTerm(e.target.value)}
      />
    </div>
   </div>
   </>
  )
}

export default Search