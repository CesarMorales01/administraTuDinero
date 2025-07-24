import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';

function BotonGastoFlotante({ colorFondo="green", onClick }) {
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 26, // Espacio desde abajo
        right: 26, // Espacio desde la derecha
        zIndex: 1000, // Asegura que esté por encima de otros elementos
      }}
    >
      <Tooltip title="Registrar nuevo gasto" placement="left">
        <Fab style={{backgroundColor: colorFondo}} aria-label="add" onClick={onClick}>
          <AddIcon style={{color: 'white'}}/>
        </Fab>
      </Tooltip>
    </Box>
  );
}

export default BotonGastoFlotante;