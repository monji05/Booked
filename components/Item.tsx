import * as React from 'react'
import shortid from 'shortid'
import Noimage from '../svg/no-image.svg'

export type bookData = {
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
  authors?: String[],
  title: string,
  description: string,
  thumbnail: string
}

export default function Item(props:props) {
  const {
    authors,
    title,
    description,
    thumbnail
  } = props

  return(
    <div className='flex space-x-4 mb-10 px-2 py-2 shadow-lg bg-white rounded'>
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
        <p>{description}</p>
      </div>
    </div>
  )
}
