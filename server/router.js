const dotenv = require('dotenv');
dotenv.config();
const router = require('express').Router();
const request = require('request');



// Create new Dictionary entry

router.post('/new', async(req, res)=>{
    let { dict } = req.body;
    console.log("step1");
    let newDict = await JSON.stringify({ body: dict})
    // return to check this, the await passes an empty object but succeeds
    console.log(newDict)
    // If dictionary object passes, send the req
    if(newDict){
        request({
            method: 'POST',
            url: process.env.BASE_URL,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': process.env.AUTH_TOKEN
            },
               
             body: "{}"
          }, function (error, response, body) {
            // Logs to check step occurs and body returned
            console.log("Step C");
            console.log(body)
            // return body with dict ID
            res.status(200).send(body)
          }); 
    }

    else {
        res.status(401).json({message: "you broke it"});
      }

})


// Get all keys for a dictionary

// test ID  693572b7-0b9e-4515-9647-2aa5d513000b

router.get('/:id/all', async(req,res) =>{
  // pull ID from params sent
    let { id } = req.params
    console.log('step 1 happened')
    console.log(id)
    // if id is found it will pass into request variable and send request
    if(id){
    request({
      method: 'GET',
      url: `https://dictionary.iachieved.it/dictionary/${id}/keys`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.AUTH_TOKEN
      }}, function (error, response, body) {
      console.log('Response:', body);
      // returns body containing response body
      res.status(200).send(body)
    });
  }

  else {
    res.status(401).json({message: "you broke it again dummy"});
  }

})


// Create/Modify Key-Value Pairs


router.post('/:id/keys/:key', async(req, res, next) =>{
  let { id, key } = req.params;
  let bodyData = req.body;
  // let newBody = bodyData.value

  // pull body data from "value" body input
 
  console.log('1st step down')
  console.log(id)
  console.log(key)
  console.log(bodyData)
  
  // body data makes it here

    if(id && key && bodyData){
      // body data still is here, if missing any params throws error
      request({
      method: 'POST',
      url: `https://dictionary.iachieved.it/dictionary/${id}/keys/${key}`,
      // passing dict ID and key value to be updated/added
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.AUTH_TOKEN

      },
      // here "value" is assigned to the key's value, however the body data is not passing, need to check why
      body: "{  \"value\": \"VALUE\"}"
    }, function (error, response, body) {
      console.log('step 2 happened I think')
      console.log('where body', body);
      res.status(201).json({message: "Success!"});
    });

      }

      else {
        res.status(401).json({message: "you broke it yet again"});
      }
    
})
// Note: need to pass ID param, need to pass key "name" param, body must be listed as "value" with value to follow.


// Delete dictionary
router.delete('/:id/delete', async(req,res) =>{
  let { id } = req.params
  if(id){
    request({
      method: 'DELETE',
      url: `https://dictionary.iachieved.it/dictionary/${id}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.AUTH_TOKEN
      }}, function (error, response, body) {
        res.status(201).json({message: "Successfully deleted the thing"});
        console.log(body);
    });
  }
  else{
    res.status(401).json({message: "can you not break it"});
  }
})

module.exports = router;