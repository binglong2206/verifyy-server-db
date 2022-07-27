import express, { NextFunction, Request, Response } from 'express';
import { storage } from '../service/firebase'; 
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const router = express.Router();

interface Locals{
    id: number;
    username: string
}

router.post('/profile', async (req:Request, res: Response, next: NextFunction) => {
    try {
        const {id, username} = <Locals>res.locals
        //@ts-ignore
        const file = req.files.profile;
        //@ts-ignore
        const fileName = req.files.name;

        if (file) {
            // Create a ref to the path (existing or new)
          const storageRef = ref(storage, `${username}`);
          const uploadTask = uploadBytesResumable(storageRef, file)
     
          uploadTask.on('state_changed', (snapshot)=> {
            console.log('uploading') // Will be called everytime upload state changes
          },
            (err)=> {
                console.error(err)
                throw new Error('upload failed')
            },
            ()=> {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                  res.locals.url = url
                })
            }
          )
        } else {
          throw new Error('issue uploading')
        }
    } catch(err){
        console.error(err);
        next(err)
    }
})



router.post('/background', (req:Request, res: Response, next: NextFunction) => {
    try {
        const {id, username} = <Locals>res.locals
        //@ts-ignore
        const file = req.files.background;
        //@ts-ignore
        const fileName = req.files.name;

        if (file) {
            // Create a ref to the path (existing or new)
          const storageRef = ref(storage, `${username}`);
          const uploadTask = uploadBytesResumable(storageRef, file)
     
          uploadTask.on('state_changed', (snapshot)=> {
            console.log('uploading') // Will be called everytime upload state changes
          },
            (err)=> {
                console.error(err)
                throw new Error('upload failed')
            },
            ()=> {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    res.locals.url = url
                })
            }
          )
        } else {
          throw new Error('issue uploading')
        }
    } catch(err){
        console.error(err);
        next(err)
    }
})


export default router