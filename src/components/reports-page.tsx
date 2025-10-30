import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { PieChart, Pie, Cell, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const productCategoriesData = [
  { name: 'Vegetables', value: 45, color: '#5BA66B' },
  { name: 'Fruits', value: 30, color: '#7BC47F' },
  { name: 'Grains', value: 20, color: '#9FD8A4' },
  { name: 'Herbs', value: 5, color: '#C3E8C7' },
];

const monthlySalesData = [
  { month: 'Jan', sales: 32000 },
  { month: 'Feb', sales: 38000 },
  { month: 'Mar', sales: 35000 },
  { month: 'Apr', sales: 42000 },
  { month: 'May', sales: 48000 },
  { month: 'Jun', sales: 45230 },
];

const topFarmersData = [
  { name: 'Sok Pisey', sales: 12500 },
  { name: 'Vanna Srey', sales: 10800 },
  { name: 'Sreymom Heng', sales: 9200 },
  { name: 'Chan Dara', sales: 7600 },
  { name: 'Bunthoeun Ly', sales: 6400 },
];

export function ReportsPage() {
  const [dateRange, setDateRange] = useState('this-month');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2>Reports & Analytics</h2>
          <p className="text-gray-600">View detailed reports and insights</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={dateRange === 'this-month' ? 'default' : 'outline'}
            onClick={() => setDateRange('this-month')}
            className="rounded-lg"
            style={dateRange === 'this-month' ? { backgroundColor: '#5BA66B' } : {}}
          >
            This Month
          </Button>
          <Button
            variant={dateRange === 'last-month' ? 'default' : 'outline'}
            onClick={() => setDateRange('last-month')}
            className="rounded-lg"
            style={dateRange === 'last-month' ? { backgroundColor: '#5BA66B' } : {}}
          >
            Last Month
          </Button>
          <Button
            variant={dateRange === 'custom' ? 'default' : 'outline'}
            onClick={() => setDateRange('custom')}
            className="rounded-lg"
            style={dateRange === 'custom' ? { backgroundColor: '#5BA66B' } : {}}
          >
            Custom
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Categories Pie Chart */}
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Product Categories by Quantity</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={productCategoriesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {productCategoriesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {productCategoriesData.map((category) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Sales Over Time */}
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Monthly Sales Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#5BA66B" strokeWidth={3} name="Sales ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Farmers */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Top Performing Farmers by Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={topFarmersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#5BA66B" radius={[8, 8, 0, 0]} name="Total Sales ($)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-2xl mt-2" style={{ color: '#5BA66B' }}>
              $273,230
            </p>
            <p className="text-sm text-gray-500 mt-1">+12% from last period</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Average Order Value</p>
            <p className="text-2xl mt-2" style={{ color: '#5BA66B' }}>
              $319
            </p>
            <p className="text-sm text-gray-500 mt-1">+5% from last period</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl">
          <CardContent className="p-6">
            <p className="text-sm text-gray-600">Active Farmers</p>
            <p className="text-2xl mt-2" style={{ color: '#5BA66B' }}>
              248
            </p>
            <p className="text-sm text-gray-500 mt-1">+8 new this month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
