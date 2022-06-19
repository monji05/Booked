import axios from "axios";

export type responseBookData = {
  Item: {
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
}

const baseUrl = "https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404?format=json&applicationId=1091772165730830179"
const books = axios.create({
  baseURL: baseUrl,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
})

export default books
