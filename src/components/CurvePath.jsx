// CurvePath.jsx
import React from "react";
import { editable as e } from "@theatre/r3f";
import { CatmullRomCurve3, Vector3 } from "three";
import { Line } from "@react-three/drei";

const CurvePath = ({ children }) => {
  // Define the points for the curve
  const points = [
    new Vector3(-2, 0, 0),
    new Vector3(0, 2, 0),
    new Vector3(2, 0, 0),
  ];

  const curve = new CatmullRomCurve3(points);

  return (
    <e.group theatreKey="Curve Group">
      <Line
        points={curve.getPoints(50)} // Get a set of points along the curve
        color="white"
        lineWidth={2}
      />
      {children}
    </e.group>
  );
};

export default CurvePath;
