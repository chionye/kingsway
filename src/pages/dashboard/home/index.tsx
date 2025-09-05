/** @format */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import {
  Users,
  DollarSign,
  Package,
  TrendingUp,
  Activity,
  Pill,
  FlaskConical,
} from "lucide-react";
import { MetricCard } from "../../../components/cards/metric-card";
import { metrics, revenueData, topDrugsData } from "./constants/data";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    console.log(`Navigate to: ${path}`);
    navigate(path);
  };

  return (
    <div className='space-y-6 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='mb-6'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>
          Dashboard Overview
        </h1>
        <p className='text-gray-600'>
          Welcome to Kingsway Diagnostics & Healthcare Management System
        </p>
      </div>

      {/* Metrics Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <MetricCard
          title='Total Users'
          value={metrics.totalUsers.toLocaleString()}
          icon={Users}
          color='bg-blue-500'
          subtitle='Staff & Patients'
        />

        <MetricCard
          title='Revenue Generated'
          value={`₦${metrics.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color='bg-green-500'
          subtitle='This month'
        />

        <MetricCard
          title='Inventory Items'
          value={metrics.inventoryItems.toLocaleString()}
          icon={Package}
          color='bg-purple-500'
          link='/dashboard/inventory'
          subtitle='Click to view inventory'
          onClick={() => handleNavigate("/dashboard/inventory")}
        />

        <MetricCard
          title='Active Patients'
          value={metrics.activePatients.toLocaleString()}
          icon={Activity}
          color='bg-orange-500'
          subtitle='Currently registered'
        />
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Revenue Chart */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>
                Revenue Trends
              </h3>
              <p className='text-sm text-gray-600'>
                Monthly revenue over the year
              </p>
            </div>
            <TrendingUp className='h-5 w-5 text-green-500' />
          </div>

          <ResponsiveContainer width='100%' height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
              <XAxis
                dataKey='month'
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value) => `₦${value / 1000}k`}
              />
              <Tooltip
                formatter={(value) => [`₦${value.toLocaleString()}`, "Revenue"]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Line
                type='monotone'
                dataKey='amount'
                stroke='#10b981'
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#10b981", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Drugs Chart */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='flex items-center justify-between mb-6'>
            <div>
              <h3 className='text-lg font-semibold text-gray-900'>
                Most Purchased Drugs
              </h3>
              <p className='text-sm text-gray-600'>
                Top 5 drugs by sales volume
              </p>
            </div>
            <Pill className='h-5 w-5 text-blue-500' />
          </div>

          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={topDrugsData}>
              <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
              <XAxis
                dataKey='name'
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                angle={-45}
                textAnchor='end'
                height={60}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value, name) => [
                  name === "sales"
                    ? `${value} units`
                    : `₦${value.toLocaleString()}`,
                  name === "sales" ? "Units Sold" : "Revenue",
                ]}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
              <Bar dataKey='sales' fill='#3b82f6' radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h3 className='text-lg font-semibold text-gray-900 mb-4'>
          Quick Actions
        </h3>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div
            onClick={() => handleNavigate("/dashboard/patients/register")}
            className='flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer'>
            <Users className='h-8 w-8 text-blue-500 mb-2' />
            <span className='text-sm font-medium text-gray-700'>
              Register Patient
            </span>
          </div>

          <div
            onClick={() => handleNavigate("/dashboard/admin/lab")}
            className='flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer'>
            <FlaskConical className='h-8 w-8 text-purple-500 mb-2' />
            <span className='text-sm font-medium text-gray-700'>Lab Tests</span>
          </div>

          <div
            onClick={() => handleNavigate("/dashboard/pharmacy/pos")}
            className='flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer'>
            <Pill className='h-8 w-8 text-green-500 mb-2' />
            <span className='text-sm font-medium text-gray-700'>
              Pharmacy POS
            </span>
          </div>

          <div
            onClick={() => handleNavigate("/dashboard/inventory")}
            className='flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 cursor-pointer'>
            <Package className='h-8 w-8 text-orange-500 mb-2' />
            <span className='text-sm font-medium text-gray-700'>
              Manage Inventory
            </span>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Recent Lab Results
          </h3>
          <div className='space-y-3'>
            {[
              {
                id: 1001,
                test: "Blood Test",
                time: "2 hours ago",
                status: "Ready",
              },
              {
                id: 1002,
                test: "Urine Analysis",
                time: "3 hours ago",
                status: "Ready",
              },
              {
                id: 1003,
                test: "X-Ray",
                time: "4 hours ago",
                status: "Processing",
              },
              { id: 1004, test: "ECG", time: "5 hours ago", status: "Ready" },
            ].map((result) => (
              <div
                key={result.id}
                className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    {result.test} - Patient #{result.id}
                  </p>
                  <p className='text-xs text-gray-600'>
                    Completed {result.time}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    result.status === "Ready"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {result.status}
                </span>
              </div>
            ))}
          </div>
          <div
            onClick={() => handleNavigate("/dashboard/lab/results")}
            className='flex items-center justify-center mt-4 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-200 cursor-pointer'>
            View All Results
          </div>
        </div>

        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Low Stock Alerts
          </h3>
          <div className='space-y-3'>
            {[
              { name: "Paracetamol 500mg", stock: 15, type: "Medicine" },
              { name: "Blood Test Tubes", stock: 8, type: "Lab Supply" },
              { name: "Sterile Gloves", stock: 23, type: "Medical Supply" },
              { name: "Insulin Pens", stock: 5, type: "Medicine" },
            ].map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100'>
                <div>
                  <p className='text-sm font-medium text-gray-900'>
                    {item.name}
                  </p>
                  <p className='text-xs text-gray-600'>{item.type}</p>
                </div>
                <span className='px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full'>
                  {item.stock} left
                </span>
              </div>
            ))}
          </div>
          <div
            onClick={() => handleNavigate("/dashboard/inventory")}
            className='flex items-center justify-center mt-4 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-200 cursor-pointer'>
            Manage Inventory
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
