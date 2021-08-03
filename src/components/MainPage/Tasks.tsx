import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import classes from "./MainPage.module.css";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import { useHistory } from "react-router-dom";
import { TaskType } from "../Types";

const Input = styled.input.attrs((props) => ({
  type: "text",
  size: props.size || "1em",
}))`
  color: black;
  font-size: 1em;
  border: none;
  border-radius: 10px;
  background-color: #f4f4f4;
  width: 70%;
  margin: ${(props) => props.size};
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
`;

const Section = styled.section`
  color: black;
  border-radius: 20px;
  border: none;
  padding: 10px;
  box-shadow: 0 1px 20px rgba(90, 49, 100, 0.226972);
  background: white;
`;
const Tasks = (props: { id: String }) => {
  const history = useHistory();

  const [editMode, setEditMode] = useState(false);

  const [TaskForm, setTaskText] = useState<TaskType>({
    Task: "",
    Description: "",
    Date: new Date(),
    Car: "",
    id: "",
    Performed: false,
    Order: "",
  });

  useEffect(() => {
    axios
      .get<TaskType>(
        "https://60f53a592208920017f39f9d.mockapi.io/tasks/" + props.id
      )
      .then((response) => {
        setTaskText(response.data);
      });
  }, []);

  const deactivateEditModeWithoutPut = (): void => {
    setEditMode(false);
  };
  const activateEditMode = (): void => {
    setEditMode(true);
  };
  const setActive = (): void => {
    setTaskText((prev) => ({ ...prev, Performed: false }));
    axios.put("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + props.id, {
      Performed: false,
    });
  };
  const setPerform = (): void => {
    setTaskText((prev) => ({ ...prev, Performed: true }));
    axios.put("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + props.id, {
      Performed: true,
    });
  };
  const taskNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskText((prev) => ({ ...prev, Task: e.target.value }));
  };
  const taskCarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskText((prev) => ({ ...prev, Car: e.target.value }));
  };
  const DateChange = (date: Date) => {
    setTaskText((prev) => ({ ...prev, Date: date }));
  };
  const taskDescriptionChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTaskText((prev) => ({ ...prev, Description: e.target.value }));
  };
  const deactivateEditMode = (): void => {
    axios.put(
      "https://60f53a592208920017f39f9d.mockapi.io/tasks/" + props.id,
      TaskForm
    );
    setEditMode(false);
  };

  const deadline = new Date(TaskForm.Date);

  return (
    <div className={classes.MainPage}>
      <Section>
        <div className={classes.taskHeader}>Vehicle Name:</div>
        <div>
          {!editMode && <div className={classes.carName}>{TaskForm.Car}</div>}
          {editMode && (
            <div>
              <Input
                onChange={taskCarChange}
                value={TaskForm.Car}
                placeholder="Название машины"
              />
            </div>
          )}
        </div>
        <div className={classes.taskHeader}>Task:</div>
        {!editMode && <div className={classes.carName}>{TaskForm.Task}</div>}
        {editMode && (
          <div>
            <Input onChange={taskNameChange} value={TaskForm.Task} />
          </div>
        )}
        <div>
          <hr></hr>
        </div>
        <div className={classes.taskHeader}>Description</div>
        {!editMode && <div>{TaskForm.Description}</div>}
        {editMode && (
          <div>
            <Input
              onChange={taskDescriptionChange}
              value={TaskForm.Description}
              placeholder="Название машины"
            />
          </div>
        )}
        <div className={classes.taskHeader}>Deadline</div>
        {!editMode && (
          <div>
            {deadline.getDate()}.{deadline.getMonth() + 1}.
            {deadline.getFullYear()}
          </div>
        )}
        {editMode && (
          <div>
            <DatePicker
              placeholderText="Date"
              selected={new Date(TaskForm.Date)}
              onChange={DateChange}
              className={classes.datePicker}
              dateFormat="d MMMM yyyy"
            />
          </div>
        )}
        {!editMode && (
          <div>
            <Button onClick={activateEditMode}>Edit Task</Button>
            {!TaskForm.Performed && (
              <Button onClick={setPerform}>Task completed</Button>
            )}
            {TaskForm.Performed && (
              <Button onClick={setActive}>Activate Task</Button>
            )}
            <Button onClick={() => history.push("/")}>Back</Button>
          </div>
        )}
        {editMode && (
          <div>
            <Button onClick={deactivateEditMode}>Save Changes</Button>
            <Button onClick={deactivateEditModeWithoutPut}>Back</Button>
          </div>
        )}
      </Section>
    </div>
  );
};
export default Tasks;
