import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { editable as e } from "@theatre/r3f";

export const Brain = (props) => {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("objects/Brain-w.glb");

  return (
    <e.group
      ref={mesh}
      theatreKey="Brain Model"
      {...props}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={1}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={materials.brain}
        position={[0, -0.06, 1.256]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.cover}
        scale={[2.011, 2.011, 1.694]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane002.geometry}
        material={materials.cover}
        position={[-1.271, -1.195, 1.655]}
        rotation={[0, 0, 0.076]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane003.geometry}
        material={materials.brain}
        position={[0, 0, 1.256]}
        rotation={[Math.PI / 2, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane004.geometry}
        material={materials.brain}
        position={[0, -0.06, 1.256]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane005.geometry}
        material={materials.brain}
        position={[0, -0.06, 1.256]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane006.geometry}
        material={materials.brain}
        position={[0, -0.06, 1.256]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane007.geometry}
        material={materials.brain}
        position={[1.547, 0.334, -0.023]}
        rotation={[1.643, 0.029, 0.376]}
        scale={[1, 0.632, 1]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane008.geometry}
        material={materials.brain}
        position={[1.675, -1.723, 0]}
        rotation={[0, 0, -1.995]}
        scale={0.337}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={materials.brain}
        position={[0, -0.06, 1.256]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.955}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials.brain}
        rotation={[0, 0, -Math.PI / 2]}
        scale={1.513}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere001.geometry}
        material={materials.purple}
        position={[2.988, -0.985, 1.115]}
        scale={0.266}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere002.geometry}
        material={materials.purple}
        position={[3.107, -0.161, -0.124]}
        scale={0.167}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere003.geometry}
        material={materials.cover}
        position={[2.637, 0.988, 0.748]}
        scale={0.25}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere004.geometry}
        material={materials.cover}
        position={[2.826, -2.218, 1.772]}
        scale={0.3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere005.geometry}
        material={materials.purple}
        position={[1.881, -2.916, -1.963]}
        scale={0.104}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere006.geometry}
        material={materials.cover}
        position={[2.392, 0.045, -1.033]}
        scale={0.145}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere007.geometry}
        material={materials.purple}
        position={[1.589, 1.962, 0]}
        scale={0.232}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere008.geometry}
        material={materials.purple}
        position={[2.251, 1.294, -0.89]}
        scale={0.055}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere009.geometry}
        material={materials.purple}
        position={[2.459, 0.628, -1.579]}
        scale={0.055}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere010.geometry}
        material={materials.purple}
        position={[2.57, 1.744, -1.423]}
        scale={0.055}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere011.geometry}
        material={materials.cover}
        position={[0.463, 2.4, -0.749]}
        scale={0.055}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere012.geometry}
        material={materials.purple}
        position={[0.2, 2.745, 0.432]}
        scale={0.121}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere013.geometry}
        material={materials.purple}
        position={[0.514, 2.845, 1.097]}
        scale={0.176}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere014.geometry}
        material={materials.cover}
        position={[-2.073, 1.93, -1.257]}
        scale={0.113}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere015.geometry}
        material={materials.cover}
        position={[-3.048, 0.891, -1.801]}
        scale={0.071}
      />
    </e.group>
  );
};

export default Brain;
