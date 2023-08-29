import './App.css';
import { useState } from 'react';
import Form from './components/form';
import Files from './components/files';

function App() {
  const [filename, setFilename] = useState("")

  const getFilename = (val) => {
    setFilename(val)
  
  }
  return (
    <>
      <div>
        <p>{filename}</p>
      </div>
      <Form filename={getFilename} />
      <Files/>
    </>
     
  );
}

export default App;
