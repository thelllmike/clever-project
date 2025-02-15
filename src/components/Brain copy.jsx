import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { getProject, val } from "@theatre/core";
import { editable as theatreEditable } from "@theatre/r3f";

// Load the Theatre.js project
const project = getProject("Brain Project");

export const Brain = (props) => {
  const mesh = useRef();
  const { nodes, materials } = useGLTF("objects/Brain.glb");

  // Create a Theatre.js sheet and object
  const sheet = project.sheet("Scene");
  const brainObject = sheet.object("Brain", {
    rotationY: 0,
  });

  useFrame(() => {
    const rotationY = val(brainObject.props.rotationY);
    mesh.current.rotation.y = rotationY;
  });

  return (
    <group ref={mesh} {...props} scale={0.04} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Brain_low_1.geometry}
        material={materials.Brain}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[100, 92.978, 100]}
        {...theatreEditable(brainObject, "rotationY")}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Scull_2_low_1.geometry}
        material={materials.Scull}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={92.266}
      />
    </group>
  );
};
export default Brain;
