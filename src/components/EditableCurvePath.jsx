// EditablePath.jsx
import React, { useState } from "react";
import { Line, TransformControls } from "@react-three/drei";
import { CatmullRomCurve3, Vector3 } from "three";

const EditablePath = () => {
  const [points, setPoints] = useState([
    new Vector3(-5, 0, 0),
    new Vector3(0, 5, 0),
    new Vector3(5, 0, 0),
  ]);

  const curve = new CatmullRomCurve3(points);

  return (
    <>
      <Line points={curve.getPoints(50)} color="red" lineWidth={2} />
      {points.map((point, index) => (
        <TransformControls
          key={index}
          position={point}
          onChange={(e) => {
            const newPoints = [...points];
            newPoints[index] = e.target?.position || new Vector3();
            setPoints(newPoints);
          }}
        />
      ))}
    </>
  );
};

export default EditablePath;
