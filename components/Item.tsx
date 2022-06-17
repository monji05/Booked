import axios from 'axios'
import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import NoImage from '../svg/no-image.svg'
import Heart from '../svg/heart.svg'
import ClassNames from './ClassNames'

export type bookData = {
  id: string
  volumeInfo: {
    authors?: String[],
    title: string,
    description: string,
    imageLinks?: {
      thumbnail?: string
    }
  }
}

type props = {
  id: string,
  authors?: String[],
  title: string,
  description: string,
  thumbnail: string,
}

export default function Item(props:props) {
  const {
    id,
    authors,
    title,
    description,
    thumbnail,
  } = props

  const [isLike, setIsLike] = useState(false)

  const clickHandler = async () => {
    setIsLike(!isLike)
  }

  return(
    <div className='relative flex h-48 space-x-4 m-auto mt-10 px-2 py-2 shadow-lg bg-stone-50 rounded'>
      {thumbnail?
        <img src={thumbnail}/>
        :
        <NoImage className='w-32 h-44 bg-zinc-200 shrink-0' />
      }
      <div className='text-left'>
        <p className='text-xl font-bold'>{title}</p>
        <div className='text-sm mb-3 flex space-x-1'>
          <p>著者: {authors?.map((author: String) => { return `${author} ` })}</p>
        </div>
        <button onClick={() => clickHandler()}>
          {
            <Heart
              key={shortid.generate()}
              className={
                ClassNames(
                  isLike ?
                    "fill-rose-600"
                  :
                    "fill-white"
                  ,
                  "absolute w-7 h-7 text-rose-600 right-0 bottom-0"
                )
              }
            />
          }
        </button>
      </div>
    </div>
  )
}
