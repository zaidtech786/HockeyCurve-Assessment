import React from 'react'
import "../Styles/Button.css"


const Button = ({text,icon,classNames,onClick }) => {
  return (
   <>
   <div className='btnCont'>
    {
        icon &&
        <span className='plusIcon'>{icon}</span>
    }
     <button className={classNames} onClick = {onClick} > {text}</button>
   </div>
   </>
  )
}

export default Button