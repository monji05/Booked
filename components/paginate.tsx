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
        className='mb-2 flex justify-center text-xl p-1 space-x-1 text-blue-400'
        breakLabel="..."
        initialPage={0}
        forcePage={currentPage - 1}
        disableInitialCallback={true}
        previousLabel={currentPage == 1 && searchValue ? "" : "<"}
        nextLabel={currentPage < totalPageCount ? ">" : ""}
        pageRangeDisplayed={1}
        onPageChange={onPageChange}
        marginPagesDisplayed={2}
        pageCount={totalPageCount}
        pageClassName='page-item'
        pageLinkClassName='page-link bg-white border-2 border-none rounded-full px-2'
        activeClassName='active rounded-full'
        activeLinkClassName='active bg-amber-400 text-white'
      />
    </div>
  )
}

export default MyPaginate
