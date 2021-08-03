import { useEffect, useState } from "react";
import classes from "./MainPage.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import preloader from "../../assets/preloader.svg";
import ModalWindow from "./Modal";
import { TaskType } from "../Types";
import { DragEvent } from "react";

type TaskColorType = {
  BackgroundColor?: any;
  BorderRadius?: any;
};

const Button = styled.button`
  background: black;
  color: white;
  font-size: 1em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 10px;
`;
const Section = styled.section<TaskColorType>`
  color: white;
  border-radius: 20px;
  border: 0;
  padding: 10px;
  box-shadow: 0 2px 20px ${(props) => props.BorderRadius};
  background: ${(props) => props.BackgroundColor};
`;

 

const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loader, setLoader] = useState(true);
 

  useEffect(() => {
    axios
      .get<TaskType[]>("https://60f53a592208920017f39f9d.mockapi.io/tasks")
      .then((response) => {
        setTasks(response.data);
        setLoader(false);
      });
  }, []);

  const taskMassive = tasks.sort(
    (a, b) => Number(new Date(a.Date)) - Number(new Date(b.Date))
  );
  const today = new Date();
  const deadline = new Date();
  const Date1 = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  const Date2 = new Date(
    deadline.getFullYear(),
    deadline.getMonth() + 1,
    deadline.getDate()
  );
  const Days = Math.floor(
    (Date2.getTime() - Date1.getTime()) / (1000 * 3600 * 24)
  );
  const [SectionColor, setSectionColor] = useState("white");
  const [modalWindows, setModalWindow] = useState(false);
  //  const [currentCard, SetCurrentCard] = useState();


    

        
 
  const [taskBorder, setTaskBorder] = useState('rgba(90, 49, 100, 0.5)');
  const initialDnDState = {
    draggedFrom: {} as TaskType,
    draggedTo: {} as TaskType,
    isDragging: false as boolean
}

const [dragAndDrop, setDragAndDrop] = useState(initialDnDState)
let currentCard;
let dropCard;
 const OnStartFunction=(event: any, props: TaskType)=> {
 
 currentCard=props;
  setDragAndDrop({
    ...dragAndDrop,
    draggedFrom: props,
    isDragging: true,
});
    
  
 
  }
  function onLeaveFunction() {
  
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: {} as TaskType
  });
    

  }
  function onOverFunction(event:any, item:TaskType) {

    event.preventDefault();


    // index of the item being dragged
    const draggedFrom = dragAndDrop.draggedFrom;

    if(draggedFrom !== null) {

        const draggedTo = item

        if (draggedTo !== dragAndDrop.draggedTo){
            setDragAndDrop({
                ...dragAndDrop,
                draggedTo: draggedTo
            })
        }
    }

  }
  const onDropFunction = (event: DragEvent<HTMLElement>) => {
  
  console.log(dragAndDrop);
    if(dragAndDrop.draggedFrom.Performed !== dragAndDrop.draggedTo.Performed)
    {

    axios.put("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + dragAndDrop.draggedFrom.id, {
    Performed: dragAndDrop.draggedTo.Performed,
    });
    }

    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: {} as TaskType,
      draggedTo: {} as TaskType,
      isDragging: false
  });
    

  }

  const ActiveTask = taskMassive.sort((a, b) => a.Order > b.Order ? 1 : -1)
    .map((task) =>(
      
      <div className={classes.Section}>

      <Section
        onDragStart={(e) =>OnStartFunction(e, task)}
        onDragLeave={onLeaveFunction}
        onDragOver={(e) => onOverFunction(e, task)}
        onDrop={(e) => onDropFunction(e)}
        draggable={true} BorderRadius={taskBorder} BackgroundColor={SectionColor}>
        <div>
          <ModalWindow
            id={task.id}
            setActive={setModalWindow}
            isOpened={modalWindows}
          />
          <div className={classes.carName}>
            <div className={classes.taskHeader}>Vehicle:</div>
            {task.Car}
          </div>
          <div className={classes.taskText}>
            <div className={classes.taskHeader}>Task:</div>
            {task.Task}
          </div>
          <div>
            <hr></hr>
          </div>
          <div className={classes.taskText}>Days left: {Days}</div>
          <div>
            <NavLink to={"tasks/" + task.id}>
              <Button>Open Task</Button>
            </NavLink>
            <Button onClick={() => setModalWindow(true)}>Delete Task</Button>
          </div>
        </div>
      </Section>

      <div></div>
    </div>
    ));
 

  return (
    <div className={classes.MainPage}>
      <div>
        <div className={classes.Greetings}>Hello, Wh0am1!</div>
        <div className={classes.Greetings2}>
          You've got {ActiveTask.length} active tasks
          {loader && (
            <span>
              <img src={preloader} alt="preloader" />
            </span>
          )}
        </div>
        <div>{!loader && <div>{ActiveTask}</div>}</div>
        
      </div>
    </div>
  );
};


