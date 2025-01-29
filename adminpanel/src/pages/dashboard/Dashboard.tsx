import assets from '@/assets/images';
import { TopBar } from '@/components/TopBar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarInset } from '@/components/ui/sidebar';
import dashboardService from '@/services/adminapp/dashboard';
import { useEffect, useState } from 'react';

function Dashboard() {
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
        <TopBar title="Dashboard" />
        <div className="p-4">
          <h2 className='text-[20px] leading-[28px] text-tertiary-bg font-semibold'>Dashboard</h2>
          {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video p-3 rounded-xl bg-muted/50">
              <Label className="text-xl" htmlFor="activeCabin">
                <Monitor /> Active Cabins
              </Label>
              <div className="flex items-center justify-center mt-[15%]">
                <span className="text-4xl font-semibold">
                  {data?.totalActiveCabins}
                </span>
              </div>
            </div>
            <div className="aspect-video p-3 rounded-xl bg-muted/50">
              <Label className="text-xl" htmlFor="activeCabin">
                <MonitorCheck /> Active Assigned Cabins
              </Label>
              <div className="flex items-center justify-center mt-[15%]">
                <span className="text-4xl font-semibold">
                  {data?.totalActiveAssignedCabins}
                </span>
              </div>
            </div>
            <div className="aspect-video p-3 rounded-xl bg-muted/50">
              <Label className="text-xl" htmlFor="activeCabin">
                <Users /> Active Employees
              </Label>
              <div className="flex items-center justify-center mt-[15%]">
                <span className="text-4xl font-semibold">
                  {data?.totalActiveEmployees}
                </span>
              </div>
            </div>
          </div> */}
          {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
          <div className='flex mt-[40px]'>
            <div className='w-[40%] flex items-center gap-3'>
              <div className='w-[130px] h-[185px]'>
                <img src={assets.images.peguinIcon} className='w-full h-full object-contain' />
              </div>
              <div className='pt-3'>
                <div className='text-[32px] font-bold leading-normal text-tertiary-bg'>
                  Hey, <span className='text-lunar-bg'>Darby</span>
                  <span className='block'>good evening !</span>
                </div>
                <div className='my-3 flex items-center gap-3 bg-earth-bg p-2 rounded-[11px]'>
                  <div className='w-[35px] h-[37px]'>
                    <img src={assets.images.woofletIcon} className='w-full h-full max-w-full object-contain' />
                  </div>
                  <p className='text-[7px] font-normal text-tertiary-bg leading-normal max-w-[252px]'>
                    Voluptatem ut fugit eveniet veritatis dolorem accusantium mollitia. Molestiae autem sit in quis unde et. Sit aut odit neque sunt. Non libero tempore repellat sit praesentium earum et eveniet officiis.
                  </p>
                </div>
              </div>
            </div>
            <div className='w-[60%] flex justify-between items-center max-w-[600px] ml-auto mr-0'>
              <div className='w-[184px] h-[168px] rounded-[20px] bg-venus-bg/100 py-3 px-5 flex flex-col justify-between'>
                <div className='flex justify-between items-center'>
                  <span className='text-[14px] font-bold leading-[18px] text-quinary-bg capitalize'>
                    total users
                  </span>
                  <span>
                    <img src={assets.images.userIcon} className='w-full h-full object-contain' />
                  </span>
                </div>
                <div className=' text-[56px] font-medium leading-[62px] text-quinary-bg'>
                  349
                </div>
              </div>

              <div className='w-[184px] h-[168px] rounded-[20px] bg-venus-bg/100 py-3 px-5 flex flex-col justify-between'>
                <div className='flex justify-between items-center'>
                  <span className='text-[14px] font-bold leading-[18px] text-quinary-bg capitalize'>
                    total admin users
                  </span>
                  <span>
                    <img src={assets.images.userIcon} className='w-full h-full object-contain' />
                  </span>
                </div>
                <div className=' text-[56px] font-medium leading-[62px] text-quinary-bg'>
                  05
                </div>
              </div>

              <div className='w-[184px] h-[168px] rounded-[20px] bg-venus-bg/100 py-3 px-5 flex flex-col justify-between'>
                <div className='flex justify-between items-center'>
                  <span className='text-[14px] font-bold leading-[18px] text-quinary-bg capitalize'>
                    total pages
                  </span>
                  {/* <span>
                    <img src={assets.images.userIcon} className='w-full h-full object-contain' />
                  </span> */}
                </div>
                <div className=' text-[56px] font-medium leading-[62px] text-quinary-bg'>
                  14
                </div>
              </div>
            </div>
          </div>
          {/* second-row */}
          <div className='mt-[30px] flex justify-between items-center gap-3'>
            <div className='w-[50%] bg-earth-bg p-6 rounded-[20px] min-h-[432px]'>
              <div className='flex mb-5 justify-between'>
                <h3 className='text-[20px] leading-[28px] text-tertiary-bg font-semibold'>Analytics 2024</h3>
                <div className='w-[120px]'>
                  <Select>
                    <SelectTrigger className="w-full bg-transparent border-0 text-tertiary-bg focus:border-0">
                      <SelectValue placeholder="Theme" className='font-bold text-tertiary-bg text-[12px] focus:border-0' />
                    </SelectTrigger>
                    <SelectContent className="select-contents text-tertiary-bg focus:border-0">
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>


              </div>
              <div className='w-full mx-auto'>
                <img src={assets.images.chartOne} />
              </div>
            </div>
            <div className='w-[50%] bg-earth-bg  p-6 rounded-[20px] min-h-[432px]'>
              <div className='mb-5'>
                <h3 className='text-[20px] leading-[32px] text-tertiary-bg font-semibold'>Game Appeal</h3>
                <span className='block text-[12px] font-normal leading-3 text-tertiary-bg/100'>on Behalf of Users</span>
              </div>
              <div className='w-[283px] h-[283px] mx-auto'>
                <img src={assets.images.chartTwo} className='w-full h-full object-contain' />
              </div>
              <div className='flex mt-[20px] justify-between items-center px-2'>
                <div className='w-[30%] flex gap-4 items-center'>
                  <span className='block w-[18px] h-[18px] rounded-[50px] bg-venus-bg text-venus-bg '></span>
                  <span className='text-[10px] font-medium leading-3 text-tertiary-bg'>BasketBall</span>
                </div>
                <div className='w-[30%] flex gap-1 items-center'>
                  <span className='block w-[18px] h-[18px] rounded-[50px] bg-lunar-bg text-venus-bg '></span>
                  <span className='text-[10px] font-medium leading-3 text-tertiary-bg'>Rugby</span>
                </div>
                <div className='w-[30%] flex gap-1 items-center'>
                  <span className='block w-[18px] h-[18px] rounded-[50px] bg-neptune-bg text-venus-bg '></span>
                  <span className='text-[10px] font-medium leading-3 text-tertiary-bg'>Cricket</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
}

export default Dashboard;
