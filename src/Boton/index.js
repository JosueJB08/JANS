import React from 'react';
import './boton.css';

function Boton(props) {
  const onClickButton = () => {
    props.setOpenModal(prevState => !prevState);
  };
  
  return (
    <button
      className="Boton"
      onClick={onClickButton}
    >
      +
    </button>
  );
}

export { Boton };
