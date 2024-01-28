import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'black',
    border: '1px solid white',
    boxShadow: 10,
    p: 4,

};

const closeButtonStyle = {
    position: 'absolute',
    fontSize: '16px',
    top: 0,
    right: 0,
    color: 'white',
    cursor: 'pointer', // Añade un puntero para indicar que es interactivo
    padding: '12px', // Ajusta el padding según sea necesario
};

export default function BasicModal({ state, close }) {
    const handleClose = () => close();

    const data = [
        {
            "title": "Colores de Ocupacion",
            "body": <div className='cuadrado-father'>
                <div className='cuadrado-son'>
                    <div style={{ backgroundColor: "#03a721d2" }} className='cuadrado'></div>
                    <p>Correcto</p>
                </div>
                <div className='cuadrado-son'>
                    <div style={{ backgroundColor: "rgb(255 195 0 / 92%)" }} className='cuadrado'></div>
                    <p style={{ textAlign: "center" }}>Dos o Mas <br /> Coincidencias</p>
                </div>
                <div className='cuadrado-son'>
                    <div style={{ backgroundColor: "rgb(255 115 0)" }} className='cuadrado'></div>
                    <p style={{ textAlign: "center" }}>Una <br /> Coincidencia</p>
                </div>
                <div className='cuadrado-son'>
                    <div style={{ backgroundColor: "rgba(177, 3, 3, 0.808)" }} className='cuadrado'></div>
                    <p>Incorrecto</p>
                </div>
            </div>
        }
    ]

    return (
        <div>
            {state != 0 && (
                <Modal
                    open={state != 0}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div onClick={handleClose} style={closeButtonStyle}>
                            X
                        </div>
                        <Typography style={{ textAlign: "center" }} id="modal-modal-title" variant="h6" component="h2">
                            {data[state - 1].title}
                        </Typography>
                        {data[state - 1].body}
                    </Box>
                </Modal>
            )}
        </div>
    );
}