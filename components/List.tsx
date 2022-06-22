import React, { isValidElement, useCallback, useState } from 'react'
import Item from '../components/Item'
import type { responseBookData } from '../pages/api/books'
import books from '../pages/api/books'
import shortid from 'shortid'
import BookSearch from './BookSearch'
import MyPaginate from './paginate'

export default function List() {
  const initialPage = 1
  const [searchValue, setSearchValue] = useState("")
  const [bookData, setBookData] = useState<responseBookData[]>([])
  const [totalPageCount, setTotalPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(initialPage)
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
      console.log('fetchBookData: %d', currentPage)
    }).catch(error => {
      console.error(error)
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue == "") return
    await fetchBookData(searchValue, initialPage)
  }

  return (
    <div className='min-h-screen'>
      <BookSearch
        handleSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
        handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeValue(e)}
        searchValue={searchValue}
      />
      <div className='w-1/3 m-auto'>
        {
          bookData.length > 0 ?
            <div className='text-2xl mb-2 font-bold'>
              <p>検索結果: </p>
            </div>
            :
            ""
        }
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
                salesDate={book.Item.salesDate}
              />
            )
          })
            :
            <div className='border-solid text-center text-xl text-rose-500'>該当するものはありませんでした</div>
        }
        {
          bookData.length > 0 ?
            < MyPaginate
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPageCount={totalPageCount}
              searchValue={searchValue}
              fetchBookData={fetchBookData}
            />
            :
            ""
        }
      </div>
    </div>
  )
}
