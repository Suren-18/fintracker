import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const PieChartComponent = ({ data }) => {
  return (
    <PieChart width={350} height={250}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={72}
        label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default PieChartComponent;
