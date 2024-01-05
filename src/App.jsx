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
          <h1>One Piecedle</h1>
          <div className='item-head'>
            <div className="item-head-container">
            {data.map((item) => (
              <div className='item' key={item.nombre}>
                <div className='item-div'>
                  <div className='content'>
                    <img className='item-img' src={item.imagen} alt="" />
                  </div>
                </div>
                <div className='item-div'>
                  <div className='content'>
                    <h4>{item.especie}</h4>
                  </div>
                </div>
                <div className='item-div'>
                  <div className='content'>
                    <h4>{item.genero}</h4>
                  </div>
                </div>
                <div className='item-div item-div-regular'>
                  <div className='content'>
                    <h4>{item.lugar_nacimiento}</h4>
                  </div>
                </div>
                <div className='item-div item-div-success'>
                  <div className='content'>
                    <h4>{item.edad}</h4>
                  </div>
                </div>
                <div className='item-div item-div-error'>
                  <div className='content'>
                    <h4>{item.recompensa}</h4>
                  </div>
                </div>
                <div className='item-div'>
                  <div className='content'>
                    <h4>{item.ocupacion[0]} / {item.ocupacion[1]}</h4>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
