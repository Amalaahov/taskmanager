import { useEffect, useState } from "react";
import classes from "./MainPage.module.css";
import axios from "axios";
import { NavLink, } from "react-router-dom";
import styled from "styled-components";
import preloader from "../../assets/preloader.svg";
import { TaskType } from "../Types";
import { DragEvent } from "react";


type TaskColorType = {
  BackgroundColor?: any;
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
  box-shadow: 0 2px 20px rgba(90, 49, 100, 0.5);
  background: ${(props) => props.BackgroundColor};
`;
const getColor = (props: any) => {
  if (props < 0) {
    return "#DC143C";
  }
  if (props <= 3) {
    return "#FFFF00";
  }
}
const getDays = (date: Date) => {
  const today = new Date();
  const deadline = new Date(date);
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
  return Days;
}

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

  const initialDnDState = {
    draggedFrom: {} as TaskType,
    draggedTo: {} as TaskType,
    isDragging: false as boolean
  }

  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState)
  const OnStartFunction = (event: any, props: TaskType) => {
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

  function onOverFunction(event: any, item: TaskType) {
    event.preventDefault();
    const draggedFrom = dragAndDrop.draggedFrom;
    if (draggedFrom !== null) {
      const draggedTo = item
      if (draggedTo !== dragAndDrop.draggedTo) {
        setDragAndDrop({
          ...dragAndDrop,
          draggedTo: draggedTo
        })
      }
    }
  }

  const onDropFunction = (event: DragEvent<HTMLElement>) => {
    if (dragAndDrop.draggedFrom.Performed === dragAndDrop.draggedTo.Performed) {
      axios.put("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + dragAndDrop.draggedFrom.id, {
        Order: dragAndDrop.draggedTo.Order,
      }).then(() => {
        axios.put("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + dragAndDrop.draggedTo.id, {
          Order: dragAndDrop.draggedFrom.Order,
        }).then(() => {
          window.location.reload();
        });
      });
    }
    if (dragAndDrop.draggedFrom.Performed !== dragAndDrop.draggedTo.Performed) {
      axios.put("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + dragAndDrop.draggedFrom.id, {
        Performed: dragAndDrop.draggedTo.Performed,
      }).then(() => {
        window.location.reload();
      });
    }
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: {} as TaskType,
      draggedTo: {} as TaskType,
      isDragging: false
    });
  }

  const ActiveTaskLenght = tasks.filter((value) => !value.Performed);
  const taskMassive = tasks.sort((a, b) => a.Order < b.Order ? 1 : -1);
  const ActiveTask = taskMassive.sort((a, b) => a.Performed > b.Performed ? 1 : -1)
    .map((task) => (
      <div className={classes.Section}>
        <Section         
          onDragStart={(e) => OnStartFunction(e, task)}
          onDragLeave={onLeaveFunction}
          onDragOver={(e) => onOverFunction(e, task)}
          onDrop={(e) => onDropFunction(e)}
          draggable={true} BackgroundColor={task.Performed ? "grey" : getColor(getDays(task.Date))}>
          <div>
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
            <div className={classes.taskText}>Days left: {getDays(task.Date)}</div>
            <div>
              <NavLink to={"tasks/" + task.id}><Button>Open Task</Button> </NavLink>
            </div>
          </div>
        </Section>
      </div>
    ));

  return (
    <div className={classes.MainPage}>
      <div>
        <div className={classes.Greetings}>Task Manager</div>
        <div className={classes.Greetings2}>
          You've got {ActiveTaskLenght.length} active tasks
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

export default TaskList;
