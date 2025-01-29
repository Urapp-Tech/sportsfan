import assets from '@/assets/images';

function Without404() {


  return (
    <div className="bg-white p-2 rounded-[20px] mt-5 records--wraps">
      <div className='flex justify-center items-center h-full flex-col'>
        <div className='w-[402px] h-[402px] mx-auto'>
          <img src={assets.images.errorPage1} className='w-full h-full object-contain' />
        </div>
        <h1 className='text-[60px] font-semibold leading-normal text-tertiary-bg '>Page Not Found</h1>
      </div>
    </div>
  );
}

export default Without404;
