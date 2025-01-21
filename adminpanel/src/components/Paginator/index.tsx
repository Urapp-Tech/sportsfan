import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
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
    <Pagination>
      <PaginationContent>
        {showPreviousNext && totalPages && page > 1 ? (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious onClick={() => onPageChange(currentPage - 1)} />
          </PaginationItem>
        ) : null}
        {showPreviousNext && totalPages && page !== total ? (
          <PaginationItem
            className={`${page === total && 'disabled bg-red'} cursor-pointer`}
          >
            <PaginationNext onClick={() => onPageChange(currentPage + 1)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
};
