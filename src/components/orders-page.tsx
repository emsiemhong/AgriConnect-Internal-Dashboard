import { useState } from 'react';
import { Search, Eye, Trash2, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface OrderItem {
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customer: string;
  farmer: string;
  total: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  items: OrderItem[];
}

const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'Vanna Market',
    farmer: 'Sok Pisey',
    total: 450,
    date: '2025-10-27',
    status: 'Completed',
    items: [
      { productName: 'Organic Rice', quantity: 100, price: 2.5 },
      { productName: 'Fresh Tomatoes', quantity: 100, price: 1.2 },
    ],
  },
  {
    id: 'ORD-002',
    customer: 'Phnom Penh Fresh',
    farmer: 'Chan Dara',
    total: 320,
    date: '2025-10-27',
    status: 'Pending',
    items: [
      { productName: 'Cucumbers', quantity: 200, price: 0.8 },
      { productName: 'Fresh Tomatoes', quantity: 100, price: 1.2 },
    ],
  },
  {
    id: 'ORD-003',
    customer: 'Central Grocery',
    farmer: 'Vanna Srey',
    total: 780,
    date: '2025-10-26',
    status: 'Completed',
    items: [
      { productName: 'Green Beans', quantity: 300, price: 1.8 },
      { productName: 'Cucumbers', quantity: 150, price: 0.8 },
    ],
  },
  {
    id: 'ORD-004',
    customer: 'Local Market Co.',
    farmer: 'Sreymom Heng',
    total: 210,
    date: '2025-10-26',
    status: 'Cancelled',
    items: [{ productName: 'Bananas', quantity: 210, price: 1.0 }],
  },
  {
    id: 'ORD-005',
    customer: 'Green Valley Store',
    farmer: 'Bunthoeun Ly',
    total: 560,
    date: '2025-10-25',
    status: 'Completed',
    items: [
      { productName: 'Corn', quantity: 200, price: 1.5 },
      { productName: 'Organic Rice', quantity: 100, price: 2.5 },
    ],
  },
];

export function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDate = !dateFilter || order.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsDialogOpen(true);
  };

  const handleUpdateStatus = (orderId: string, newStatus: 'Pending' | 'Completed' | 'Cancelled') => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)));
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Orders Management</h2>
        <p className="text-gray-600">Manage all customer orders in the system</p>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Orders</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="pl-10 w-48 rounded-lg"
                />
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by customer or order ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 rounded-lg"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Farmer</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.farmer}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) =>
                        handleUpdateStatus(order.id, value as 'Pending' | 'Completed' | 'Cancelled')
                      }
                    >
                      <SelectTrigger className="w-32 rounded-lg">
                        <Badge
                          className="rounded-lg w-full"
                          variant={
                            order.status === 'Completed'
                              ? 'default'
                              : order.status === 'Pending'
                              ? 'secondary'
                              : 'destructive'
                          }
                          style={order.status === 'Completed' ? { backgroundColor: '#5BA66B' } : {}}
                        >
                          {order.status}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(order)}
                        className="rounded-lg"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteOrder(order.id)}
                        className="rounded-lg text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="rounded-xl max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <p>{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Customer</p>
                  <p>{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Farmer</p>
                  <p>{selectedOrder.farmer}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Order Date</p>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <Badge
                    className="rounded-lg"
                    variant={
                      selectedOrder.status === 'Completed'
                        ? 'default'
                        : selectedOrder.status === 'Pending'
                        ? 'secondary'
                        : 'destructive'
                    }
                    style={selectedOrder.status === 'Completed' ? { backgroundColor: '#5BA66B' } : {}}
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p>${selectedOrder.total.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <h3 className="mb-4">Ordered Products</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
