import { React, useState } from "react";
import axios from "axios";
import "./App.css";

function Appp() {
    const [data, setData] = useState({
      dictionary: ""
    });
    
    // const [searchWord, setSearchWord] = useState("");
    
    // const [dict, setDict] = useState([]);
   
    // Function to fetch information on button
    // click, and set the data accordingly
    // function getMeaning() {
    //   Axios.get(
    //     `https://api.dictionaryapi.dev/api/v2/entries/en_US/${searchWord}`
    //   ).then((response) => {
    //     setData(response.data[0]);
    //   });
    // }
  
    const handleChange = (e) => {
      const value = e.target.value;
      setData({
        ...data,
        [e.target.name]: value
      
      });
      console.log(data)
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const newDict = {
        dictionary: data,
        
      };
  
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic cWFjYW5kaWRhdGU6c29mdEtpdHR5TGl0dGxlQmFsbG9mRnVy'
      }
  
      axios.post('https://dictionary.iachieved.it/dictionary', newDict, {
        headers: headers
      }).then((response) => {
        console.log(response.status, response.data);
      });
    };
  
  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     fetch('https://dictionary.iachieved.it/dictionary', {
  //        method: 'POST',
  //        body: JSON.stringify({
  //           dictionary: dictionary,
  //           // body: body,
  //           // userId: Math.random().toString(36).slice(2),
  //        }),
  //        headers: {
  //           'Content-type': 'application/json',
  //           'Authorization': 'Basic cWFjYW5kaWRhdGU6c29mdEtpdHR5TGl0dGxlQmFsbG9mRnVy'
  //        },
  //     })
  //        .then((res) => res.json())
  //        .then((dictionary) => {
  //           setDict((dictionary) => [dictionary, ...dict]);
  //           // setTitle('');
  //           // setBody('');
  //           console.log(dict)
  //        })
         
  //        .catch((err) => {
  //           console.log(err.message);
  //        });
  //  };
  
  
    return (
      <div className="App">
        <h1>dictionary</h1>
        <div className="textCont">
        <p>Add New Dictionary</p>
        <p>Add New Key/Value</p>
        </div>
        <form className="dForm">
          
          
          <input type="dictionary" name="dictionary"  onChange={handleChange}></input>
          <button type="submit" onSubmit={handleSubmit}>+</button>
          
          {/* <input type="keys" name="keys"></input> */}
          {/* <button type="submit" onSubmit={handleSubmit}><TiPlus/></button> */}
        </form>
        <div className="searchBox">
       
          <div className="dictBox">
            <div className="list">
          </div>
          </div>
        <div className="keyBox">
  
        </div>
      </div>
      </div>
      
    );
  }
  
  export default Appp;