import React from 'react';
import { TareaContext } from '../TareaContext';
import './Contador.css'

function Contador({ total, completed }) {
    const { totalTareas, completedTareas } = React.useContext(TareaContext);

  return (
    <h2 className="Contador">Has completado {completedTareas} de {totalTareas} tareas</h2>
  );
}

export {Contador};
