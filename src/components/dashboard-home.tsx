import { Users, Package, ShoppingCart, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Badge } from './ui/badge';

const statsData = [
  { title: 'Total Farmers', value: '248', icon: Users, color: '#5BA66B' },
  { title: 'Total Products', value: '1,432', icon: Package, color: '#5BA66B' },
  { title: 'Total Orders', value: '856', icon: ShoppingCart, color: '#5BA66B' },
  { title: 'Total Sales This Month', value: '$45,230', icon: DollarSign, color: '#5BA66B' },
];

const salesData = [
  { month: 'Jan', sales: 32000 },
  { month: 'Feb', sales: 38000 },
  { month: 'Mar', sales: 35000 },
  { month: 'Apr', sales: 42000 },
  { month: 'May', sales: 48000 },
  { month: 'Jun', sales: 45230 },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Vanna Market', date: '2025-10-27', amount: '$450', status: 'Completed' },
  { id: 'ORD-002', customer: 'Phnom Penh Fresh', date: '2025-10-27', amount: '$320', status: 'Pending' },
  { id: 'ORD-003', customer: 'Central Grocery', date: '2025-10-26', amount: '$780', status: 'Completed' },
  { id: 'ORD-004', customer: 'Local Market Co.', date: '2025-10-26', amount: '$210', status: 'Cancelled' },
  { id: 'ORD-005', customer: 'Green Valley Store', date: '2025-10-25', amount: '$560', status: 'Completed' },
];

export function DashboardHome() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Dashboard Overview</h2>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="rounded-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl mt-2">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-lg" style={{ backgroundColor: `${stat.color}20` }}>
                    <Icon className="h-6 w-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Monthly Sales Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#5BA66B" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="rounded-xl">
          <CardHeader>
            <CardTitle>Sales by Month</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
                <XAxis dataKey="month" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Bar dataKey="sales" fill="#5BA66B" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders Table */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.amount}</TableCell>
                  <TableCell>
                    <Badge
                      className="rounded-lg"
                      variant={
                        order.status === 'Completed'
                          ? 'default'
                          : order.status === 'Pending'
                          ? 'secondary'
                          : 'destructive'
                      }
                      style={
                        order.status === 'Completed'
                          ? { backgroundColor: '#5BA66B' }
                          : {}
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
