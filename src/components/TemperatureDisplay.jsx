import { useEffect, useState } from "react"
import { Canvas } from '@react-three/fiber'
import { MeshWobbleMaterial, OrbitControls } from "@react-three/drei";



// var t = 0; 

// export const updateTemperature = (temp) => {
//     t=temp;
// }

const TemperatureDisplay = () => {
    const [temperature, setTemperature] = useState(""); //Initial default values
    const [color, setColor] = useState('white');


    const updateColorBasedOnTemperature = (temp) => {
        if(temp<10){
            setColor('blue');
        } else if (temp<25) {
            setColor('green');
        } else if(temp< 35) {
            setColor('yellow');
        } else {
            setColor('red');
        }
    };

    const handleTemperatureChange = (e) => {
        const temp = Number(e.target.value);
        setTemperature(temp);
        updateColorBasedOnTemperature(temp);
    }


    //TEST // SSE didnt work, maybe with: https://github.com/hhxsv5/php-sse
    // useEffect(() => {
    //     // Connect to the Server-Sent Events (SSE) endpoint
    //     const eventSource = new EventSource('https://vr360.bplaced.net/web3d/dist/sse_temperature_updates.php');
    
    //     eventSource.onmessage = function (event) {
    //         const response_json = JSON.parse(event.data);
    //         const newTemperature = response_json.temperature; // Parse the temperature data
    //         console.log("getting data from server ", newTemperature);
    //         setTemperature(newTemperature); // Update state
    //     };
    //         eventSource.onerror =function(err){
    //             console.error("EventSource failed: ", err);
    //         }
    
    //     // Clean up the SSE connection when the component unmounts
    //     return () => {
    //       eventSource.close();
    //     };
    //   }, []);



      const getTemperatureRequest = async () =>{
        const url = 'https://vr360.bplaced.net/web3d/dist/api/getData.php';
        try{
            const response = await fetch(url);
            //const text = await response.text();
            const json = await response.json();
            setTemperature(json.temperature);
            console.log("get response:", json, "temp: ", json.temperature); //To-Do Testing if response

        }catch(error){
            console.error('Error getting temperature:', error);
        } 
      }
    
    
    //https://stackoverflow.com/questions/38510640/how-to-make-a-rest-post-call-from-reactjs-code
    //Test POST Request to php server
    const handlePostTemperature = async () => {
        const url= 'https://vr360.bplaced.net/web3d/dist/set_temperature.php'
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                temperature: temperature // Send temperature in custom header
                //secondParam: 'yourOtherValue',
            })
        }
        try{
            const response = await fetch(url, requestOptions);
            const text = await response.text();
            console.log("response:", text); //To-Do Testing if response

        }catch(error){
            console.error('Error posting temperature:', error);
        }   
    }

    return (
        <div style={{ height: '100vh' }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 10, 5]} />

                {/* Render a box that changes color */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[2, 2, 2]} />
                    <MeshWobbleMaterial
                        attach="material"
                        color={color}  // Color changes based on temperature
                        speed={1}
                        factor={0.6}
                    />
                </mesh>

            </Canvas>

            {/* Display the temperature */}
            <div style={{ position: 'absolute', top: 20, left: 20, color: 'white' }}>
                <h2>Temperature: {temperature ? `${temperature}°C` : 'Waiting for data...'}</h2>
            </div>
            {/* Input field and slider to manually set the temperature */}
            <div style={{position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px', width: '50%' }}>
                <input
                    type="number"
                    value={temperature}
                    onChange={handleTemperatureChange}
                    style={{ padding: '10px', marginBottom: '10px', fontSize: '16px', textAlign: 'center' }}
                    placeholder="Set Temperature"
                />
                <input
                    type="range"
                    min="-10"
                    max="50"
                    value={temperature}
                    onChange={handleTemperatureChange}
                    style={{ width: '100%' }}
                />
                {/* Button to send the temperature as POST */}
                <button onClick={handlePostTemperature}>Send Temperature</button>
            </div>
            <div style={{position: 'absolute', top: 60, left: 20, alignItems: 'right', marginTop: '20px', width: '50%' }}>
                <button onClick={getTemperatureRequest}>Get Temperature</button>
            </div>
        </div>
    );

};

export default TemperatureDisplay;