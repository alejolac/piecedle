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
import Tooltip from '@mui/material/Tooltip';
import Button from "@mui/material/Button"

function App() {
  const [win, setWin] = useState(false)
  const [autoComplete, setAutoComplete] = useState(false)
  const [character, setCharacter] = useState(randomCharacter())
  const [noCheck, setNoCheck] = useState(Data.personajes)
  const [siCheck, setsiCheck] = useState([])
  const [parent, enableAnimations] = useAutoAnimate()
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event, newInputValue) => {
    setInputValue(newInputValue);
  };

  const handleOptionSelected = (event, value) => {
    // Llama a la función onSelect con el valor seleccionado
    //onSelect(value);
    // Reinicia el valor del input
    setInputValue('');
  };

  useEffect(() => {
  }, [siCheck])

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
      console.log(data == "recompensa");
      if (typeof(objValues) == "string" || typeof(characterValue) == "string") return "item-div item-div-error";
      return characterValue > objValues ? "item-div item-div-top item-div-error" : "item-div item-div-down item-div-error"
    }
    ////
    if (Array.isArray(characterValue) || Array.isArray(objValues)) {
      if (Array.isArray(characterValue) != Array.isArray(objValues)) {
        console.log("asd");
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
    console.log(objeto);
    return
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
              renderOption={(props, optioBrookn) => (
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
                    sx={{ width: 70, height: 70, border: '2px solid black' }}
                  />
                  <Typography>{option.label}</Typography>
                </Box>
              )}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField onBlur={() => setAutoComplete(false)} onClick={() => setAutoComplete(true)} variant="standard" {...params} label="Personajes" />}
            />
         <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={noCheck}
            getOptionLabel={(option) => option.label}
            inputValue={inputValue}
            onInputChange={handleInputChange}
            onChange={handleOptionSelected}
            isOptionEqualToValue={(option, value) => option.label === value.label || value === ''}
            renderOption={(props, option) => (
              <li {...props}>
                <Avatar
                  src={option.imagen}
                  alt={option.label}
                  sx={{ marginRight: 2, cursor: 'pointer' }}
                  onClick={() => onAvatarClick(option)}
                />
                {option.label}
              </li>
            )}
            sx={{ width: 300 }}
            renderInput={(params, option) => (
              <TextField
                {...params}
                label="Movie"
                InputProps={{
                  ...params.InputProps,
                  
                }}
                sx={{ cursor: 'pointer' }}
                onClick={() => handleState(option)}
              />
            )}          />
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
                          key !== "label" && (
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
