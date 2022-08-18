import React from 'react';
import { TareaContext } from '../TareaContext';
import {Contador} from '../Contador'
import {Buscador} from '../Buscador'
import {Lista} from '../Lista'
import {Boton} from '../Boton'
import {Item} from '../Item'
import {Formulario} from '../Formulario'
import { Modal } from '../Modal';

function AppUI() {
  const {
    error,
    loading,
    searchedTareas,
    completeTarea,
    deleteTarea,
    openModal,
    setOpenModal,
  } = React.useContext(TareaContext);
  
  return (
    <React.Fragment>
      <Contador/>
      <Buscador />

      <Lista>
        {error && <p>Errores  en la aplicación</p>}
        {loading && <p>Cargando ...</p>}
        {(!loading && !searchedTareas.length) && <p>¡Crea tu primer Tarea!</p>}
        
        {searchedTareas.map(tarea => (
          <Item
            key={tarea.text}
            text={tarea.text}
            completed={tarea.completed}
            onComplete={() => completeTarea(tarea.text)}
            onDelete={() => deleteTarea(tarea.text)}
          />
        ))}
      </Lista>


      {!!openModal && (
        <Modal>
         <Formulario/>
        </Modal>
      )}

      <Boton
        setOpenModal={setOpenModal}
      />
    </React.Fragment>
  );
}

export { AppUI };
