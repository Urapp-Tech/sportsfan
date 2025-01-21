import { Navigate, Outlet } from 'react-router-dom';
import { MainSidebar } from '@/components/SideBar/index';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useSelector } from 'react-redux';
import { Toaster } from '@/components/ui/toaster';

function AppLayout() {
  const authState: any = useSelector((state: any) => state.authState);
  if (!authState.user) {
    return <Navigate to="/auth" />;
  }

  return (
    <SidebarProvider>
      <MainSidebar />
      <Toaster />
      <div className="w-full mt-20">
        <Outlet />
      </div>
    </SidebarProvider>
  );
}

export default AppLayout;
