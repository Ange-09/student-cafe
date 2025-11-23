import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/cafecustomerchart.css";

export default function CafeCustomerChart() {
  const [timeframe, setTimeframe] = useState("monthly");

  // Monthly average should be around 1500
  // Generate monthly data for 1 year with average around 1500
  const monthlyData = [
    { period: "Jan", customers: 1420 },
    { period: "Feb", customers: 1480 },
    { period: "Mar", customers: 1550 },
    { period: "Apr", customers: 1600 },
    { period: "May", customers: 1680 },
    { period: "Jun", customers: 1720 },
    { period: "Jul", customers: 1580 },
    { period: "Aug", customers: 1540 },
    { period: "Sep", customers: 1450 },
    { period: "Oct", customers: 1380 },
    { period: "Nov", customers: 1320 },
    { period: "Dec", customers: 1480 },
  ];

  // Calculate monthly average
  const monthlyAverage = Math.round(
    monthlyData.reduce((sum, d) => sum + d.customers, 0) / monthlyData.length
  );

  // Weekly average should be based on monthly average
  // Approximately: weekly = monthly / 4.33 (average weeks per month)
  const weeklyAverage = Math.round(monthlyAverage / 4.33);

  // Generate weekly data for 1 year (52 weeks) based on weekly average
  const weeklyData = Array.from({ length: 52 }, (_, i) => {
    // Create variation around the weekly average
    const seasonalVariation = Math.sin(i * 0.12) * 40; // Seasonal pattern
    const randomVariation = (Math.random() - 0.5) * 60; // Random fluctuation
    const customers = Math.floor(
      weeklyAverage + seasonalVariation + randomVariation
    );

    return {
      period: `W${i + 1}`,
      customers: Math.max(customers, 200), // Ensure minimum value
    };
  });

  const getChartData = () => {
    switch (timeframe) {
      case "monthly":
        return monthlyData;
      case "weekly":
        return weeklyData;
      default:
        return monthlyData;
    }
  };

  const data = getChartData();

  return (
    <div className="ccc-container">
      <div className="ccc-wrapper">
        <h1 className="ccc-title">Customer Traffic Trends</h1>

        <div className="ccc-card">
          {/* Timeframe Selection */}
          <div className="ccc-button-group">
            {["weekly", "monthly"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`ccc-button ${
                  timeframe === tf ? "ccc-button-active" : ""
                }`}
                onMouseOver={(e) => {
                  if (timeframe !== tf) {
                    e.target.classList.add("ccc-button-hover");
                  }
                }}
                onMouseOut={(e) => {
                  if (timeframe !== tf) {
                    e.target.classList.remove("ccc-button-hover");
                  }
                }}
              >
                {tf.charAt(0).toUpperCase() + tf.slice(1)}
              </button>
            ))}
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height="70%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis
                dataKey="period"
                stroke="#999"
                tick={{ fontSize: 12 }}
                interval={timeframe === "weekly" ? 4 : 0}
              />
              <YAxis
                stroke="#999"
                label={{
                  value: "Customers",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
                formatter={(value) => [value, "Customers"]}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="customers"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>

          {/* Stats Summary */}
          <div className="ccc-stats">
            <p className="ccc-stats-text">
              <strong>Average Customers ({timeframe}):</strong>{" "}
              {Math.round(
                data.reduce((sum, d) => sum + d.customers, 0) / data.length
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
