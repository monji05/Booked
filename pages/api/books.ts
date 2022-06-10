import axios from "axios";

const baseUrl = "https://www.googleapis.com/books/v1/volumes?"
const books = axios.create({
  baseURL: baseUrl,
  responseType: "json",
  headers: {
    "Content-Type": "application/json"
  }
})

export default books
