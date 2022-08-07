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
    <div className='m-auto'>
      <form onSubmit={handleSubmit}>
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
          <button className='rounded bg-blue-500 font-bold hover:bg-sky-400 px-2 ml-2 text-m text-white'>Seach</button>
        </label>
      </form>
    </div>
  )
}
