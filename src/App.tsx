import { useState } from 'react';
import { Login } from './components/login';
import { DashboardLayout } from './components/dashboard-layout';
import { DashboardHome } from './components/dashboard-home';
import { FarmersPage } from './components/farmers-page';
import { ProductsPage } from './components/products-page';
import { OrdersPage } from './components/orders-page';
import { ReportsPage } from './components/reports-page';
import { SettingsPage } from './components/settings-page';
import { UserManagementPage } from './components/user-management-page';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'farmers':
        return <FarmersPage />;
      case 'products':
        return <ProductsPage />;
      case 'orders':
        return <OrdersPage />;
      case 'reports':
        return <ReportsPage />;
      case 'users':
        return <UserManagementPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardHome />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={handleNavigate} onLogout={handleLogout}>
      {renderPage()}
    </DashboardLayout>
  );
}
