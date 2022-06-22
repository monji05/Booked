import axios from 'axios'
import React, { useState, useEffect } from 'react'
import shortid from 'shortid'
import NoImage from '../svg/no-image.svg'
import Heart from '../svg/heart.svg'
import ClassNames from './ClassNames'
import Stars from './stars'

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
  salesDate: string
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
    salesDate,
  } = props

  const replacedSalesDate = salesDate.replace(/(\d{4})年(\d{2})月(\d{2})日/, '$1/$2/$3')

  const clickHandler = async () => {
    setIsLike(!isLike)
  }

  return (
    <div className='relative flex h-52 space-x-4 m-auto mb-10 px-2 py-2 shadow-lg shadow-slate-400 bg-stone-50 rounded'>
      <img src={largeImageUrl} />
      <div className='text-left'>
        <a href={itemUrl} className="no-underline hover:underline hover:text-blue-600">
          <p className='text-xl font-bold'>{title}</p>
        </a>
        <div className='text-sm flex space-x-1'>
          <p>著者: {author}</p>
        </div>
        <div className='text-sm space-x-1'>
          <p>発売日: {replacedSalesDate}</p>
        </div>
        <Stars reviewAverage={reviewAverage} />

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
