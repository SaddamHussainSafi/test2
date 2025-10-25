import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartBox({ data }) {
  return (
    <div className="chart-box">
      <h3>Analytics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="adoptions" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}