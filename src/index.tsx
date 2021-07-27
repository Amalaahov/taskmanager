import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";

const Section = styled.section`
  color: white;
  border-radius: 20px;
  border: 7px solid black;
  background: white;
`;

ReactDOM.render(
  <BrowserRouter>
    <Section>
      <App />
    </Section>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
