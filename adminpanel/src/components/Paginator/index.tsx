import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';

type PaginatorProps = {
  currentPage: number | any;
  pageSize?: number | any;
  totalPages: number | any;
  onPageChange: (pageNumber: number) => void;
  showPreviousNext: boolean;
};

export const Paginator = ({
  currentPage,
  pageSize,
  totalPages,
  onPageChange,
  showPreviousNext,
}: PaginatorProps) => {
  const total = Math.ceil(totalPages / pageSize);
  const page = currentPage + 1;
  // console.log('totalPages', pageSize);
  return (
    // <Pagination>
    //   <PaginationContent>
    //     {/* {showPreviousNext && totalPages && page > 1 ? ( */}
    //     <PaginationItem className="cursor-pointer">
    //       <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
    //     </PaginationItem>
    //     {/* ) : null} */}
    //     {/* {showPreviousNext && totalPages && page !== total ? ( */}
    //     <PaginationItem
    //       className={`${page === total && 'disabled bg-red'} cursor-pointer`}
    //     >
    //       <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
    //     </PaginationItem>
    //     {/* ) : null} */}
    //   </PaginationContent>
    // </Pagination>
    <Pagination>
      <PaginationContent className='bg-earth-bg h-[51px] rounded-[30px]'>
        <PaginationItem>
          <PaginationPrevious href="#" className='bg-mars-bg/50 text-lunar-bg rounded-[50%] hover:bg-mars-bg/50 hover:text-lunar-bg' />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className='text-lunar-bg text-[14px] leading-5 font-semibold hover:bg-transparent hover:text-lunar-bg'>1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className='text-lunar-bg text-[14px] leading-5 font-semibold hover:bg-transparent hover:text-lunar-bg '>2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className='text-lunar-bg text-[14px] leading-5 font-semibold hover:bg-transparent hover:text-lunar-bg'>3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className='text-lunar-bg text-[14px] leading-5 font-semibold hover:bg-transparent hover:text-lunar-bg '>4</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" className='text-lunar-bg text-[14px] leading-5 font-semibold hover:bg-transparent hover:text-lunar-bg'>5</PaginationLink>
        </PaginationItem>
        {/* <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem> */}
        <PaginationItem>
          <PaginationNext href="#" className='bg-lunar-bg text-quinary-bg rounded-[50%] hover:bg-lunar-bg hover:text-quinary-bg' />
        </PaginationItem>
      </PaginationContent>
    </Pagination>

  );
};
