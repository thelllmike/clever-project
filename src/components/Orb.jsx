import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Orb = (props) => {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("objects/metal-ball.glb");

  // useFrame(() => {
  //   mesh.current.rotation.x += 0.01;
  // });
  return (
    <group {...props} dispose={null}>
      <mesh
        ref={mesh}
        castShadow
        receiveShadow
        geometry={nodes.bool_low_bool_t_0.geometry}
        material={materials.bool_t}
        scale={0.5}
      />
    </group>
  );
};

export default Orb;