const TaskItem = ({ task }: { task: TaskType }) => {
  const today = new Date();
  const deadline = new Date(task.Date);
  const Date1 = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );
  const Date2 = new Date(
    deadline.getFullYear(),
    deadline.getMonth() + 1,
    deadline.getDate()
  );
  const Days = Math.floor(
    (Date2.getTime() - Date1.getTime()) / (1000 * 3600 * 24)
  );
  const [SectionColor, setSectionColor] = useState("white");
  const [modalWindows, setModalWindow] = useState(false);
  //  const [currentCard, SetCurrentCard] = useState();


 
  const [taskBorder, setTaskBorder] = useState('rgba(90, 49, 100, 0.5)');
let ItemTask:any;
let ItemTask2:any;
 function OnStartFunction(event: any, props: TaskType) {
 ItemTask=props;
    
  
    console.log('From', ItemTask,'To', ItemTask2);
    return ItemTask;
  }
  function onLeaveFunction(event: DragEvent<HTMLElement>) {
    setTaskBorder('rgba(90, 49, 100, 0.5)');
  
    

  }
  function onOverFunction(event: DragEvent<HTMLElement>) {
    event.preventDefault();
    setTaskBorder('red');
   

  }
  const onDropFunction = (event: DragEvent<HTMLElement>) => {
    ItemTask2=task;
    event.preventDefault();
    setTaskBorder('rgba(90, 49, 100, 0.5)');
   
    console.log('From', ItemTask,'To', ItemTask2);

    //axios.put("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + currentCard, {
    // Performed: task.Performed,
    //});
  }

  useEffect(() => {
    if (task.Performed) {
      setSectionColor("grey");
    } else if (Days < 0) {
      setSectionColor("#DC143C");
    } else if (Days <= 3) {
      setSectionColor("#FFFF00");
    }
  }, [Days]);

  return (
    
    <div className={classes.Section}>

      <Section
        onDragStart={(e) =>OnStartFunction(e, task)}
        onDragLeave={(e) => onLeaveFunction(e)}
        onDragOver={(e) => onOverFunction(e)}
        onDrop={(e) => onDropFunction(e)}
        draggable={true} BorderRadius={taskBorder} BackgroundColor={SectionColor}>
        <div>
          <ModalWindow
            id={task.id}
            setActive={setModalWindow}
            isOpened={modalWindows}
          />
          <div className={classes.carName}>
            <div className={classes.taskHeader}>Vehicle:</div>
            {task.Car}
          </div>
          <div className={classes.taskText}>
            <div className={classes.taskHeader}>Task:</div>
            {task.Task}
          </div>
          <div>
            <hr></hr>
          </div>
          <div className={classes.taskText}>Days left: {Days}</div>
          <div>
            <NavLink to={"tasks/" + task.id}>
              <Button>Open Task</Button>
            </NavLink>
            <Button onClick={() => setModalWindow(true)}>Delete Task</Button>
          </div>
        </div>
      </Section>

      <div></div>
    </div>
  );
};

export default TaskList;
