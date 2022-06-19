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
    setCurrentPage(event.selected + 1)
  }

  useEffect(() => {
    console.log(currentPage)
    fetchBookData(searchValue, currentPage)
  }, [currentPage])

  return (
    <ReactPaginate
      className='w-48 m-auto mb-2 text-center flex space-x-1 text-xl'
      breakLabel="..."
      previousLabel={currentPage == 1 ? "" : "<"}
      nextLabel={currentPage == totalPageCount ? "" : ">"}
      onPageChange={onPageChange}
      pageCount={totalPageCount}
    />
  )
}

export default MyPaginate