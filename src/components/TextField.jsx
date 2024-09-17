import React from 'react'
import "../Styles/TextField.css"

const TextField = ({type , placeholder,classNames,onChange,name,value ,style}) => {
  return (
    <>
      <input type={type} placeholder={placeholder} value={value} className={classNames} style={style} onChange = {onChange} name = {name} />
    </>
      
  )
}

export default TextField