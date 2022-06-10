import axios from 'axios'
import React,{useState, useEffect} from 'react'
import shortid from 'shortid'
import Noimage from '../svg/no-image.svg'
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
  thumbnail: string
}

export default function Item(props:props) {
  const [isLike, setLikeState] = useState(false)

  const {
    id,
    authors,
    title,
    description,
    thumbnail
  } = props

  const clickHandler = async () => {
    await axios.post('/api/like',
      {
        book_id: id,
      }
    )
    setLikeState(!isLike)
  }

  return(
    <div className='relative flex mx-20 space-x-4 mb-10 px-2 py-2 shadow-lg bg-white rounded'>
      {thumbnail?
        <img src={thumbnail}/>
        :
        <Noimage className='bg-zinc-200 shrink-0'/>
      }
      <div className='text-left'>
        <p className='text-2xl font-bold'>{title}</p>
        <div className='text-sm mb-3 flex space-x-1'>{
          authors?.map((author:String) => {
            return (
              <p key={shortid.generate()}>{author}</p>
            )
          })
        }
        </div>
        <div>
          <p>{description}</p>
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
