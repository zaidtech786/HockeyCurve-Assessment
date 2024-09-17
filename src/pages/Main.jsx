import React, { useContext, useEffect, useState } from 'react'
import "../Styles/Main.css"
import Button from '../components/Button';
import AddIcon from '@mui/icons-material/Add';
import Card from "../components/Card.jsx"
import { Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../GlobalState/Context.jsx';
import TextField from '../components/TextField.jsx';
import TogglerSwitch from '../components/Toggler.jsx';



const Main = () => {
    const state = useContext(AppContext);
    const [searchInput,setSearchInput] = useState("");
    const [selected,setSelected] = useState('All')
    const navigate = useNavigate()
    const [filterData,setFilterData] = useState(state.tasks)
    const categories = ['All','High','Medium','Low','Done'];
    const {isOn} = useContext(AppContext)

    useEffect( () => {
      setFilterData(state.tasks)   // Update filteredData when user delete any todo
    },[state.tasks])


    const filterByPriority = (priority) => {
        setSelected(priority);
        if(priority == 'All')
            return setFilterData(state.tasks)
        if(priority == "Done"){
            const completedTask = state.tasks.filter( task => task.isCompleted);
           return setFilterData(completedTask)
        }
        const data = state.tasks.filter( task => task.priority === priority);
        setFilterData(data)
    }

    // Searching on a separate categories
    const handleSearch = (e) => {
      let value = e.target.value.trim();
      setSearchInput(value);

      let filteredTasks;
      if (selected === 'All') {
          filteredTasks = state.tasks;
      } else if (selected === 'Done') {
          filteredTasks = state.tasks.filter(task => task.isCompleted);
      } else {
          filteredTasks = state.tasks.filter(task => task.priority === selected);
      }

      const searchFilteredTasks = filteredTasks.filter(task =>
          task.taskName.toLowerCase().includes(value.toLowerCase())
      );

      setFilterData(searchFilteredTasks);
  };

  return (
    <>
      <div className="wrapper">
     <div className={isOn ?"container on" : "container" }>
         <div className={isOn ? "topSection on" : "topSection"}>
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <Button icon = {<AddIcon/>} text = {"Add New Task"} classNames = {"addTextBtn"} onClick={() =>navigate("/task") }/>
          <TogglerSwitch/>
          </div>
               {/* Mapping Buttons */}
               <div className="btnsCategories">
               {
                categories?.map( (item) => {
                    return <Button text = {item} classNames = {selected == item ? "categoryBtn active" : "categoryBtn" } onClick={() => filterByPriority(item)}/>
                })
               }
               </div>
               
               {/* Search TextInput */}
               <div style={{marginTop:"1rem"}}>
                   <TextField type={"text"} placeholder={"Search here..."} value={searchInput} classNames={"input"} style={{padding:"1rem"}} onChange={(e) => handleSearch(e)} />
               </div>
         </div>
           
           {/* Mapping Todos */}
         <div className='CardContainer'>
             {
                filterData?.length > 0 
                ?
                filterData?.map( (item , idx) => {
                    return <Card key = {idx} data = {item} />
                })
                :
                <h1 style={{textAlign:"center",color:isOn ? "#fff" : "#000"}}>No Data !</h1 >
             }
         </div>
         

     </div>
   
      </div>
    </>
  )
}

export default Main