import { useState, useEffect } from 'react'
import './App.css'
import Data from "./assets/data.jsx"
import { v4 as uuidv4 } from 'uuid';
import { useAutoAnimate } from '@formkit/auto-animate/react'

// React UI
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Avatar from "@mui/material/Avatar"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function App() {
  const [win, setWin] = useState(false)
  const [autoComplete, setAutoComplete] = useState(false)
  const [character, setCharacter] = useState(randomCharacter())
  const [noCheck, setNoCheck] = useState(Data.personajes)
  const [siCheck, setsiCheck] = useState([])
  const [parent, enableAnimations] = useAutoAnimate()

  useEffect(() => {
  }, [siCheck])

  function randomCharacter() {
    const val = Math.floor(Math.random() * Data.personajes.length);
    return Data.personajes[val]
  }

  function checkValue(data, obj, index) {
    console.log(data);
    const characterValue = character[data];
    const objValues = obj[index][data];

    if (data == "imagen") return "item-div"
    ////
    if (objValues == characterValue) return "item-div item-div-success"
    ////
    if (data == "recompensa") { 
      return characterValue > objValues ? "item-div item-div-top item-div-error" : "item-div item-div-down item-div-error"
    }
    ////
    if (Array.isArray(characterValue) && Array.isArray(objValues)) {
      const hasCommonValue = objValues.some(val => characterValue.includes(val));
      if (hasCommonValue) {
        return "item-div item-div-regular";
      }
    }
    return "item-div item-div-error";
  }

  function handleValues(key, val) {
    if (key == "label") return  
    if (key == "imagen") return <img className='item-img' src={val} alt="" />
    if (key == "ocupacion") return <p>{val[0]} / {val[1]}</p>
    return  <p>{val}</p>
  }

  function handleState(objeto) {
    const newSi = [...siCheck]
    ////
    const newNo = noCheck.filter(item => item !== objeto)
    newSi.unshift(objeto)
    ////
    setNoCheck(newNo)
    setsiCheck(newSi)
    ////
    setAutoComplete(false)

    if (objeto == character) setWin(true)
    else {
      console.log("sigue");
    }
  }

  return (
    <>
      {character && (
        <div className='container'>
          <h1>One Piecedle</h1>
          <div className='search'>
            <Autocomplete
              open={autoComplete}
              clearOnEscape
              noOptionsText={"No se a encontrado ese Personaje"}
              id="combo-box-demo"
              options={noCheck}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option) => (
                <Box
                  key={uuidv4()}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#292D30!important' },
                    padding: '8px',
                    backgroundColor: '#1E2328!important',
                    color: 'white',
                  }}
                  onClick={() => {
                    handleState(option);
                  }}
                >
                  <Avatar
                    variant="square"
                    src={option.imagen}
                    alt={option.label}
                    sx={{ width: 56, height: 56, imageRendering: 'pixelated', objectFit: 'cover', border: '2px solid black' }}
                  />
                  <Typography>{option.label}</Typography>
                </Box>
              )}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField onBlur={() => setAutoComplete(false)} onClick={() => setAutoComplete(true)} variant="standard" {...params} label="Personajes" />}
            />
          </div>
          <div ref={parent} className='item-head'>
            {
              siCheck.length > 0 && (
                <div className="item-head-container">
                  <div className='item' >
                    <div className='item-div item-div-cat' style={{ border: "none" }}>
                      <div className='content content-cat'>
                        <div>
                          Personaje
                        </div>
                        <hr />
                      </div>
                    </div>
                    <div className='item-div item-div-cat' style={{ border: "none" }}>
                      <div className='content content-cat'>
                        <div>
                          Raza
                        </div>
                        <hr />
                      </div>
                    </div>
                    <div className='item-div item-div-cat' style={{ border: "none" }}>
                      <div className='content content-cat'>
                        <div>
                          Genero
                        </div>
                        <hr />
                      </div>
                    </div>  <div className='item-div item-div-cat' style={{ border: "none" }}>
                      <div className='content content-cat'>
                        <div>
                          Origen
                        </div>
                        <hr />
                      </div>
                    </div>
                    <div className='item-div item-div-cat' style={{ border: "none" }}>
                      <div className='content content-cat'>
                        <div>
                          Edad
                        </div>
                        <hr />
                      </div>
                    </div>
                    <div className='item-div item-div-cat' style={{ border: "none" }}>
                      <div className='content content-cat'>
                        <div>
                          Recompensa
                        </div>
                        <hr />
                      </div>
                    </div>
                    <div className='item-div item-div-cat' style={{ border: "none" }}>
                      <div className='content content-cat'>
                        <div>
                          Ocupacion
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div ref={parent}>
                    {siCheck.map((item, index) => (
                      <div className='item' key={item.label}>
                        {Object.entries(item).map(([key, val]) => (
                          key !== "label" && (
                            <div key={uuidv4()} className={checkValue(key, siCheck, index)}>
                              <div className="content">
                                  {handleValues(key, val)}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )
            }
          </div>
        </div>
      )}
    </>
  )
}

export default App
