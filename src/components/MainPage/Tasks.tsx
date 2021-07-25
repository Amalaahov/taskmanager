import { useEffect, useState, ChangeEvent } from 'react';
import axios from "axios";
import classes from "./MainPage.module.css";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useHistory } from 'react-router-dom';

const Input = styled.input.attrs(props => ({
  type: "text",
  size: props.size || "1em",
}))`
    color: solid black;
    font-size: 1em;
    border: 0px solid black;
    border-radius: 10px;
    background-color: #f4f4f4;
    width: 70%;
    margin: ${props => props.size};
    padding: 10px;
  `;

const Button = styled.button`
  background: black;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 10px;
`
const DeleteButton = styled.button`
  background: red;
  color: black;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 10px;
`
const Section = styled.section`
color: black;
border-radius: 20px;
border: 0px solid black;
padding: 10px;
box-shadow: 0px 1px 20px rgba(90, 49, 100, 0.226972);
background: white;
`

const Tasks = (props: any) => {
  let history=useHistory();
  type TaskType = {
    Task: string
    Description: string
    Date: string
    Car: string
    id: string
    Performed: boolean
  }
  const [editMode, setEditMode] = useState(false);
  const [TaskForm, setTaskText] = useState<TaskType>({ Task: '', Description: '', Date: '', Car: '', id: '', Performed: false});
  
  useEffect(() => {
    axios.get<TaskType>('https://60f53a592208920017f39f9d.mockapi.io/tasks/' + props.id).then(response => {
      setTaskText(response.data);
    })
  }, [])
const deactivateEditModeWithoutPut = () =>
{
  setEditMode(false);
}
  const activateEditMode = () => {
    setEditMode(true);
  }
  const setActive = () =>
  {
    axios.put('https://60f53a592208920017f39f9d.mockapi.io/tasks/' + props.id, {Performed:false});     
    return history.push('/mainpage');
  }
  const setPerform = () => {
    axios.put('https://60f53a592208920017f39f9d.mockapi.io/tasks/' + props.id, {Performed:true});
    return history.push('/mainpage');
  }
  const taskNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskText((prev) => ({ ...prev, Task: e.target.value }));
  }
  const taskCarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskText((prev) => ({ ...prev, Car: e.target.value }));
  }
  const DateChange = (date: Date | [Date, Date] | null) => {
    setTaskText((prev) => ({ ...prev, Date: String(date) }));
  }
  const taskDescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskText((prev) => ({ ...prev, Description: e.target.value }));
  }
  const deactivateEditMode = () => {
    axios.put('https://60f53a592208920017f39f9d.mockapi.io/tasks/' + props.id, TaskForm);
    setEditMode(false);
  }
  const deleteItem = () => {
    axios.delete('https://60f53a592208920017f39f9d.mockapi.io/tasks/' + props.id);
  }
const deadline = new Date (TaskForm.Date);

  return (
    <div className={classes.Mainpage}>
      <Section>
        <div className={classes.taskHeader}>Vehicle Name:</div>
        <div>{!editMode && <div className={classes.carName}>{TaskForm.Car}</div>}
        {editMode && <div> <Input onChange={taskCarChange} value={TaskForm.Car} placeholder="Название машины" /></div>}  </div>
        <div className={classes.taskHeader}>Task:</div>
        {!editMode && <div className={classes.carName}>{TaskForm.Task}</div>}
        {editMode && <div><Input onChange={taskNameChange} value={TaskForm.Task} /></div>}
        <div><hr></hr></div>
        <div className={classes.taskHeader}>Description</div>
        {!editMode && <div>{TaskForm.Description}</div>}
        {editMode && <div><Input onChange={taskDescriptionChange} value={TaskForm.Description} placeholder="Название машины" /></div>}
        <div className={classes.taskHeader}>Deadline</div>
        {!editMode && <div>{deadline.getDate()}.{deadline.getMonth()+1}.{deadline.getFullYear()}</div>}
        {editMode && <div> <DatePicker
              placeholderText='Date'
              value={TaskForm.Date}
              onChange={DateChange}
              className={classes.datePicker}
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="d MMMM yyyy, HH:mm:ss"
            /> </div>}
        {!editMode && <div><Button onClick={activateEditMode}>Edit Task</Button>
        {! TaskForm.Performed && <Button onClick={setPerform}>Task completed</Button>}
        { TaskForm.Performed && <Button onClick={setActive}>Activate Task</Button>}
        </div>}
        {editMode && <div><Button onClick={deactivateEditMode}>Save Changes</Button><Button onClick={deactivateEditModeWithoutPut}>Back</Button>
        <DeleteButton onClick={deleteItem}>Delete</DeleteButton></div>}
      </Section>
    </div>
  )
}
export default Tasks;