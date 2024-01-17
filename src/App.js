
import './App.css';
import { TaskProvider} from './Context/TaskProvider';
import { Task } from './components/Task.js';
import { Header } from './components/Header.js';
import { Form } from './components/Form.js';
import { Footer } from './components/Footer.js';



function App() {
 
  return (
    <div className="App">
      <Header/>
      <Form/>
      <Task/>
      <Footer/>
    </div>
  );
}

const AppWrapper = () => (
  <TaskProvider>
    <App />
  </TaskProvider>
);

export default AppWrapper;

