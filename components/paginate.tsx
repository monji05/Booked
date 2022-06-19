import React, { useState, useEffect, ReactEventHandler } from 'react'
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
    if (selectedPage > totalPageCount) {
      setCurrentPage(1)
    } else {
      setCurrentPage(selectedPage)
    }
  }

  useEffect(() => {
    fetchBookData(searchValue, currentPage)
  }, [currentPage])

  return (
    <div>
      <ReactPaginate
        className='mb-2 text-center flex space-x-5 text-xl bg-white text-cyan-500'
        breakLabel="..."
        previousLabel={currentPage == 1 ? "" : "<"}
        nextLabel={currentPage == totalPageCount ? "" : ">"}
        pageRangeDisplayed={1}
        onPageChange={onPageChange}
        marginPagesDisplayed={2}
        pageCount={totalPageCount}
      />
    </div>
  )
}

export default MyPaginate