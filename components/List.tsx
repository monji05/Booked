import React, {useState} from 'react'
import Item from '../components/Item'
import type {bookData} from '../components/Item'
import api from '../pages/api/api'
import shortid from 'shortid'

export default function List() {
  const [bookData, setBookData] = useState<bookData[]>([])
  const [searchValue, setSearchValue] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const fetchBookData = (searchValue: string) => {
    api.get("", {
      params: {
        "q": searchValue,
        "maxResults": 40
      }
    }).then((res:any) =>
      setBookData(res.data.items)
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchValue == "") return
    fetchBookData(searchValue)
  }

  return (
    <div>
      <div className='text-center py-2'>
        <form onSubmit={handleSubmit}>
          <label className='relative flex'>
            <span className='absolute flex mt-2.5 pl-2 ml-56'>
              <svg className='h-5 w-5 fill-gray-50 text-slate-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              className='
                w-full
                placeholder:italic
                placeholder:text-slate-400
                block
                bg-white
                border
                border-slate-300
                rounded-md
                py-2
                pl-9
                pr-3
                shadow-sm
                focus:outlilne-none
                focus:border-cyan-300
                sm:text-sm
                ml-56
              '
              placeholder='Search holder anything ...'
              onChange={handleChange}
              value={searchValue}
            />
          <button className='rounded bg-sky-500 hover:bg-sky-400 mr-56 px-2 ml-2 pb-1 text-m text-white'>search</button>
          </label>
        </form>
      </div>
      {
        bookData? bookData.map((book:bookData) => {
          return (
            <Item
              key={shortid.generate()}
              authors={book.volumeInfo.authors}
              title={book.volumeInfo.title}
              description={book.volumeInfo.description}
              thumbnail={book.volumeInfo.imageLinks?.thumbnail || ""}
            />
          )
        })
        :
          <div className='border-solid text-center text-xl text-rose-600'>No book found .</div>
      }
    </div>
  )
}
