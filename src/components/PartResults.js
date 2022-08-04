import {useState, useEffect} from 'react';
export default function PartResults ({parts}) {
  const [results, setResults] = useState([]);

  const fakeApi = async () => {
    let currentResults = [];
      setTimeout(() => {
          for (let i = 0; i < parts.length; i++) {
            currentResults.push(Math.random() > 0.5);
          }
          setResults(currentResults);
      }, 1000);
  }

  useEffect(() => {
    fakeApi();
  }, []);

  const renderResults = () => {
    if (!results.length){ return <p>Loading...</p>;}
    else {
      return results.map((val, index) => (
        <p>part {index}: {val ? 'Success':'Fail'}</p>
      ))
    }
  }

  return(
    <div>
      {renderResults()}
    </div>
  );
}