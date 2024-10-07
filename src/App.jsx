import { Canvas } from '@react-three/fiber'
import './App.css'
import Experience from './components/Experience'
import Configurator from './components/Configurator'
import TemperatureDisplay from './components/TemperatureDisplay'
import { CustomizationProvider } from './contexts/Customization'
import ReoccurringApiCall from './components/ReoccurringApiCall'


function App() {


  return (
    <CustomizationProvider>
      <div className="App">
        <Canvas>
          //Scene Setup
          <color attach="background" args={["#213547"]} />
          <fog attach="fog" args={["#213547", 10, 20]} />
          <Experience /> //import experience component
        </Canvas>
        <Configurator />
        <ReoccurringApiCall />
        <TemperatureDisplay />
      </div>
    </CustomizationProvider>

  )
}

export default App
