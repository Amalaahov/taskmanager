import { Fragment, useEffect, useState } from 'react';
import classes from "./MainPage.module.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import preloader from "../../assets/preloader.svg";


type TaskColorType =
    {
        BackgroundColor?: any
    }

const Button = styled.button`
  background: black;
  color: white;
  font-size: 1em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 10px;
`
const Section = styled.section<TaskColorType>`
color: white;
border-radius: 20px;
border: 0px solid black;
padding: 10px;
box-shadow: 0px 1px 20px rgba(90, 49, 100, 0.226972);
background: ${props => props.BackgroundColor};
`

const TaskList = () => {
    type TaskType = {
        Task: string
        Description: string
        Date: string
        Car: string
        id: string
        Performed: boolean
    }
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        axios.get<Array<TaskType>>('https://60f53a592208920017f39f9d.mockapi.io/tasks').then(response => {
            setTasks(response.data);
            setLoader(false);
        })
    }, [])

    const taskMassive = tasks.sort((a, b) => Number(new Date(a.Date)) - Number(new Date(b.Date)));
    const ActiveTask = taskMassive.filter(value => value.Performed === false).map(p => <TaskItem key={p.id} date={p.Date} Task={p.Task} id={p.id} Car={p.Car} performed={p.Performed} />);
    const PerformedTask = taskMassive.filter(value => value.Performed === true).map(p => <TaskItem key={p.id} date={p.Date} Task={p.Task} id={p.id} Car={p.Car} performed={p.Performed} />);

    return (
        <div className={classes.MainPage}>
            <div>
                <div className={classes.Greetings}>Hello, Wh0am1!</div>
                <div className={classes.Greetings2}>You've got {ActiveTask.length} active tasks
                    {loader && <span><img src={preloader} alt="preloader" /></span>} </div>
                <div>{!loader && <div>{ActiveTask}</div>}</div>
                <div className={classes.Greetings2}>You've got {PerformedTask.length} performed tasks</div>
                <div>{!loader && <div>{PerformedTask}</div>}</div>
            </div>
        </div>
    )
}

const TaskItem = (props: any) => {
    const today = new Date();
    const deadline = new Date(props.date);
    const Date1 = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const Date2 = new Date(deadline.getFullYear(), deadline.getMonth() + 1, deadline.getDate());
    const Days = Math.floor((Date2.getTime() - Date1.getTime()) / (1000 * 3600 * 24));
    const [SectionColor, setSectionColor] = useState('white');

    useEffect(() => {
        if (props.performed === true) {
            setSectionColor(String('grey'));
        }
        else if (Days < 0) {
            setSectionColor(String('#DC143C'));
        }
        else if (Days <= 3) {
            setSectionColor(String('#FFFF00'))
        }
    }, [Days])

    return (
        <div className={classes.Section}>
            <Section BackgroundColor={SectionColor}>
                <div>
                    <div className={classes.carName}><div className={classes.taskHeader}>Vehicle:</div>{props.Car}</div>
                    <div className={classes.taskText} ><div className={classes.taskHeader}>Task:</div>{props.Task}</div>
                    <div><hr></hr></div>
                    <div className={classes.taskText}>Days left: {Days}</div>
                    <div> <NavLink to={'tasks/' + props.id}><Button >Open Task</Button></NavLink><Button>Delete Task</Button></div>
                </div>
            </Section>
           
            <div></div>
        </div>
    )
}

export default TaskList;