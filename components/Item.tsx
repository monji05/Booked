import axios from 'axios'
import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import NoImage from '../svg/no-image.svg'
import Heart from '../svg/heart.svg'
import ClassNames from './ClassNames'

type props = {
  isLike: boolean,
  setIsLike: (arg: boolean) => void,
  author: string,
  title: string,
  booksGenreId: string,
  itemCaption: string,
  itemPrice: number,
  itemUrl: string,
  largeImageUrl: string,
  reviewAverage: string,
  reviewCount: number,
  salesData: string
}

export default function Item(props: props) {
  const {
    isLike,
    setIsLike,
    author,
    title,
    booksGenreId,
    itemCaption,
    itemPrice,
    itemUrl,
    largeImageUrl,
    reviewAverage,
    reviewCount,
    salesData,
  } = props

  const clickHandler = async () => {
    setIsLike(!isLike)
  }

  return (
    <div className='relative flex h-52 space-x-4 m-auto mb-10 px-2 py-2 shadow-lg shadow-slate-400 bg-stone-50 rounded'>
      <img src={largeImageUrl} />
      <div className='text-left'>
        <p className='text-xl font-bold'>{title}</p>
        <div className='text-sm mb-3 flex space-x-1'>
          <p>著者: {author}</p>
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
