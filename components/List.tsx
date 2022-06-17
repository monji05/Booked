import React, { useState } from 'react'
import Item from '../components/Item'
import type {bookData} from '../components/Item'
import books from '../pages/api/books'
import shortid from 'shortid'
import BookSearch from './BookSearch'

export default function List() {
  const [searchValue, setSearchValue] = useState("")
  const [bookData, setBookData] = useState<bookData[]>([])
  const [bookIds, setBookIds] = useState<string[]>([])

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const fetchBookData = async (searchValue: string) => {
    await books.get("", {
      params: {
        "q": searchValue,
        "maxResults": 40
      }
    }).then((res: any) =>
      setBookData(res.data.items)
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue == "") return
    fetchBookData(searchValue)
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
        bookData? bookData.map((book:bookData) => {
          return (
            <Item
              id={book.id}
              key={shortid.generate()}
              authors={book.volumeInfo.authors}
              title={book.volumeInfo.title}
              description={book.volumeInfo.description}
              thumbnail={book.volumeInfo.imageLinks?.thumbnail || ""}
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
