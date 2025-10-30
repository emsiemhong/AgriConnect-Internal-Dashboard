import { useState } from 'react';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Label } from './ui/label';
import { Badge } from './ui/badge';

interface Farmer {
  id: string;
  name: string;
  location: string;
  contact: string;
  products: number;
  status: 'Active' | 'Inactive';
}

const initialFarmers: Farmer[] = [
  { id: 'F001', name: 'Sok Pisey', location: 'Kampong Cham', contact: '012-345-678', products: 12, status: 'Active' },
  { id: 'F002', name: 'Chan Dara', location: 'Siem Reap', contact: '012-456-789', products: 8, status: 'Active' },
  { id: 'F003', name: 'Vanna Srey', location: 'Battambang', contact: '012-567-890', products: 15, status: 'Active' },
  { id: 'F004', name: 'Kosal Pich', location: 'Kampot', contact: '012-678-901', products: 6, status: 'Inactive' },
  { id: 'F005', name: 'Sreymom Heng', location: 'Kandal', contact: '012-789-012', products: 10, status: 'Active' },
  { id: 'F006', name: 'Bunthoeun Ly', location: 'Prey Veng', contact: '012-890-123', products: 9, status: 'Active' },
];

export function FarmersPage() {
  const [farmers, setFarmers] = useState<Farmer[]>(initialFarmers);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState<Farmer | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    contact: '',
  });

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddFarmer = () => {
    const newFarmer: Farmer = {
      id: `F${String(farmers.length + 1).padStart(3, '0')}`,
      name: formData.name,
      location: formData.location,
      contact: formData.contact,
      products: 0,
      status: 'Active',
    };
    setFarmers([...farmers, newFarmer]);
    setIsAddDialogOpen(false);
    setFormData({ name: '', location: '', contact: '' });
  };

  const handleEditFarmer = () => {
    if (editingFarmer) {
      setFarmers(
        farmers.map((f) =>
          f.id === editingFarmer.id
            ? { ...f, name: formData.name, location: formData.location, contact: formData.contact }
            : f
        )
      );
      setIsEditDialogOpen(false);
      setEditingFarmer(null);
      setFormData({ name: '', location: '', contact: '' });
    }
  };

  const handleDeleteFarmer = (id: string) => {
    if (confirm('Are you sure you want to delete this farmer?')) {
      setFarmers(farmers.filter((f) => f.id !== id));
    }
  };

  const openEditDialog = (farmer: Farmer) => {
    setEditingFarmer(farmer);
    setFormData({ name: farmer.name, location: farmer.location, contact: farmer.contact });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2>Farmers Management</h2>
        <p className="text-gray-600">Manage all registered farmers in the system</p>
      </div>

      <Card className="rounded-xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Farmers</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 rounded-lg"
                />
              </div>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="rounded-lg"
                style={{ backgroundColor: '#5BA66B' }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Farmer
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Farmer ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Number of Products</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFarmers.map((farmer) => (
                <TableRow key={farmer.id}>
                  <TableCell>{farmer.id}</TableCell>
                  <TableCell>{farmer.name}</TableCell>
                  <TableCell>{farmer.location}</TableCell>
                  <TableCell>{farmer.contact}</TableCell>
                  <TableCell>{farmer.products}</TableCell>
                  <TableCell>
                    <Badge
                      className="rounded-lg"
                      variant={farmer.status === 'Active' ? 'default' : 'secondary'}
                      style={farmer.status === 'Active' ? { backgroundColor: '#5BA66B' } : {}}
                    >
                      {farmer.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(farmer)}
                        className="rounded-lg"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteFarmer(farmer.id)}
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

      {/* Add Farmer Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Add New Farmer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Farmer Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter farmer name"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter location"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Info</Label>
              <Input
                id="contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Enter phone number"
                className="rounded-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleAddFarmer} className="rounded-lg" style={{ backgroundColor: '#5BA66B' }}>
              Add Farmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Farmer Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle>Edit Farmer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Farmer Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter farmer name"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-location">Location</Label>
              <Input
                id="edit-location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Enter location"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-contact">Contact Info</Label>
              <Input
                id="edit-contact"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                placeholder="Enter phone number"
                className="rounded-lg"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="rounded-lg">
              Cancel
            </Button>
            <Button onClick={handleEditFarmer} className="rounded-lg" style={{ backgroundColor: '#5BA66B' }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
