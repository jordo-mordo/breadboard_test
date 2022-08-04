import {useState, useRef} from 'react';
import logo from './logo.svg';
import './App.css';
import styled from 'styled-components';
import PartResults from './components/PartResults';

function App() {
  const [step, setStep] = useState(0);
  const [parts, setParts] = useState(Array(2).fill(''));

  const changeHandler = (e) => {
    const currentParts = [...parts];
    currentParts[step] = e.target.value;
    setParts(currentParts);
  }

  const renderForm = () => {
    switch(step) {
      case(2): return <PartResults parts={parts}/>;
      default: return <textarea value={parts[step]} onChange={changeHandler}/>;
    }
  }

  const validateJSON = (string) => {
      try{
        JSON.parse(string);
        return true;
      } catch(err) {
        return false;
      }
  }

  const nextStep = () => {
    validateJSON(parts[step]) ? setStep(step + 1) : alert('Please enter valid JSON!');
  }

  const lastStep = () => {
    setStep(step - 1);
  }

  return (
    <Container>
      <h1>Update Parts</h1>
      {renderForm()}
      {step!==0 ? <button onClick={lastStep}>Back</button> : <div/>}
      {step!==2 ? <button onClick={nextStep}>Next</button> :<div/>}
    </Container>
  );
}

export default App;

const Container = styled.div`

`;
