import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='home'>
        <h1>📚 Dictionary App</h1>
      <img src="https://subhranshuchoudhury.github.io/englishdictionary/searchimage.gif" alt="" />
      <button><Link to='/search'>Search A Word</Link></button>
    </div>
  )
}

export default Home
