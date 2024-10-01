import { MeshReflectorMaterial, PresentationControls, Stage } from "@react-three/drei";

//Model import:
// import { useLoader } from '@react-three/fiber' 
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { Suspense } from "react";
import Chair from "./Chair";



const Experience = () => {

    //const gltf = useLoader(GLTFLoader, '/models/chair.gltf') //Access gltf -> must be in public/models classic loader BETTER glftjsx

    return (
        <PresentationControls
            speed={1.5}
            global zoom = {0.5}
            polar={[-0.1, Math.PI / 4]}
        >
            <Stage environment="city" intensity={0.6} castShadow={false}>   
                <Chair />
        </Stage>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position-y={-2}>
            <planeGeometry args={[170, 170]} />
            <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={40}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#101010"
                metalness={0.5}
            />
            </mesh>
        </PresentationControls>
    );
}

export default Experience;