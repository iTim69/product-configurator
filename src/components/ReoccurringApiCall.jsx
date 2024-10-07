import { useEffect, useRef, useState } from "react";


var currentInterval =0;

//from: https://medium.com/@joheefever/using-react-hooks-useeffect-to-make-reoccurring-api-calls-e34b6a712563#:~:text=useEffect%20(line%2023)%20executes%20and%20fetches%20data%20from

const ReoccurringApiCall = () => {
  const [data, setData] = useState([]);
  const [fetchDataTrigger, setFetchDataTrigger] = useState(0);
  const fetchDataIntervalId = useRef();


  const setFetchDataInterval = (interval) => {
    
    currentInterval = interval/1000;
    // Clear old interval
    if (fetchDataIntervalId.current) {
      clearInterval(fetchDataIntervalId.current);
      fetchDataIntervalId.current = undefined;
    }


    // Set new interval
    if (interval > 0) {
      fetchDataIntervalId.current = setInterval(() => {
        setFetchDataTrigger(Date.now());
      }, interval);
    }
  };

    useEffect(() => {
            getTemperatureRequest();
    }, [fetchDataTrigger]);

    const getTemperatureRequest = async () =>{
        console.log("fetching data with Interval: ", currentInterval );
        const url = 'https://vr360.bplaced.net/web3d/dist/api/getData.php';
        try{
            const response = await fetch(url);
            //const text = await response.text();
            const json = await response.json();
            //updateTemperature(json.temperature);
            console.log("get response:", json, "temp: ", json.temperature); //To-Do Testing if response

        }catch(error){
            console.error('Error getting temperature:', error);
        } 
      }


  return (
    <div>
        <select defaultValue={0} onChange={({target})=> setFetchDataInterval(target.value)}>
            <option value ="0"> Auto Refresh : OFF</option>
            <option value ="1000"> 1s</option>
            <option value ="2000"> 2s </option>
            <option value="5000"> 5 s</option>
            <option value="15000"> 15 s</option>
            <option value="30000"> 30 s</option>
            <option value="60000"> 1 min</option>
        </select>
        {data.map(({id, value}) => <div key={id}>{value}</div>)}
    </div>   
  );
};
        //
export default ReoccurringApiCall;