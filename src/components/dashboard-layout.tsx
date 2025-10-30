import { ReactNode } from 'react';
import { LayoutDashboard, Users, Package, ShoppingCart, BarChart3, Settings, UserCog, LogOut, Bell } from 'lucide-react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';

interface DashboardLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'farmers', label: 'Farmers', icon: Users },
  { id: 'products', label: 'Products', icon: Package },
  { id: 'orders', label: 'Orders', icon: ShoppingCart },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'users', label: 'User Management', icon: UserCog },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function DashboardLayout({ children, currentPage, onNavigate, onLogout }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F3EE' }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <h1 className="text-[#5BA66B]">AgriConnect Dashboard</h1>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-lg">
              <Bell className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm">Sophea Chan</p>
                <p className="text-xs text-gray-500">Admin Staff</p>
              </div>
              <Avatar>
                <AvatarFallback style={{ backgroundColor: '#5BA66B', color: 'white' }}>SC</AvatarFallback>
              </Avatar>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="rounded-lg"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={isActive ? { backgroundColor: '#5BA66B' } : {}}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
