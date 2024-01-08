import { useState, useEffect } from 'react'
import './App.css'
import Data from "./assets/data.jsx"
import { v4 as uuidv4 } from 'uuid';


// React UI
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from "@mui/material/Avatar"
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

function App() {
  const [character, setCharacter] = useState(randomCharacter())
  const [noCheck, setNoCheck] = useState(Data.personajes)
  const [siCheck, setsiCheck] = useState([])

  useEffect(() => {
  }, [])

  const handleOptionClick = (option) => {
    console.log('Nombre del personaje:', option.label);
  };

  function randomCharacter() {
    const val = Math.floor(Math.random() * Data.personajes.length);
    return Data.personajes[val]
  }

  return (
    <>
      {character && (
        <div className='container'>
          <h1>One Piecedle</h1>
          <div className='search'>
            <Autocomplete
              disablePortal
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
                    handleOptionClick(option);
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
              sx={{ width: 300, zIndex: 'unset', '& .MuiAutocomplete-listbox': { backgroundColor: '#1E2328' } }}
              renderInput={(params) => <TextField variant="standard" {...params} label="Personajes" />}
            />
          </div>
          <div className='item-head'>
            {
              siCheck.length > 0 && (
                <div className="item-head-container">
                  {siCheck.map((item) => (
                    <div className='item' key={item.label}>
                      <div className='item-div'>
                        <div className='content'>
                          <img className='item-img' src={item.imagen} alt="" />
                        </div>
                      </div>
                      <div className='item-div'>
                        <div className='content'>
                          <p>{item.especie}</p>
                        </div>
                      </div>
                      <div className='item-div'>
                        <div className='content'>
                          <p>{item.genero}</p>
                        </div>
                      </div>
                      <div className='item-div item-div-regular'>
                        <div className='content'>
                          <p>{item.lugar_nacimiento}</p>
                        </div>
                      </div>
                      <div className='item-div item-div-success'>
                        <div className='content'>
                          <p>{item.edad}</p>
                        </div>
                      </div>
                      <div className='item-div item-div-error'>
                        <div className='content'>
                          <p>{item.recompensa}</p>
                        </div>
                      </div>
                      <div className='item-div'>
                        <div className='content'>
                          <p>{item.ocupacion[0]} , {item.ocupacion[1]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
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
