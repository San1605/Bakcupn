import React from 'react'
import { PieChart, Pie, Cell } from 'recharts';
const NeedleChart = ({ dataValue }) => {
  console.log(dataValue,"dataVlaue")
  const RADIAN = Math.PI / 180;
  function getProgressColor(progress) {
    let red, green, blue;

    if (progress <= 50) {
      // Red to Yellow
      red = 255;
      green = Math.floor((progress / 50) * 255);
      blue = 0;
    } else {
      // Yellow to Green
      red = 255 - Math.floor(((progress - 50) / 50) * 255);
      green = 255;
      blue = 0;
    }

    const colorCode = `rgb(${red},${green},${blue})`;
    return colorCode;
  }

  // Example usage:
  const data = [
    { name: "A", value: 33.33, color: getProgressColor(33.33) },
    { name: "B", value: 33.33, color: getProgressColor(66.66) },
    { name: "C", value: 33.33, color: getProgressColor(99.99) },
  ];

  const cx = 150;
  const cy = 200;
  const iR = 80;
  const oR = 100;
  // const value = 20;

  const needle = (value, data, cx, cy, iR, oR, color) => {
    let total = 0;
    data.forEach((v) => {
      total += v.value;
    });
    const ang = 180.0 * (1 - value / total);
    const length = (iR + 2 * oR) / 3;
    const sin = Math.sin(-RADIAN * ang);
    const cos = Math.cos(-RADIAN * ang);
    const r = 5;
    const x0 = cx + 5;
    const y0 = cy + 5;
    const xba = x0 + r * sin;
    const yba = y0 - r * cos;
    const xbb = x0 - r * sin;
    const ybb = y0 + r * cos;
    const xp = x0 + length * cos;
    const yp = y0 + length * sin;

    return [
      <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="#none"
        fill={color}
      />,
    ];
  };
  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {needle(dataValue, data, cx, cy, iR, oR, "#2D9596")}
    </PieChart>
  );
};

export default NeedleChart
