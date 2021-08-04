import "./ModalAbout.css";
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

const ModalAboutWindow = (props: any) => {
  const exitModalWindow = () => {
    props.setActive(false);
  };
  return (
    <div
      className={`modal__wrapper ${props.isOpened ? "modal active" : "modal"}`}
    >
      <div className="modal__body">
        <div className="content">
          <div>Добавлен Drag and Drop:</div>
          <div>-Карточки с заданиями можно менять местами. Передащить карточку на задание, с которым надо поменять местами.</div>
          <div>-Активное задание можно перенсти в выполненое. Перетащить задание на любое выполненое задание.</div>
          <hr></hr>
         <div>Drag and Drop добавлял в ночь с вторника (3 августа) на среду (4 августа). </div>
         <div>Не успел доделать все, много работает на "костылях", но главное что оно работает.</div>
         <div>Хотелось спать) Утром продолжу исправлять все косяки.</div>
         <div>Спасибо за понимание) С уважением, Александр.</div>
         <div> <Button onClick={exitModalWindow}>Close</Button></div>
        </div>
        <div className="modal__close"></div>
      </div>
    </div>
  );
};

export default ModalAboutWindow;
