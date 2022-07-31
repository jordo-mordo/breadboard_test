import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import styled from 'styled-components';

const fakeAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const available = Math.random() > 0.5;
      resolve(available);
    }, 1000)
  })
}

function App() {
  const [step, setStep] = useState(1);
  const [parts, setParts] = useState(Array(2));
  const [partResults, setPartResults] = useState([]);
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
    let currentStep = step;
    setStep(currentStep + 1);
    setCurrentPart('');
    if (currentStep + 1 === 3) {
      fakeAPI();
    }
  };

  const goBack = () => {
    let currentStep = step;
    setCurrentPart(JSON.stringify(parts[currentStep - 2]));
    setStep(currentStep - 1);
  }



  const fakeAPI = async () => {
    const results = await Promise.all([fakeAsync(), fakeAsync()]);
    setPartResults(results);
  }





  console.log(step, parts);
  return (
    <Container>
      <StepTracker step={step} number={1}>1</StepTracker>
      <StepTracker step={step} number={2}>2</StepTracker>
      <StepTracker step={step} number={3}>3</StepTracker>
      <h1>Upload Parts</h1>
      {
        step < 3 &&
        <InputBox onChange={textChange} value={currentPart}></InputBox>
      }

      {
        step === 3 && (!partResults.length) ?
        'Loading Results...'
        :
        partResults.map((val, index) => (
          <div key={index}>
            {`part ${index}: ${val ? 'Success':'Fail'}`}
          </div>
        ))
      }


      {
        step !== 1 &&
        <button onClick={goBack}>Back</button>
      }
      {
        step !== 3 &&
        <button onClick={addPart}>Next</button>
      }
    </Container>
  );
}

export default App;

const Container = styled.div`
`;

const InputBox = styled.textarea`

`;

const StepTracker = styled.div`
  background: ${({step, number}) => step > number ? 'green': 'white'};
`;