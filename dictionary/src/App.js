import { React, useState } from "react";
import axios from "axios";
import "./App.css";


const App = () => {
  // this state holds the current dictionary input form submission
  const [state, setState] = useState({
    dictionary: "",
   
  });
// this state holds the current key/value input for form submission
  const [keyData, setKeyData] = useState({
    value: "",
    input: ""
    
  })

  // this state handles the array of dictionary keys to be rendered 
  const [dicts, setDicts] = useState([
      
  ])

  // this state handles the array of key/value object pairs to be rendered
  const [keys, setKeys] = useState([{
      
  }])

  // this state handles the currently selected dictionary ID
  const [currDict, setCurrDict] = useState({
    id:""
  })




  // handles dictionary input value changes
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  // handles key/value input value changes
  const handleKeyChange = (e) => {
    const value = e.target.value;
    setKeyData({
      ...keyData,
      [e.target.name]: value
    });
   
  };

  // handles dictionary form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    const dictData = {
      dictionary: state.dictionary,
      
    };

    axios.post(`http://localhost:5000/dict/new`, dictData,
    ).then((response) => {
     console.log(response.status, response.data);
    //  setDicts(response.data.id)
    setDicts([...dicts, {name:response.data.id}])
     console.log(response.data)
     console.log(dicts)
   });


 };

  // handles key/value form submissions
  const handleKeySubmit = (e) => {
    e.preventDefault();
    // stores the current selected active dictionary ID

    const keyID = {
      keyID: currDict.name
      
    };
    
    // stores the input value, which will be the name of the key/appended to end of URL
    const keyValue= {
      value: keyData.value
        
    }

    // variable which becomes the standalone body to be set, the value (key name) appended to url
    // alongside the pair data "value of the value"

    const newKeyData ={
      value: keyData.value,
      input: keyData.input

    }


   axios.post(`http://localhost:5000/dict/${keyID.keyID}/keys/${keyValue.value}`, newKeyData,
   ).then((response) => {
    // for testing
    console.log(newKeyData)
    console.log(response, response.data);
  });
};
    
 
  const handleClick = async (event, i) =>{
    // Sets the currDict state to the ID of the "clicked" dictionary entry.
    // Also for testing - can likely remove the async portion for performance.
   let promise = new Promise((resolve, reject) =>{
      setTimeout(() => resolve(setCurrDict(dicts[i])), 3000)
   });

  // temporarily leaving this as-is, needs updating

   let result = await promise

  //  Storing the ID variable for the following URL.
   const currID = {
    currID: currDict.name
   }

// After setting the selected dictionary, pulls that ID and sends the GET req to pull the associated key/value pairs object.
      await axios.get(`http://localhost:5000/dict/${currID.currID}/all`)
        // Set the keys state 
        .then(response => setKeys(response.data))
        
       
        .catch(error =>{
          console.log(error)

        
        })
    
        console.log(keys)
   
    // setCurrDict(dicts[i])
    console.log(event.target);
    console.log('key index:', i)
    console.log(dicts[0].name)
    console.log(dicts)
    console.log(currDict)
  

   
  }
  

  return (
    <div className="app">
      <h1>Dictionary App</h1>
      <hr />
      <div className="textCont">
      <p>Add New Dictionary</p>
      <p>Add New Key/Value</p>
      </div>
                            {/* Forms */}
      <form className="dForm" onSubmit={handleSubmit}>
        <label htmlFor="dictionary">
          Dictionary
          <input
            type="text"
            name="dictionary"
            value={state.dictionary}
            onChange={handleChange}
          />
        </label>
     
        <button type="submit">+</button>
      </form>
      <form className="keyForm" onSubmit={handleKeySubmit}>
        <label htmlFor="keys">
         Key
          <input
            type="text"
            name="value"
            value={keyData.value}
            onChange={handleKeyChange}
          />
        </label>
        <label htmlFor="values">
          Value
          <input
            type="text"
            name="input"
            value={keyData.input}
            onChange={handleKeyChange}
          />
        </label>
     
        <button type="submit">+</button>
      </form>

                          {/* Lists */}
      <div className="searchBox">
       
       <div className="dictBox">
       <div className="list">
        <ul className="dictList">
        {dicts.map((dicts, i) =>(
          <div key={i}>
            
          {/* <p >{dicts.name}</p> */}
          <button index="i" onClick={event => handleClick(event,i)} key={i}>{dicts.name}</button>
          
          </div>
        ))}
        </ul>

       </div> 
       </div>
     <div className="keyBox">
        <div className="list">
        <ul className="keyList">{keys.value}</ul>
        </div>
     </div>
     </div>
    </div>
  );
};


export default App;

  