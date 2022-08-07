import React, { useEffect, } from 'react'
import ReactPaginate from 'react-paginate'

type props = {
  currentPage: number,
  setCurrentPage: (arg: number) => void,
  totalPageCount: number,
  searchValue: string,
  fetchBookData: (value: string, page: number) => void,
}

const MyPaginate = (props: props) => {
  const {
    currentPage,
    setCurrentPage,
    totalPageCount,
    searchValue,
    fetchBookData,
  } = props

  const onPageChange = (event: any) => {
    const selectedPage = event.selected + 1
    setCurrentPage(selectedPage)
  }

  useEffect(() => {
    fetchBookData(searchValue, currentPage)
    setCurrentPage(currentPage)
  }, [currentPage])

  return (
    <div>
      <ReactPaginate
        className='mb-2 flex justify-center text-xl p-1 text-slate-800 space-x-1'
        breakLabel="..."
        forcePage={currentPage - 1}
        disableInitialCallback={true}
        previousLabel={currentPage == 1 ? "" : "<"}
        nextLabel={currentPage < totalPageCount ? ">" : ""}
        pageRangeDisplayed={1}
        onPageChange={onPageChange}
        marginPagesDisplayed={2}
        pageCount={totalPageCount}
        pageClassName='page-item'
        pageLinkClassName='page-link border-2 border-none px-2 rounded-full'
        activeClassName='active'
        activeLinkClassName='active bg-blue-500 text-white'
      />
    </div>
  )
}

export default MyPaginate
