import React from 'react';
import { TareaContext } from '../TareaContext';
import './formulario.css';

function Formulario() {
  const [newTareaValue, setNewTareaValue] = React.useState('');
  const {
    addTarea,
    setOpenModal,
  } = React.useContext(TareaContext);
  
  const onChange = (event) => {
    setNewTareaValue(event.target.value);
  };
  const onCancel = () => {
    setOpenModal(false);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    addTarea(newTareaValue);
    setOpenModal(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <label>Añade una nueva tarea</label>
      <textarea
        value={newTareaValue}
        onChange={onChange}
        placeholder="Ingresa aquí tu nueva tarea"
      />
      <div className="Form-buttonContenedor">
        <button
          type="button"
          className="form-boton form-boton-cancelar"
          onClick={onCancel}
          >
          Cancelar
        </button>
        <button
          type="submit"
          className="form-boton form-boton-add "
        >
          Añadir
        </button>
      </div>
    </form>
  );
}

export {Formulario };