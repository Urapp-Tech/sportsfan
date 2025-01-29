import assets from "@/assets/images"
import { TopBar } from "@/components/TopBar"
import { Button } from "@/components/ui/button"
import { SidebarInset } from "@/components/ui/sidebar"

const Order = () => {
    return (
        <div className=" bg-quinary-bg p-2 rounded-[20px] shadow-2xl mt-5  records--wraps">
            <TopBar title="Admin Users" />
            <SidebarInset className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <div className="w-full">
                    <div className="flex items-center py-4 justify-between">
                        <h2 className="text-tertiary-bg font-semibold text-[20px] leading-normal capitalize">
                            Order Details
                        </h2>

                        <Button

                            className="ml-auto w-[111px] h-[35px] bg-venus-bg rounded-[20px] text-[12px] leading-[16px] font-semibold text-quinary-bg"
                            variant={'outline'}
                        >
                            Back
                        </Button>

                    </div>
                    <div className="flex gap-2 ">
                        <div className="w-[70%] bg-earth-bg rounded-[10px] p-4 h-[270px]">
                            <div className="my-2">
                                <span className="text-[16px] font-semibold leading-[19px] text-tertiary-bg block mb-3">Order#0410089</span>
                                <div className="flex gap-3">
                                    <span className="block w-[13px] h-[13px]">
                                        <img src={assets.images.calenderIcon} alt="icon" className="w-full h-full object-contain" />
                                    </span>
                                    <span className="text-[12px] font-medium leading-[15px] text-lunar-bg">
                                        02 July 2024  02:32 pm
                                    </span>
                                </div>

                            </div>
                            <div className="my-2 mt-[50px]">
                                <div className="flex gap-2 border-b-2 border-mars-bg pb-2 pl-4">
                                    <div className="w-[20%]">
                                        <span className="text-[12px] font-medium leading-[15px] text-lunar-bg">#</span>
                                    </div>
                                    <div className="w-[70%]">
                                        <span className="text-[12px] font-medium leading-[15px] text-lunar-bg">Item Details</span>
                                    </div>
                                    <div className="w-[10%]">
                                        <span className="text-[12px] font-medium leading-[15px] text-lunar-bg">Price</span>
                                    </div>
                                </div>
                                <div className="flex gap-2 my-2 pl-4 py-2">
                                    <div className="w-[20%]">
                                        <span className="text-[12px] font-medium leading-[15px] text-tertiary-bg">86549273</span>
                                    </div>
                                    <div className="w-[70%]">
                                        <div className="max-w-[280px] flex items-center gap-3">
                                            <div className="w-[64px] h-[59px] rounded-[5px]">
                                                <img src={assets.images.avatarTwo} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="">
                                                <span className="block mb-1 text-tertiary-bg text-[12px] font-medium leading-[16px]">Snug Knit Woolen Cap</span>
                                                <span className="text-tertiary-bg text-[12px] font-medium leading-[16px]">01 X $10.95</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-[10%]">
                                        <span className="text-[12px] font-medium leading-[15px] text-tertiary-bg ">$9.95</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[30%] ">
                            <div className="mt-0 mb-2 p-3  bg-earth-bg rounded-[10px]">
                                <span className="text-[16px] font-semibold leading-[19px] text-tertiary-bg block mb-3">Customer info</span>
                                <div className="flex gap-3 items-center border-b-2 border-mars-bg pb-3">
                                    <span className="block w-[77px] h-[77px]">
                                        <img src={assets.images.avatarThree} alt="icon" className="w-full h-full object-contain" />
                                    </span>
                                    <div className="text-[12px] font-medium leading-[15px] text-lunar-bg">
                                        <span className="block text-[12px] font-medium leading-[15px] text-tertiary-bg mb-1">Alaya Ahmed</span>
                                        <span className="block text-[12px] font-medium leading-[15px] text-tertiary-bg mb-1">0213 4567 985 </span>
                                        <span className="block text-[12px] font-medium leading-[15px] text-tertiary-bg mb-1">Bay 29 Street 701 | California</span>
                                    </div>
                                </div>
                                <span className="block text-[14px] font-semibold leading-[19px] text-tertiary-bg py-2">Delivery info</span>
                                <div className="text-[12px] font-medium leading-[15px] text-lunar-bg my-2">
                                    <div className="block text-[12px] font-medium leading-[15px] text-tertiary-bg mb-1"> <label className="text-lunar-bg mr-1">Name</label> <span>Alaya Ahmed</span></div>
                                    <div className="block text-[12px] font-medium leading-[15px] text-tertiary-bg mb-1"> <label className="text-lunar-bg  mr-1">Phone</label> <span>0213 4567 985 </span></div>
                                    <div className="block text-[12px] font-medium leading-[15px] text-tertiary-bg mb-1"> <label className="text-lunar-bg  mr-1">Shipping Address</label><span> Bay 29 Street 701 | California</span></div>
                                    <div className="block text-[12px] font-medium leading-[15px] text-tertiary-bg mb-1"> <label className="text-lunar-bg  mr-1">Billing Address</label><span> Bay 29 Street 701 | California</span></div>
                                </div>
                            </div>
                            <div className="my-3 w-full rounded-[10px] p-3  bg-earth-bg">
                                <span className="block mb-2 text-[16px] font-semibold leading-[19px] text-tertiary-bg">Total Amount</span>
                                <span className="block border-b-2 border-mars-bg mb-3"></span>
                                <div className="text-[12px] font-medium leading-[15px]  mb-3 flex justify-between items-center"> <label className="text-tertiary-bg mr-1">Payment status</label> <span className="bg-[#D9FFDD] text-saturn-bg p-1 rounded-[20px] font-bold">Paid</span></div>
                                <div className="text-[12px] font-medium leading-[15px] text-tertiary-bg mb-1 flex justify-between items-center"> <label className="text-[13px] text-tertiary-bg mr-1">Sub Total</label> <span className="font-bold" >$400.00</span></div>
                                <span className="block border-b-2 border-mars-bg my-3"></span>
                                <div className=" text-[12px] font-medium leading-[15px] text-tertiary-bg mb-1 flex justify-between items-center"> <label className="text-[18px] font-medium leading-normal text-tertiary-bg mr-1">Total</label> <span className="text-[18px] font-bold leading-[22px] text-tertiary-bg">$410.00</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>


        </div>
    )
}

export default Order