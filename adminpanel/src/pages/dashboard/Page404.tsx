import assets from '@/assets/images';
import { TopBar } from '@/components/TopBar';
import { SidebarInset } from '@/components/ui/sidebar';
import dashboardService from '@/services/adminapp/dashboard';
import { useEffect, useState } from 'react';

function Page404() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchActivity = async () => {
      const activity = await dashboardService.activity();
      if (activity.data.success) {
        setData(activity.data.data);
      }
    };
    fetchActivity();
  }, []);

  return (
    <div className="bg-white p-2 rounded-[20px] mt-5 records--wraps">
      <SidebarInset>
        <TopBar title="404" />
        <div className='flex justify-center items-center h-full flex-col'>
          <div className='w-[402px] h-[402px] mx-auto'>
            <img src={assets.images.errorPage1} className='w-full h-full object-contain' />
          </div>
          <h1 className='text-[60px] font-semibold leading-normal text-tertiary-bg '>Page Not Found</h1>
        </div>
      </SidebarInset>
    </div>
  );
}

export default Page404;
