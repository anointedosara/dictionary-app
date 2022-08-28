import React, { useEffect, useState } from 'react'

function Search() {
    const [search, setSearch] = useState('welcome')
    const [Wordinformation, setinformation] = useState([]);
    const [loading, setLoading] = useState(false)

    const loadData = async (e) => {
        setLoading(true)
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${search}`)
        .then((data) => data.json())
        .then((data) => {
            console.log(data)
            setinformation(data)
            setLoading(false)
        })
        .catch((error) => {
            console.log(error)
            setLoading(false)
        })
    }
    
    useEffect(() => {
        loadData()
    }, [])

  return (
    <div className='search'>
      <form onSubmit={e => e.preventDefault()}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
        <button type='submit' onClick={loadData}>Search</button>
      </form>

      { 
      
      Wordinformation.length && !loading ?
      
        Wordinformation.map((item, i) => 
        <div key={i} className='details'>
        <h1>{item.word}</h1>
        <p>{item.phonetic}</p>
        <p>Pronounce:</p>
        {
            item?.phonetics.map((phonetic, i) => phonetic?.audio && <audio key={i} controls><source src={phonetic?.audio} type='audio/ogg' /></audio>)
        }
        {
            item.meanings.map((meaning, i) => <div key={i}>
                <h2>{meaning.partOfSpeech.toUpperCase()}:-</h2>
                <ul>{meaning.definitions.map((def, i) => <li key={i}>{def.definition}</li>)}</ul>
            </div>)
        }
        

        <div className='btn-div'>
            <button><a href={item.sourceUrls[0]}>More Info</a></button>
            <button>@Anointedosara 2022</button>
        </div>
      </div>
        )
     : !loading && !Wordinformation.length && <div className='error'>
        <h1>{Wordinformation.title}</h1>
        <p>{Wordinformation.message} {Wordinformation.resolution}</p>
     </div> }
    </div>
  )
}

export default Search
