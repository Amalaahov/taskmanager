import "./Modal.css";
import axios from "axios";
import styled from "styled-components";
const Button = styled.button`
  background: black;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 10px;
`;

const ModalWindow = (props: any) => {
  const deleteItem = () => {
    axios
      .delete("https://60f53a592208920017f39f9d.mockapi.io/tasks/" + props.id)
      .then(() => {
        props.setActive(false);
        window.location.reload();
      });
  };
  const exitModalWindow = () => {
    props.setActive(false);
  };
  return (
    <div
      className={`modal__wrapper ${props.isOpened ? "modal active" : "modal"}`}
    >
      <div className="modal__body">
        <div className="content">
          Are you sure you want to delete the task?
          <Button onClick={deleteItem}>Yes</Button>
          <Button onClick={exitModalWindow}>No</Button>
        </div>
        <div className="modal__close"></div>
      </div>
    </div>
  );
};

export default ModalWindow;
