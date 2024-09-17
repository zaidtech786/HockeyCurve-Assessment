import React, { useContext, useState } from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import "../Styles/Card.css"
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../GlobalState/Context';
import { format } from 'date-fns';

const Card = ({data}) => {
  const [selected,setSelected] = useState(null);
  const navigate = useNavigate()
  const {dispatch,isOn} = useContext(AppContext)
  const dateTimeStr = data?.dateTime;
  const formattedDateTime = format(new Date(dateTimeStr), "dd MMM yyyy - hh:mm a");
  console.log(formattedDateTime);


  const toggle = (id) => {
      if(selected == id){
        return setSelected(null)
      }
      setSelected(id)
  }

  const Edit = (id) => {
    console.log(id)
    const data = {id}
    navigate("/task",{
      state:data
    });
  }
  const deleteTask = (id) => {
    dispatch({type:"DELETE_TASK",payload:{id:id}})
  }

  const getColor = () => {
     if(data.priority === "High")
       return "red";
      else if(data.priority === "Low")
        return "blue"
      else 
        return "orange"
  }
  const bgColor = getColor();

  return (
    <>
    <div className={isOn ? "card on" : 'card'} onClick = {() => toggle(data.id)} >
        <div style={{display:"flex",flexDirection:"row"}}>
          {
             selected == data?.id 
             ? 
             <ExpandMoreRoundedIcon style={{cursor:"pointer",color:"darkgreen"}} onClick = {() => toggle(data.id)}/>
             :
             <PlayArrowIcon style={{cursor:"pointer",color:"darkgreen"}} onClick = {() => toggle(data.id)}/>
          }

        <div style={{display:"flex",flexDirection:"column"}}>
        <span className={isOn ? "taskName on" : 'taskName'}> {data?.taskName}</span>
        <p>Due Date : {formattedDateTime} </p>
        </div>
        </div>
        <div>

          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"5px"}}>
            <h3>{data?.priority} </h3>
            <p style={{width:"20px",height:"20px", backgroundColor:bgColor,borderRadius:"50%"}}></p>
          </div>
           
        </div>
    </div>

    {
      selected == data?.id
      &&
    <div  className='data'>
        <span className={isOn ? "desc on" : 'desc'}>Description :</span>
        <span className={isOn ? "desc on" : 'desc'}>{data?.desc}</span>
        <p className={isOn ? "dueDate on" : "dueDate" }> <span className={isOn ? "desc on" : "desc" }>Due Date :</span> {formattedDateTime} </p>

        <div className="btnGroup" style={{marginTop:"1rem",justifyContent:"flex-start"}}>
              <Button
                text={"Edit"}
                classNames={"commonBtn"}
                onClick={() => Edit(data?.id)}
              />
              <Button text={"Delete"} classNames={"commonBtn"} onClick={() =>deleteTask(data?.id)}/>
            </div>


    </div>

    
    }
    </>
  )
}

export default Card