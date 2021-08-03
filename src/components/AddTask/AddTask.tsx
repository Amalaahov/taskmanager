import { useState } from "react";
import classes from "./AddTask.module.css";
import axios from "axios";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChangeEvent } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import { AddTaskType } from "../Types";

const Button = styled.button`
  background: black;
  color: white;
  font-size: 1em;
  margin-top: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 10px;
`;
const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`
  color: black;
  font-size: 1em;
  border: none;
  border-radius: 10px;
  background-color: #f4f4f4;
  padding: 10px;
`;
const InputDescription = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`
  color: black;
  font-size: 1em;
  border: none;
  border-radius: 10px;
  width: 80%;
  background-color: #f4f4f4;
  padding: 10px;
`;
const Section = styled.section`
  color: black;
  border-radius: 20px;
  border: none;
  padding: 10px;
  box-shadow: 0 1px 20px rgba(90, 49, 100, 0.226972);
  background: white;
`;

const AddTask = () => {
  const history = useHistory();
  const [TaskForm, setTask] = useState<AddTaskType>({
    Task: "",
    Description: "",
    Date: new Date(),
    Car: "",
    id: "",
    Performed: false,
  });

  const TaskChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTask((prev) => ({ ...prev, Task: e.target.value }));
  };
  const DescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTask((prev) => ({ ...prev, Description: e.target.value }));
  };
  const CarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTask((prev) => ({ ...prev, Car: e.target.value }));
  };
  const DateChange = (date: Date) => {
    setTask((prev) => ({ ...prev, Date: date }));
  };
  const PutTask = () => {
    axios
      .post<AddTaskType>(
        "https://60f53a592208920017f39f9d.mockapi.io/tasks",
        TaskForm
      )
      .then(() => {
        history.push("/");
      });
  };

  return (
    <div className={classes.AddTaskItem}>
      <Section>
        <div>
          <div>
            <div>Task title</div>
            <div>
              <Input
                value={TaskForm.Task}
                onChange={TaskChange}
                placeholder="Enter the task"
              />
            </div>
            <div>Vehicle name</div>
            <div>
              {" "}
              <Input
                onChange={CarChange}
                placeholder="Enter the Vehicle name"
              />
            </div>
            <div>Deadline</div>
            <DatePicker
              placeholderText="Date"
              selected={TaskForm.Date}
              onChange={DateChange}
              className={classes.datePicker}
              dateFormat="d MMMM yyyy"
            />
          </div>
          <div>Description</div>
          <div>
            <InputDescription
              onChange={DescriptionChange}
              placeholder="Enter the description"
            />
          </div>
          <div>
            <Button onClick={PutTask}>Add Task</Button>
            <NavLink to="/">
              <Button> Back</Button>
            </NavLink>{" "}
          </div>
        </div>
      </Section>
    </div>
  );
};
export default AddTask;
