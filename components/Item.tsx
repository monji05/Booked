import axios from 'axios'
import React,{useState} from 'react'
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
  initialLike: boolean
  id: string,
  authors?: String[],
  title: string,
  description: string,
  thumbnail: string,
}

export default function Item(props:props) {
  const {
    initialLike,
    id,
    authors,
    title,
    description,
    thumbnail,
  } = props

  const [isLike, setIsLike] = useState(initialLike)

  const clickHandler = async () => {
    await axios.post('/api/like',
      {
        book_id: id,
      }
    )
    setIsLike(!isLike)
  }

  return(
    <div className='relative flex w-1/3  h-48 space-x-4 m-auto mb-10 px-2 py-2 shadow-lg bg-white rounded'>
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
        <button onClick={()=>clickHandler()}>
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
