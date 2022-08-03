import React, { useCallback, useEffect, useState } from 'react'
import Item from '../components/Item'
import type { responseBookData } from '../pages/api/books'
import books from '../pages/api/books'
import shortid from 'shortid'
import BookSearch from '../components/BookSearch'
import MyPaginate from '../components/paginate'
import Logout from './Logout'
import { auth } from '../lib/firebase'
import { useRouter } from 'next/router'

export default function List() {
  const initialPage = 1
  const [searchValue, setSearchValue] = useState("")
  const [bookData, setBookData] = useState<responseBookData[]>([])
  const [totalPageCount, setTotalPageCount] = useState(0)
  const [currentPage, setCurrentPage] = useState(initialPage)
<<<<<<< HEAD:pages/List.tsx
  const [totalBookCount, setTotalBookCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (!user) {
        router.push("/Login")
      }
    })
  }, [])
=======
>>>>>>> 9424b0495db4c8fb8764c3840377fcecaa01f64c:components/List.tsx

  const handleChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }, [])

  const fetchBookData = (searchValue: string, currentPage: number) => {
    if (searchValue === "") return
    books.get("", {
      params: {
        "keyword": searchValue,
        "page": currentPage
      }
    }).then((res: any) => {
      setBookData(res.data.Items)
      setTotalPageCount(res.data.pageCount)
      setTotalBookCount(res.data.count)
    }).catch(error => {
      console.error(error)
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue == "") return
    fetchBookData(searchValue, initialPage)
    setCurrentPage(initialPage)
  }

  return (
    <div className='min-h-screen bg-gray-200 pb-20'>
      <div className='w-full bg-slate-600 h-20'>
        <div className='flex pt-5'>
          <BookSearch
            handleSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
            handleChangeValue={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeValue(e)}
            searchValue={searchValue}
          />
          <Logout />
        </div>
      </div>
      <div className='w-1/3 m-auto'>
        {
          bookData.length > 0 ?
            <div className='text-2xl mb-2 text-slate-800'>
              <p>検索結果: {totalBookCount}件</p>
            </div>
            :
            ""
        }
        {
          bookData ? bookData.map((book: responseBookData) => {
            return (
              <Item
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
            <MyPaginate
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
