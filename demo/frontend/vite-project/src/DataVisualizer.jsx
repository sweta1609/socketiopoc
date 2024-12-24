import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const socket = io('http://localhost:3001');

export default function DataVisualizer() {
  const [data, setData] = useState([]);

  useEffect(() => {
    socket.on('initialData', (initialData) => {
      setData(initialData);
    });

    socket.on('dataUpdate', (updatedData) => {
      setData(updatedData);
    });

    return () => {
      socket.off('initialData');
      socket.off('dataUpdate');
    };
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Real-time Data Visualization</h1>
      
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Data List</h2>
        <ul className="list-disc pl-5">
          {data.map((item, index) => (
            <li key={index}>{item.name}: {item.value}</li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Bar Chart</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}