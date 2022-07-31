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
    <h1>Upload Parts</h1>
      <StepContainer>
        <StepTracker step={step} number={1}>1</StepTracker>
        <StepTracker step={step} number={2}>2</StepTracker>
        <StepTracker step={step} number={3}>3</StepTracker>
      </StepContainer>
      {
        step < 3 &&
        <InputBox onChange={textChange} value={currentPart}></InputBox>
      }

      {
        step === 3 &&
        (
          (!partResults.length) ?
          <ResultsContainer>Loading Results...</ResultsContainer>
          :
          <ResultsContainer>
          {partResults.map((val, index) => (
            <Result key={index} pass={val}>
              {`part ${index}: ${val ? 'Success':'Fail'}`}
            </Result>
          ))}
          </ResultsContainer>
        )
      }

      <ButtonContainer>
        {
          step !== 1 ?
          <button onClick={goBack}>Back</button>
          :
          <div/>
        }
        {
          step !== 3 ?
          <button onClick={addPart}>Next</button>
          :
          <div/>
        }
      </ButtonContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: relative;
  margin: auto;

  border: 1px solid black;
  width: 1000px;
  height: 100vh;
  padding: 50px;

  h1 {
    text-align: center;
  }
`;

const InputBox = styled.textarea`
  height:500px;
  width:100%;
  font-size: 200%;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
`;

const StepTracker = styled.div`
  background: ${({step, number}) => step > number ? 'green': 'white'};
  border: 1px solid black;
  width: 100px;
  height:100px;
  border-radius: 50%;

  display:flex;
  align-items:center;
  justify-content:center;
`;

const ResultsContainer = styled.div`
  height:500px;
  width:100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap:10px;
`;

const Result = styled.div`
  color: ${({pass}) => pass ? 'green' : 'red'};
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  *{
    font-size: 200%;
  }

`;