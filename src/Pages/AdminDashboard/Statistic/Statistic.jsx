import { useEffect, useState } from "react";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import Users from "./Users";

const Statistic = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/bookings")
      .then((res) => res.json())
      .then((data) => setBookings(data));
  }, []);

  const truncate = (str, maxLength) => {
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  return (
    <>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={bookings}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="test_name"
              tickFormatter={(str) => truncate(str, 10)}
            />
            <YAxis dataKey="test_price" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="test_price"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <Users />
    </>
  );
};

export default Statistic;
