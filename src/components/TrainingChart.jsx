import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { fetchTrainings } from "../trainingapi";

const TrainingChart = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const data = await fetchTrainings();
        setTrainings(data);
      } catch (err) {
        return console.error(err);
      }
    };
    fetchData();
  }, []);

  const countTotal = (total) => {
    const training = {};

    total.forEach(activities => {
      const { activity, duration } = activities;

      if (!training[activity]) {
        training[activity] = 0;
      }
      training[activity] += duration;
    });

    return Object.entries(training).map(([activity, duration]) => ({ activity, duration }));
  };

  const totalTraining = countTotal(trainings);

  return (
    <BarChart
      width={1600}
      height={600}
      data={totalTraining}
      margin={{ top: 20, right: 80, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDashoffset="3 3" />
      
      <XAxis dataKey="activity">
      <Label value="Activity" position="insideBottomRight" offset={-10} />
      </XAxis>
      <YAxis>
        <Label value="Duration (Minutes)" angle={-90} position="insideLeft" offset={-5} />
      </YAxis>
      <Tooltip />
      <Legend />
      <Bar dataKey="duration" fill="#1976d2" />
    </BarChart>
  );

};

export default TrainingChart;
