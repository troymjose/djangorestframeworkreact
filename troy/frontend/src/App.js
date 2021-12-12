import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import Button from 'react-bootstrap/Button'

function App() {
  return (
    <div className="App">
      <Alert variant="primary">This is a das alert—check it out!</Alert>
      <Button variant="primary">Primary</Button>
    </div>
  );
}

export default App;
