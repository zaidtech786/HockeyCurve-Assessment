import React, { useContext, useEffect, useState } from "react";
import "../Styles/Task.css";
import Button from "../components/Button";
import TextField from "../components/TextField";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../GlobalState/Context.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {nanoid} from "nanoid";
import {handleToastNotification} from "../Toast.js";
import { DropDown } from "../components/Dropdown.jsx";


const Addtask = () => {
  const location = useLocation();
  const state = useContext(AppContext);
  const { dispatch ,isOn} = useContext(AppContext);
  const [priority, setPriority] = useState("");
  const navigate = useNavigate();

  const id = location.state || {};
  const findTask = state?.tasks?.find( (task) => task.id == id.id);

  console.log("Id :",id.id)
  const [inputs, setInputs] = useState({
    id:findTask?.id || "",
    taskName: findTask?.taskName || "",
    desc: findTask?.desc || "",
    dateTime: findTask?.dateTime || "",
    priority:findTask?.priority || ""
  });

  useEffect( () => {
     setInputs(findTask)
  },[id?.id])

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const isDateValid = (date) => {
    const now = new Date();
    const inputDate = new Date(date);
    return inputDate >= now; // Ensure date is today or future
  };

  const Addtask = () => {
    console.log(inputs)
    if (  //Checking if user filled all the inputs or not
      !inputs?.taskName ||
      !inputs?.desc ||
      !inputs?.dateTime ||
      !inputs.priority
    )
      return handleToastNotification(navigate,"All Fields are required","error");

      if (!isDateValid(inputs.dateTime)) {
         handleToastNotification(navigate,"Date and time must be today or a future date","error")
         return
      }

      const isDuplicate = state.tasks.some(
        (task) => task.taskName.toLowerCase() === inputs.taskName.toLowerCase() && task.id !== inputs.taskName.id
      );
      if (isDuplicate) {
        return handleToastNotification(navigate,"Task title must be unique","error")
      }

      const data = {
        id:nanoid(),
        taskName : inputs.taskName,
        desc:inputs.desc,
        dateTime:inputs.dateTime,
        priority:inputs.priority,
        isCompleted:false
      }
    dispatch({ type: "ADD_TASK", payload: data });
    setTimeout(() => {
      navigate("/");
    }, 1000);
    handleToastNotification(navigate,"Task Added Successfully","success")
  };

  // Delete Task
  const deleteTask = () => {
    dispatch({type:"DELETE_TASK",payload:{id:id.id}});
    setTimeout(() => {
      navigate("/");
    }, 1000);
    handleToastNotification(navigate,"Task Deleted Successfully","success")
  }

// Edit Task 
  const EditTask = () => {
    dispatch({type:"EDIT_TASK",payload:{id:id.id,...inputs}})
    setTimeout(() => {
      navigate("/");
    }, 1000);
    handleToastNotification(navigate,"Task Updated Successfully","success")
  }

//Complete/Done Task Functionality
  const completeTask = () => {
    dispatch({type:"COMPLETE_TASK",payload:{id:id.id}})
    setTimeout(() => {
      navigate("/");
    }, 1000);
    handleToastNotification(navigate,"Task Completed Successfully","success")
  }

  const options = [
    { label: 'Low', color: 'blue' },
    { label: 'Medium', color: 'orange' },
    { label: 'High', color: 'red' },
  ];
  
  const handlePriority = (option) => {
    // setPriority(option.label);
    setInputs({...inputs,priority:option.label})
  }

  const SnoozeTask = () => {
    const getTodo = state.tasks.find((todo) => todo.id === id.id);
    
    if (getTodo) {
      const currentDate = new Date(getTodo.dateTime);
      // Add 2 days to the current dateTime
      currentDate.setDate(currentDate.getDate() + 2);
      // Format the date back to "YYYY-MM-DDTHH:mm"
      const updatedDateTime = currentDate.toISOString().slice(0, 16);
      // Update the task with the new snoozed dateTime
      const updatedTodo = { ...getTodo, dateTime: updatedDateTime };
      handleToastNotification(navigate,"Updated Task with Snoozed DateTime","success")
      dispatch({ type: "EDIT_TASK", payload: {id:id.id , ...updatedTodo} });
    }
};

  return (
    <>
      <div className="taskWrapper">
        <ToastContainer autoClose={1000} />
        <div className={isOn ? "taskContainer on" : "taskContainer"}>
          <div className="upperSection">
            <h1 style={{ fontSize: "22px" }}>
              {id.id ? "Edit Task" : "Add New Task"}
            </h1>
            <Button text={"Delete"} classNames={"deleteBtn"} onClick={() => deleteTask()} />
          </div>

          <div className="formContainer">
            <form>
              <TextField
                type={"text"}
                placeholder={"Task Name"}
                classNames={"input"}
                name="taskName"
                value={inputs?.taskName}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                type={"text"}
                placeholder={"Task Desc"}
                classNames={"input"}
                name="desc"
                value={inputs?.desc}
                onChange={(e) => handleChange(e)}
              />
              <TextField
                type={"datetime-local"}
                placeholder={""}
                classNames={"input"}
                value={inputs?.dateTime}
                name="dateTime"
                onChange={(e) => handleChange(e)}
              />

            <DropDown options={options} onChange={handlePriority}  value={inputs?.priority} />  
            </form>

            <div className="btnGroup">
            {
              id.id
              ?
              <>
              <Button
                text={"Save Changes"}
                classNames={"commonBtn"}
                onClick={() => EditTask()}
              />
              <Button text={"Mark as done"} classNames={"commonBtn"} onClick={() => completeTask()}/>
              <Button text={"Snooze"} onClick={() => SnoozeTask()} classNames={"commonBtn"}  />
              <Button text={"Cancel"} onClick={() => navigate("/")} classNames={"commonBtn"}  />
              </>
            :
          <>
            <Button
              text={"Add Task"}
              classNames={"commonBtn"}
              onClick={() => Addtask()}
            />
            <Button text={"cancel"} onClick={() => navigate("/")} classNames={"commonBtn"} />
            </>
            }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Addtask;
