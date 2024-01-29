import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Data from "./assets/data.jsx"
import { v4 as uuidv4 } from 'uuid';
import { useAutoAnimate } from '@formkit/auto-animate/react'

// React UI
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import Avatar from "@mui/material/Avatar"
import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip';
import Modal from "./components/modal.jsx"
import HelpSharpIcon from '@mui/icons-material/HelpSharp';

import confetti from 'canvas-confetti';

function App() {
  const [win, setWin] = useState(true)
  const [character, setCharacter] = useState(null)
  const [noCheck, setNoCheck] = useState(sortCharacters())
  const [siCheck, setsiCheck] = useState([])
  const [parent, enableAnimations] = useAutoAnimate()
  const [value, setValue] = useState(null);
  const [data, setData] = useState(null);
  const [modalState, setModalState] = useState(false)

  useEffect(() => {
    if (!win) confetti()
  }, [win])

  useEffect(() => {
    if (value != null) setValue("")
  }, [data])

  useEffect(() => {
    setCharacter(randomCharacter())
  }, [])

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
    const randomId = Math.floor(Math.random() * Data.personajes.length) + 1;
    const randomCharacter = Data.personajes.find(character => character.id === randomId);

    return randomCharacter;
  }

  const closeModal = () => {
    setModalState(false)
  }

  const rewardCh = (val) => {
    if (val >= 1000000) {
      return (val / 1000000).toFixed(0) + 'M';
    }
    else if (val >= 1000) {
      return (val / 1000).toFixed(0) + 'K';
    }
    else {
      return val
    }
  }

  function checkValue(data, obj, index) {
    let characterValue = character[data];
    let objValues = obj[index][data];

    if (data == "recompensa") {
      if (characterValue >= 1000000) {
        characterValue = Math.floor(characterValue / 1000000);
      } else if (characterValue >= 1000) {
        characterValue = Math.floor(characterValue / 1000);
      }

      if (objValues >= 1000000) {
        objValues = Math.floor(objValues / 1000000);
      } else if (objValues >= 1000) {
        objValues = Math.floor(objValues / 1000);
      }
    }

    if (data == "imagen") return "item-div"
    ////
    if (objValues == characterValue) return "item-div item-div-success"
    if (data == "ocupacion") {
      if (characterValue.every(ocupacion => objValues.includes(ocupacion))) return "item-div item-div-success"
    }
    ////
    if (data == "recompensa" || data == "edad" || data == "aparicion") {
      //console.log(data ,characterValue, objValues);
      if (typeof (objValues) == "string" || typeof (characterValue) == "string") return "item-div item-div-error";
      return characterValue > objValues ? "item-div item-div-top item-div-error" : "item-div item-div-down item-div-error"
    }
    ////
    if (Array.isArray(characterValue) || Array.isArray(objValues)) {
      if (Array.isArray(characterValue) !== Array.isArray(objValues)) {
        Array.isArray(characterValue) ? (objValues = [objValues]) : (characterValue = [characterValue]);
      }
      const numberOfCommonValues = objValues
        .flat()
        .filter((val) => (Array.isArray(characterValue) ? characterValue.flat().includes(val) : characterValue.includes(val)))
        .length;
      if (numberOfCommonValues === 1) {
        return "item-div item-div-regular";
      } else if (numberOfCommonValues >= 2) {
        return "item-div item-div-regular-2";
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

    if (key === "recompensa") {
      return (
        <p>
          {rewardCh(val)}
        </p>
      )
    }

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
    if (!objeto) {
      console.error("Objeto no definido");
      return;
    }
    if (!siCheck.some(item => item.label === objeto.label)) {
      const newSi = [...siCheck];
      const newNo = noCheck.filter(item => item.label !== objeto.label);
      newSi.unshift(objeto);

      setNoCheck(newNo);
      setsiCheck(newSi);

      objeto.label === character.label ? setWin(false) : setWin(true);
      setData(objeto);
    }
  }

  const handleChange = useCallback((event, value) => {
    setValue(value);
    handleState(value);
  }, [handleState]);

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
                  options={noCheck.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                  id="combo-box-demo"
                  groupBy={(option) => option.firstLetter}
                  value={value}
                  noOptionsText={"No se a encontrado ese Personaje"}
                  onChange={handleChange}
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
                          key !== "label" && key !== "firstLetter" && key !== "id" && (
                            <div key={uuidv4()} className={checkValue(key, siCheck, index)}>
                              <div className="content">
                                {handleValues(key, val, item.label)}
                              </div>
                              {key == "ocupacion" && index == 0 && (
                                <div onClick={() => setModalState(1)} className="corner-element"><HelpSharpIcon /></div>
                              )}
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
      <div>
        <Modal close={closeModal} state={modalState} />
      </div>
    </>
  )
}

export default App
