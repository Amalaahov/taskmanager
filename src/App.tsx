import './App.css';
import Navbar from './components/NavBar/NavBar';
import { BrowserRouter, Route } from "react-router-dom";
import TaskList from "./components/MainPage/MainPage";
import AddTask from "./components/AddTask/AddTask";
import Tasks from './components/MainPage/Tasks';

function App() {
    return (
        <div>
            <div id="App">
                <BrowserRouter>
                    <Navbar />
                    <Route path='/addtask' render={() => <AddTask />} />
                    <Route path='/' exact render={() => <TaskList />} />
                    <Route path='/tasks/:taskId' render={(props) => <Tasks id={props.match.params.taskId} />} />
                </BrowserRouter>
            </div>
            <div></div>
        </div>
    );
}

export default App;
