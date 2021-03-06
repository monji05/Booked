import React from 'react'

type props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
  searchValue: string,
}

export default function BookSearch(props: props) {
  const {
    handleSubmit,
    handleChangeValue,
    searchValue
  } = props

  return (
    <div className='text-center py-2 w-1/3 m-auto mb-4'>
      <form onSubmit={handleSubmit}>
        <label className='relative flex'>
          <span className='absolute flex mt-2.5 pl-2'>
            <svg className='h-5 w-5 fill-white text-slate-400' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            className='
            w-64
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
              focus:outline-none
              focus:border-cyan-600
              focus:rounded-md
              sm:text-sm
            '
            placeholder='本のタイトル、著者名を入力'
            onChange={handleChangeValue}
            value={searchValue}
          />
          <button className='rounded-md bg-sky-500 hover:bg-sky-400 mr-60 px-2 ml-2 pb-1 text-m text-white'>検索</button>
        </label>
      </form>
    </div>
  )
}