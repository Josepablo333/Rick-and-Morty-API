import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import CardResident from './components/CardResident'
import LocationInfo from './components/LocationInfo'

function App() {

  const [location, setLocation] = useState()
  const [searchInput, setSearchInput] = useState('')  

  useEffect(() => {
    let  numeberLocation
    if(searchInput === ''){
      numeberLocation = Math.floor(Math.random() * (126 - 1) + 1)
    } else {
      numeberLocation = searchInput
    }

    const URL = `https://rickandmortyapi.com/api/location/${numeberLocation}`
    axios.get(URL)
      .then(res => setLocation(res.data))
      .catch(err => console.log(err))
  }, [searchInput])
  
  const handleSubmit = e => {
    e.preventDefault ()
    setSearchInput (e.target.search.value)
  }


  return (
    <div className="App">
      <header>
        <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/rick-and-morty-1604562846.jpg" alt="" />
        <h1>Rick and Morty Wiki</h1>
      </header>
      <section className='main'>
        <form onSubmit={handleSubmit}>
          <input id='search' type="text" placeholder='type a location'/>
          <button>Search</button>
        </form>
        <LocationInfo location={location} />
        <div className='residents'>
          <h2 className='residents_title'>Residents</h2>
        </div>
        <div className='grid'>
          {
            location?.residents.map(url => (
              <CardResident
                key={url}
                url={url}
              />
          ))}
        </div>
      </section>
    </div>
  )
}

export default App
