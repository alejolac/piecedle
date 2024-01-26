import { useState, useEffect, useRef } from 'react'
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
import Tooltip from '@mui/material/Tooltip';
import Button from "@mui/material/Button"

import confetti from 'canvas-confetti';

function App() {
  const [win, setWin] = useState(true)
  const [character, setCharacter] = useState(randomCharacter())
  const [noCheck, setNoCheck] = useState(sortCharacters())
  const [siCheck, setsiCheck] = useState([])
  const [parent, enableAnimations] = useAutoAnimate()
  const [value, setValue] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!win) confetti()
  }, [win])

  useEffect(() => {
    setValue("")
  }, [data])

  function sortCharacters() {
    const data = Data.personajes.map((option) => {
      const firstLetter = option.label[0].toUpperCase();
      return {
        firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
        ...option
      }
    })
    return data
  }

  const customFilterOptions = (options, { inputValue }) => {
    const inputLowerCase = inputValue.toLowerCase();
    return options.filter((option) =>
      option.label.toLowerCase().startsWith(inputLowerCase)
    );
  };

  function randomCharacter() {
    const val = Math.floor(Math.random() * Data.personajes.length);
    return Data.personajes[val]
  }

  function checkValue(data, obj, index) {
    let characterValue = character[data];
    let objValues = obj[index][data];

    if (data == "imagen") return "item-div"
    ////
    if (objValues == characterValue) return "item-div item-div-success"
    ////
    if (data == "recompensa" || data == "edad" || data == "aparicion") {
      if (typeof (objValues) == "string" || typeof (characterValue) == "string") return "item-div item-div-error";
      return characterValue > objValues ? "item-div item-div-top item-div-error" : "item-div item-div-down item-div-error"
    }
    ////
    if (Array.isArray(characterValue) || Array.isArray(objValues)) {
      if (Array.isArray(characterValue) != Array.isArray(objValues)) {
        Array.isArray(characterValue) ? objValues = [objValues] : characterValue = [characterValue]
      }
      const hasCommonValue = objValues.some(val => characterValue.includes(val));
      if (hasCommonValue) {
        return "item-div item-div-regular";
      }
    }
    return "item-div item-div-error";
  }

  function handleValues(key, val, name) {
    if (key === "label") return null;
    if (key === "imagen") return (
      <Tooltip title={name} arrow>
        <img className='item-img' src={val} alt={val} />
      </Tooltip>
    )

    if (Array.isArray(val) && val.length > 1) {
      return (
        <p>
          {val.map((item, index) => (
            index === 0 ? item : ` / ${item}`
          ))}
        </p>
      );
    }
    return <p>{val}</p>;
  }

  function handleState(objeto) {
    console.log(character);
    console.log(objeto);
    if (!objeto) {
      console.error("Objeto no definido");
      return;
    }
    const newSi = [...siCheck]
    ////
    const newNo = noCheck.filter(item => item.label !== objeto.label)
    newSi.unshift(objeto)
    ////
    setNoCheck(newNo)
    setsiCheck(newSi)
    ////
    objeto.label == character.label ? setWin(false) : setWin(true)
    setData(objeto)
    return
  }

  return (
    <>
      {character && (
        <div className='container'>
          <h1 style={{ color: 'white' }}>One Piecedle</h1>
          <div className='search'>
            {
              win && (
                <Autocomplete
                  filterOptions={customFilterOptions}
                  open={open}
                  options={noCheck.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  id="combo-box-demo"
                  groupBy={(option) => option.firstLetter}
                  value={value}
                  noOptionsText={"No se a encontrado ese Personaje"}
                  onChange={(event, value) => {
                    setValue(value)
                    handleState(value)
                  }}
                  isOptionEqualToValue={(option, value) => option.label !== value}
                  renderOption={(props, option) => (
                    <Box
                      {...props}
                    >
                      <Avatar
                        src={option.imagen}
                        alt={option.label}
                        variant="square"
                        sx={{ width: 56, height: 56, marginRight: 2, cursor: 'pointer' }}
                      />
                      {option.label || ""}
                    </Box>
                  )}
                  sx={{ width: 300 }}
                  renderInput={(params, option) => (
                    <TextField
                      {...params}
                      label="Peronaje"
                      InputProps={{
                        ...params.InputProps,
                      }}
                      sx={{
                        cursor: 'pointer',
                      }}
                    />
                  )} />
                  
              )
            }
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
                          Genero
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
                          Fruta
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
                          Edad
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
                    <div className='item-div item-div-cat' style={{ border: "none" }}>
                      <div className='content content-cat'>
                        <div>
                          Aparicion
                        </div>
                        <hr />
                      </div>
                    </div>
                  </div>
                  <div ref={parent}>
                    {siCheck.map((item, index) => (
                      <div className='item' key={item.label}>
                        {Object.entries(item).map(([key, val]) => (
                          key !== "label" && key !== "firstLetter"  && (
                            <div key={uuidv4()} className={checkValue(key, siCheck, index)}>
                              <div className="content">
                                {handleValues(key, val, item.label)}
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
