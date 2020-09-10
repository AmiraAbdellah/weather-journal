//Global Variables\
const date = document.getElementById('date');
const Temp = document.getElementById('temp');
const Content = document.getElementById('content');

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=';
const APIKey = '&appid=0e5c86a2e0da0159ae8996976198e607';
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', makeEvent);
/* Function called by event listener */
function makeEvent(event){
  //method to fetch the details from the weather API
  event.preventDefault();
  const Zip =  document.getElementById('zip').value;
  const feelings =  document.getElementById('feelings').value;
  getWeatherInfo(baseURL,Zip, APIKey)
  
  .then(data =>{
    // Add data
    postData('/add', {date:newDate, temp:data.list[0].main.temp, feelings:feelings} );
    updateUI('/all');
  }) 
};
/* Function to GET Web API Data*/
const getWeatherInfo = async (baseURL, zip, key)=>{

    const res = await fetch(baseURL + zip + key);
    try {
  
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("ERROR", error);
      // appropriately handle the error\
    }
  }
/* Function to POST data */
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
/* Function to GET Project Data */
const updateUI = async (url='') => {
    const req = await fetch(url);
    try{
      const UIData = await req.json();
      Temp.innerHTML = "The Temperature Is : " + UIData[0].temp;
      date.innerHTML ="Date Now : " + UIData[0].date;
      Content.innerHTML = "You Feel : " + UIData[0].feelings;
    }catch(error){
      console.log("ERROR", error);   
    }
  }
  