import type {NextApiRequest, NextApiResponse} from 'next'
import {cert} from 'firebase-admin/app'
import {getFirestore, QuerySnapshot} from 'firebase-admin/firestore'
import admin from "firebase-admin"
import serviceAccount from "../../service-account-sdk.json"
import shortid from 'shortid'

// let app
// if(!app) {
//   app = admin.initializeApp(
//     {
//       credential: cert(serviceAccount)
//     }
//   )
// }

export type Data = {
  book_id: String,
}

export const COLLECTION_NAME = 'like';
export const db = getFirestore()
export const dbCollection = db.collection(COLLECTION_NAME)

async function getBooks(res: NextApiResponse<Data[]>) {
  const querySnapshots = await dbCollection.get()
  if (querySnapshots.empty) {
    res.status(200).json([
      {
        book_id: "not found ."
      }
    ])
  } else {
    let data:Data[] = []
    querySnapshots.forEach(shot => {
      data.push(
        {
          book_id: shot.get('book_id')
        }
      )
    })
    res.status(200).json(data)
  }
  res.end()
}

async function postBooks(req: NextApiRequest, res:NextApiResponse<Data>) {
  dbCollection.where("book_id", "==", req.body.book_id)
  .get()
  .then(snapShots => {

    if (snapShots.empty) {
      const insertData = {
        book_id: req.body.book_id
      }
      dbCollection.add(insertData)
    }

    snapShots.forEach(shot => {
      dbCollection.doc(shot.id).delete()
    })
  })
  .catch(error => {
    console.error(error)
    res.end()
  })
  res.end()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {

    if (req.method === 'GET') {
      await getBooks(res)
      // await fetchbookIds(res)
    }

    if (req.method === 'POST') {

      await postBooks(req, res)
    }
  } catch (error) {

    console.error(error)
    return 0

  }
}

export const fetchbookIds = async (res: NextApiResponse) => {
  let bookIds: string[] = []
  const unsubcribe = () => {
    dbCollection
    .onSnapshot((snapshot) => {
      snapshot.docs.map(doc => {
        bookIds.push(doc.data().book_id)
      })
    })
  }
  unsubcribe()
  console.log(bookIds)
  res.end()
}

