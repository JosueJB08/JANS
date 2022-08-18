import React from 'react';
import { useLocalStorage } from './useLocalStorage';

const TareaContext = React.createContext();

function TareaProvider(props) {
  const {
    item: tareas,
    saveItem: saveTareas,
    loading,
    error,
  } = useLocalStorage('TAREAS_V1', []);
  const [searchValue, setSearchValue] = React.useState('');
  const [openModal, setOpenModal] = React.useState(false);

  const completedTareas = tareas.filter(tarea => !!tarea.completed).length;
  const totalTareas = tareas.length;

  let searchedTareas = [];

  if (!searchValue.length >= 1) {
    searchedTareas = tareas;
  } else {
    searchedTareas = tareas.filter(tarea => {
      const tareaText = tarea.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return tareaText.includes(searchText);
    });
  }

const addTarea= (text) => {
    const newTareas = [...tareas];
    newTareas.push({
      completed:false,
      text,
    });
    saveTareas(newTareas);
  };
  
  const completeTarea = (text) => {
    const tareaIndex = tareas.findIndex(tarea => tarea.text === text);
    const newTareas = [...tareas];
    newTareas[tareaIndex].completed = true;
    saveTareas(newTareas);
  };

  const deleteTarea = (text) => {
    const tareaIndex = tareas.findIndex(tarea => tarea.text === text);
    const newTareas = [...tareas];
    newTareas.splice(tareaIndex, 1);
    saveTareas(newTareas);
  };
  
  return (
    <TareaContext.Provider value={{
      loading,
      error,
      totalTareas,
      completedTareas,
      searchValue,
      setSearchValue,
      searchedTareas,
      completeTarea,
      deleteTarea,
      addTarea,
      openModal,
      setOpenModal,
    }}>
      {props.children}
    </TareaContext.Provider>
  );
}

export { TareaContext, TareaProvider };
