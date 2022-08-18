import React from 'react';
import { TareaContext } from '../TareaContext';
import './Buscador.css'

function Buscador() {
  const { searchValue, setSearchValue } = React.useContext(TareaContext);
  const onSearchValueChange = (event) => {
    console.log(event.target.value);
    setSearchValue(event.target.value);
  };

  return (
    <input
      className="Buscador"
      placeholder="Buscar ..."
      value={searchValue}
      onChange={onSearchValueChange}
    />
  );
}


export {Buscador};
