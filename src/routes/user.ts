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
        const file = req.files.profile.data;
        //@ts-ignore
        const fileName = file.name;

        if (file) {
            // Create a ref to the path (existing or new)
          const storageRef = ref(storage, `${username}/profile`);
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
                  // res.locals.url = url
                  console.log('DONE', url);
                  res.end();
                })
            }
          );
        } else {
          throw new Error('issue uploading')
        }
    } catch(err){
        console.error(err);
        next(err)
    }
})



router.post('/background', async (req:Request, res: Response, next: NextFunction) => {
  try {
      const {id, username} = <Locals>res.locals
      //@ts-ignore
      const file = req.files.profile.data;
      //@ts-ignore
      const fileName = file.name;
    
      if (file) {
          // Create a ref to the path (existing or new)
        const storageRef = ref(storage, `${username}/background`);
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
                // res.locals.url = url
                console.log('DONE BACKGROUND UPLOAD', url);
                res.end();
              })
          }
        );
      } else {
        throw new Error('issue uploading')
      }
  } catch(err){
      console.error(err);
      next(err)
  }
})


export default router