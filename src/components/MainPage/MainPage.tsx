import { useEffect, useState } from "react";
import classes from "./MainPage.module.css";
import axios from "axios";
import { useHistory } from "react-router";
import styled from "styled-components";
import preloader from "../../assets/preloader.svg";
import engineLogo from "../../assets/engine.png";
import suspensionLogo from "../../assets/suspension.png";
import questionLogo from "../../assets/question.png";
import interiorLogo from "../../assets/interior.png";
import exteriorLogo from "../../assets/exterior.png";
import electronicLogo from "../../assets/electronic.png";
import { TaskType } from "../Types";
import { DragEvent } from "react";

type ActiveProps = {
  active?: boolean
}
type TaskColorType = {
  BackgroundColor?: any;
}
const Section = styled.section<TaskColorType>`
  color: white;
  border-radius: 20px;
  border: 0;
  padding: 10px;
  box-shadow: 0 2px 20px rgba(90, 49, 100, 0.5);
  background: ${(props) => props.BackgroundColor};
`
const Li = styled.li<ActiveProps>`
        background-color: ${(props) => props.active ? "black" : "white"};
        color: ${(props) => props.active ? "white" : "black"};
        display: inline;
        margin-right: 3px;
        padding: 7px 15px;
        border: solid 1px #24255f;
        border-radius: 5px;
        font-size: 12px;
    `
const getColor = (props: any) => {
  if (props < 0) {
    return "#DC143C";
  }
  if (props <= 3) {
    return "#FFFF00";
  }
}
const getDays = (date: Date) => {
  const Date1 = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  );
  const Date2 = new Date(
    new Date(date).getFullYear(),
    new Date(date).getMonth() + 1,
    new Date(date).getDate()
  );
  const Days = Math.floor(
    (Date2.getTime() - Date1.getTime()) / (1000 * 3600 * 24)
  );
  return Days;
}
const getCategory = (props: any) => {
  if (props === "Engine") {
    return engineLogo
  }
  if (props === "Suspension") {
    return suspensionLogo
  }
  if (props === "Interior") {
    return interiorLogo
  }
  if (props === "Exterior") {
    return exteriorLogo
  }
  if (props === "Electronic") {
    return electronicLogo
  }
  else {
    return questionLogo
  }
}
const TaskList = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loader, setLoader] = useState(true);
  const [tab, setTab] = useState<String>('All')
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
  const history = useHistory();
  const [dragAndDrop, setDragAndDrop] = useState(initialDnDState)
  const OnStartFunction = (event: any, props: TaskType) => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: props,
      isDragging: true,
    });
  }
  const onLeaveFunction = () => {
    setDragAndDrop({
      ...dragAndDrop,
      draggedTo: {} as TaskType
    });
  }
  const onOverFunction = (event: any, item: TaskType) => {
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
        Order: dragAndDrop.draggedTo.Order
      }).then(() => {
        axios.put("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + dragAndDrop.draggedTo.id, {
          Order: dragAndDrop.draggedFrom.Order
        }).then(() =>
          window.location.reload()
        )
      });
    }
    if (dragAndDrop.draggedFrom.Performed !== dragAndDrop.draggedTo.Performed) {
      axios.put("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + dragAndDrop.draggedFrom.id, {
        Performed: dragAndDrop.draggedTo.Performed,
      }).then(() => {
        window.location.reload();
      });
    }
  }
  const ActiveTaskLenght = tasks.filter((value) => !value.Performed);
  const taskMassive = tasks.sort((a, b) => a.Order > b.Order ? 1 : -1);
  const ActiveTask = taskMassive.filter(function (value) {
    return (tab === value.Category) || (tab === 'All')
  }).sort((a, b) => a.Performed > b.Performed ? 1 : -1)
    .map((task) => (
      <div className={classes.Section}>
        <Section onClick={() => history.push("/tasks/" + task.id)}
          onDragStart={(e) => OnStartFunction(e, task)}
          onDragLeave={onLeaveFunction}
          onDragOver={(e) => onOverFunction(e, task)}
          onDrop={(e) => onDropFunction(e)}
          draggable={true} BackgroundColor={task.Performed ? "grey" : getColor(getDays(task.Date))}>
          <div className={classes.sectionGrid} >
            <div className={classes.carName}>
              <div className={classes.taskHeader}>Vehicle:</div>
              {task.Car}
            </div>
            <div className={classes.taskText}>
              <div className={classes.taskHeader}>Task:</div>
              {task.Task}
            </div>
            <div className={classes.taskText}>Days left: {getDays(task.Date)}</div>
            <div><img src={getCategory(task.Category)} alt="engine" /></div>
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
          <div>
            <Li active={tab === 'All'} onClick={() => setTab('All')}>All</Li>
            <Li active={tab === 'Engine'} onClick={() => setTab('Engine')}>Engine</Li>
            <Li active={tab === 'Electronic'} onClick={() => setTab('Electronic')}>Electronic</Li>
            <Li active={tab === 'Exterior'} onClick={() => setTab('Exterior')}>Exterior</Li>
            <Li active={tab === 'Interior'} onClick={() => setTab('Interior')}>Interior</Li>
            <Li active={tab === 'Suspension'} onClick={() => setTab('Suspension')}>Suspension</Li>
          </div>
        </div>
        <div>{!loader && <div>{ActiveTask}</div>}</div>
      </div>
    </div>
  );
};

export default TaskList;
