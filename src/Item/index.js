import React from 'react';
import './Item.css'

function Item(props){
  
  return(
    <li className="Item">
   <span
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete}
      >
        √
      </span>
      <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>
        {props.text}
      </p>
      <span
        className="Icon Icon-delete"
        onClick={props.onDelete}
      >
      <img src="https://img.icons8.com/color/48/000000/trash--v1.png"/>
      </span>
    </li>
  );

}

export {Item};
