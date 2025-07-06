
import React, { useState } from 'react';
import { DataProvider, useData } from './contexts/DataContext.tsx';
import LoginPage from './components/LoginPage.tsx';
import DashboardPage from './components/DashboardPage.tsx';
import CustomerDetailsPage from './components/CustomerDetailsPage.tsx';
import UserManagementPage from './components/UserManagementPage.tsx';
import ReportsPage from './components/ReportsPage.tsx';
import { Role } from './types.ts';

enum Page {
  DASHBOARD,
  CUSTOMER_DETAILS,
  USER_MANAGEMENT,
  REPORTS,
}

const AppContent: React.FC = () => {
  const { currentUser, logout } = useData();
  const [currentPage, setCurrentPage] = useState<Page>(Page.DASHBOARD);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomerId(customerId);
    setCurrentPage(Page.CUSTOMER_DETAILS);
  };

  const handleBackToDashboard = () => {
    setSelectedCustomerId(null);
    setCurrentPage(Page.DASHBOARD);
  };

  const handleGoToUserManagement = () => {
    setCurrentPage(Page.USER_MANAGEMENT);
  };
  
  const handleGoToReports = () => {
    setCurrentPage(Page.REPORTS);
  };

  if (!currentUser) {
    return <LoginPage />;
  }

  const renderPage = () => {
    const dashboardProps = {
        onSelectCustomer: handleSelectCustomer,
        onGoToUserManagement: handleGoToUserManagement,
        onGoToReports: handleGoToReports
    };
    switch (currentPage) {
      case Page.CUSTOMER_DETAILS:
        return selectedCustomerId ? (
          <CustomerDetailsPage customerId={selectedCustomerId} onBack={handleBackToDashboard} />
        ) : (
          <DashboardPage {...dashboardProps} />
        );
      case Page.USER_MANAGEMENT:
        return <UserManagementPage onBack={handleBackToDashboard} />;
       case Page.REPORTS:
        return <ReportsPage onBack={handleBackToDashboard} />;
      case Page.DASHBOARD:
      default:
        return <DashboardPage {...dashboardProps} />;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen text-slate-800" dir="rtl">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <h1 className="text-2xl font-bold text-slate-700">برنامج متابعة العملاء</h1>
                <div className="flex items-center space-x-4 space-x-reverse">
                    <span className="text-slate-600">مرحباً, {currentUser.username}</span>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                         تسجيل الخروج
                    </button>
                </div>
            </div>
        </div>
      </header>
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <DataProvider>
    <AppContent />
  </DataProvider>
);

export default App;