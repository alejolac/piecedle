import { useState, useEffect } from 'react'
import './App.css'
import Data from "./assets/data.jsx"
function App() {
  const [data, setData] = useState()

  useEffect(() => {
    setData(Data.personajes)
  }, [])

  return (
    <>
      {data && (
        <div className='container'>
          <h1>One Piece</h1>
          <div className='item-head'>
            {data.map((item) => (
              <div className='item' key={item.nombre}>
                <div className='item-div'>
                  <div className='content'>
                    <img className='item-img' src={item.imagen} alt="" />
                  </div>
                </div>
                <div className='item-div'>
                  <div className='content'>
                    <h4>{item.nombre}</h4>
                  </div>
                </div>
                <div className='item-div'>
                  <div className='content'>
                    <h4>{item.genero}</h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default App
