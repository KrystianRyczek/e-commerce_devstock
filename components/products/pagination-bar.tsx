export default function PaginationBar() {
  return (
    <div className="flex justify-center items-center w-full py-[20px] gap-[8px]">
      <button className="px-[12px] py-[8px] bg-pagination-background text-pagination-text border-pagination-border border-2 rounded-md hover:cursor-pointer hover:bg-pagination-hover hover:text-pagination-hover-text">
        Previous
      </button>
      <button className="px-[12px] py-[8px] bg-pagination-background text-pagination-text border-pagination-border border-2 rounded-md hover:cursor-pointer hover:bg-pagination-hover hover:text-pagination-hover-text">
        1
      </button>
      <button className="px-[12px] py-[8px] bg-pagination-background text-pagination-text border-pagination-border border-2 rounded-md hover:cursor-pointer hover:bg-pagination-hover hover:text-pagination-hover-text">
        2
      </button>
      <button className="px-[12px] py-[8px] bg-pagination-background text-pagination-text border-pagination-border border-2 rounded-md hover:cursor-pointer hover:bg-pagination-hover hover:text-pagination-hover-text">
        3
      </button>
      <button className="px-[12px] py-[8px] bg-pagination-background text-pagination-text border-pagination-border border-2 rounded-md hover:cursor-pointer hover:bg-pagination-hover hover:text-pagination-hover-text">
        Next
      </button>
    </div>
  );
}
