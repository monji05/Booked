import React, { isValidElement, useCallback, useState } from 'react'
import Item from '../components/Item'
import type { responseBookData } from '../pages/api/books'
import books from '../pages/api/books'
import shortid from 'shortid'
import BookSearch from './BookSearch'
import MyPaginate from './paginate'

export default function List() {
  const [searchValue, setSearchValue] = useState("")
  const [bookData, setBookData] = useState<responseBookData[]>([])
  const [totalPageCount, setTotalPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [isLike, setIsLike] = useState(false)

  const handleChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }, [])

  const fetchBookData = async (searchValue: string, currentPage: number) => {
    if (searchValue === "") return
    await books.get("", {
      params: {
        "keyword": searchValue,
        "page": currentPage
      }
    }).then((res: any) => {
      setBookData(res.data.Items)
      setTotalPageCount(res.data.pageCount)
      setCurrentPage(res.data.page)
    }).catch(error => {
      console.error(error)
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue == "") return
    setCurrentPage(1)
    fetchBookData(searchValue, currentPage)
  }

  return (
    <div className='min-h-screen'>
      <BookSearch
        handleSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeValue(e)}
        searchValue={searchValue}
      />
      <div className='w-1/3 m-auto'>
        <MyPaginate
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPageCount={totalPageCount}
          searchValue={searchValue}
          fetchBookData={fetchBookData}
        />
        {
          bookData ? bookData.map((book: responseBookData) => {
            return (
              <Item
                isLike={isLike}
                setIsLike={setIsLike}
                key={shortid.generate()}
                author={book.Item.author}
                title={book.Item.title}
                booksGenreId={book.Item.booksGenreId}
                itemCaption={book.Item.itemCaption}
                itemPrice={book.Item.itemPrice}
                itemUrl={book.Item.itemUrl}
                largeImageUrl={book.Item.largeImageUrl}
                reviewAverage={book.Item.reviewAverage}
                reviewCount={book.Item.reviewCount}
                salesData={book.Item.salesData}
              />
            )
          })
        :
            <div className='border-solid text-center text-xl text-rose-500'>該当するものはありませんでした</div>
        }
      </div>
    </div>
  )
}
