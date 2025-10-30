import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  farmer: string;
  status: 'In Stock' | 'Out of Stock';
}

const initialProducts: Product[] = [
  { id: 'P001', name: 'Organic Rice', category: 'Grains', price: 2.5, quantity: 500, farmer: 'Sok Pisey', status: 'In Stock' },
  { id: 'P002', name: 'Fresh Tomatoes', category: 'Vegetables', price: 1.2, quantity: 200, farmer: 'Chan Dara', status: 'In Stock' },
  { id: 'P003', name: 'Green Beans', category: 'Vegetables', price: 1.8, quantity: 0, farmer: 'Vanna Srey', status: 'Out of Stock' },
  { id: 'P004', name: 'Mangoes', category: 'Fruits', price: 3.0, quantity: 150, farmer: 'Sreymom Heng', status: 'In Stock' },
  { id: 'P005', name: 'Corn', category: 'Grains', price: 1.5, quantity: 300, farmer: 'Bunthoeun Ly', status: 'In Stock' },
  { id: 'P006', name: 'Cucumbers', category: 'Vegetables', price: 0.8, quantity: 180, farmer: 'Chan Dara', status: 'In Stock' },
  { id: 'P007', name: 'Bananas', category: 'Fruits', price: 1.0, quantity: 0, farmer: 'Sreymom Heng', status: 'Out of Stock' },
];

const topProducts = [
  { name: 'Organic Rice', sales: 450 },
  { name: 'Mangoes', sales: 380 },
  { name: 'Corn', sales: 320 },
  { name: 'Fresh Tomatoes', sales: 280 },
  { name: 'Cucumbers', sales: 240 },
];

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    farmer: '',
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status.toLowerCase().replace(' ', '-') === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `P${String(products.length + 1).padStart(3, '0')}`,
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      farmer: formData.farmer,
      status: parseInt(formData.quantity) > 0 ? 'In Stock' : 'Out of Stock',
    };
    setProducts([...products, newProduct]);
    setIsAddDialogOpen(false);
    setFormData({ name: '', category: '', price: '', quantity: '', farmer: '' });
  };

  const handleEditProduct = () => {
    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formData.name,
                category: formData.category,
                price: parseFloat(formData.price),
                quantity: parseInt(formData.quantity),
                farmer: formData.farmer,
                status: parseInt(formData.quantity) > 0 ? 'In Stock' : 'Out of Stock',
              }
            : p
        )
      );
      setIsEditDialogOpen(false);
      setEditingProduct(null);
      setFormData({ name: '', category: '', price: '', quantity: '', farmer: '' });
    }
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      quantity: product.quantity.toString(),
      farmer: product.farmer,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Products Management</h2>
        <p className="text-gray-600">Manage all products in the system</p>
      </div>

      {/* Top Selling Products Chart */}
      <Card className="rounded-xl">
        <CardHeader>
          <CardTitle>Top 5 Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topProducts} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E0E0E0" />
              <XAxis type="number" stroke="#666" />
              <YAxis type="category" dataKey="name" stroke="#666" width={120} />
              <Tooltip />
              <Bar dataKey="sales" fill="#5BA66B" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Products</CardTitle>
            <div className="flex gap-3">
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                  className="rounded-lg"
                  style={statusFilter === 'all' ? { backgroundColor: '#5BA66B' } : {}}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'in-stock' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('in-stock')}
                  className="rounded-lg"
                  style={statusFilter === 'in-stock' ? { backgroundColor: '#5BA66B' } : {}}
                >
                  In Stock
                </Button>
                <Button
                  variant={statusFilter === 'out-of-stock' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('out-of-stock')}
                  className="rounded-lg"
                  style={statusFilter === 'out-of-stock' ? { backgroundColor: '#5BA66B' } : {}}
                >
                  Out of Stock
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 rounded-lg"
                />
              </div>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="rounded-lg"
                style={{ backgroundColor: '#5BA66B' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product ID</TableHead>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price (USD)</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Farmer Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.farmer}</TableCell>
                  <TableCell>
                    <Badge
                      className="rounded-lg"
                      variant={product.status === 'In Stock' ? 'default' : 'secondary'}
                      style={product.status === 'In Stock' ? { backgroundColor: '#5BA66B' } : {}}
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(product)}
                        className="rounded-lg"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id)}
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

      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="product-name">Product Name</Label>
              <Input
                id="product-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Herbs">Herbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>
              <Input
                id="price"
                type="number"
                step="0.1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter price"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Enter quantity"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="farmer">Linked Farmer</Label>
              <Input
                id="farmer"
                value={formData.farmer}
                onChange={(e) => setFormData({ ...formData, farmer: e.target.value })}
                placeholder="Enter farmer name"
                className="rounded-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleAddProduct} className="rounded-lg" style={{ backgroundColor: '#5BA66B' }}>
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-product-name">Product Name</Label>
              <Input
                id="edit-product-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter product name"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger className="rounded-lg">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vegetables">Vegetables</SelectItem>
                  <SelectItem value="Fruits">Fruits</SelectItem>
                  <SelectItem value="Grains">Grains</SelectItem>
                  <SelectItem value="Herbs">Herbs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-price">Price (USD)</Label>
              <Input
                id="edit-price"
                type="number"
                step="0.1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Enter price"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-quantity">Quantity</Label>
              <Input
                id="edit-quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Enter quantity"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-farmer">Linked Farmer</Label>
              <Input
                id="edit-farmer"
                value={formData.farmer}
                onChange={(e) => setFormData({ ...formData, farmer: e.target.value })}
                placeholder="Enter farmer name"
                className="rounded-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleEditProduct} className="rounded-lg" style={{ backgroundColor: '#5BA66B' }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
