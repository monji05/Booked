import React from 'react'

type props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  handleChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => void,
  searchValue: string,
  handleChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void,
}

export default function BookSearch(props: props) {
  const {
    handleSubmit,
    handleChangeValue,
    searchValue,
    handleChangeSelect,
  } = props

  return (
    <div className='m-auto'>
      <form onSubmit={handleSubmit}>
        <div className='flex'>
          <div className="relative w-28 mr-2">
            <select
              className="appearance-none w-28 bg-white border border-slate-300 hover:border-slate-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChangeSelect}
            >
              <option value="0" >著者名</option>
              <option value="1">タイトル</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-20 flex items-center px-2 text-gray-600">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
            </div>
          </div>
          <label className='relative flex flex-row'>
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
            px-2
            py-2
            pl-9
            shadow-sm
            focus:outline-none
            focus:border-cyan-600
            focus:rounded-md
            sm:text-sm
            '
              placeholder='Please type you looking for ...'
              onChange={handleChangeValue}
              value={searchValue}
            />
            <button className='border-none rounded bg-blue-500 font-bold hover:bg-sky-400 px-2 ml-2 text-m text-white'>Seach</button>
          </label>
        </div>
      </form>
    </div>
  )
}
