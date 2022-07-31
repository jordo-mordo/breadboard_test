import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import styled from 'styled-components';

function App() {
  const [step, setStep] = useState(1);
  const [parts, setParts] = useState(Array(2));
  const [currentPart, setCurrentPart] = useState('')

  const textChange = (e) => {
    setCurrentPart(e.target.value);
  };

  const addPart = (e) => {
    let partObj;
    try {
      partObj = JSON.parse(currentPart);
    } catch (err) {
        alert('Please enter valid JSON')
        return;
    }
    const nextParts = [...parts];
    nextParts[step - 1] = partObj;
    setParts(nextParts);
  };

  console.log(currentPart, parts);
  return (
    <Container>
      <StepTracker step={step} number={1}>1</StepTracker>
      <StepTracker step={step} number={2}>2</StepTracker>
      <StepTracker step={step} number={3}>3</StepTracker>
      <h1>Upload Parts</h1>
      <InputBox onChange={textChange}></InputBox>
      <button>Back</button>
      <button onClick={addPart}>Next</button>
    </Container>
  );
}

export default App;

const Container = styled.div`
`;

const InputBox = styled.textarea`

`;

const StepTracker = styled.div`
  background: ${({step, number}) => step >= number ? 'green': 'white'};
`;