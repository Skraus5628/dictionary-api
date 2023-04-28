import { React, useState } from "react";
import axios from "axios";
import "./App.css";


const App = () => {
  const [state, setState] = useState({
    dictionary: "",
   
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      dictionary: state.dictionary,
      
    };
    
    const Auth_Token = process.env.REACT_APP_BASIC_TOKEN

    const headers = {
        
        'Authorization': `${Auth_Token}`
    }
     axios.post('https://dictionary.iachieved.it/dictionary', userData, {
      headers: headers
    }).then((response) => {
      console.log(response.status, response.data);
    });
  };

  return (
    <div>
      <h1>Add Dictionary</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <label htmlFor="dictionary">
          Name
          <input
            type="text"
            name="dictionary"
            value={state.dictionary}
            onChange={handleChange}
          />
        </label>
        {/* <label htmlFor="job">
          Job
          <input
            type="text"
            name="job"
            value={state.job}
            onChange={handleChange}
          />
        </label> */}
        <button type="submit">+</button>
      </form>
    </div>
  );
};

export default App;

  