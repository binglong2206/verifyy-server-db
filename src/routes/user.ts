import express, { NextFunction, Request, Response } from 'express';
import firebaseSDK from '../service/firebase'
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
          const storageRef = 
          const uploadTask = storageRef
            .child(username + "/" + fileName)
            .put(file, { contentType: file.type });
    
          uploadTask.on(
            "state_change",
            () => {
              console.log('uploading');
            },
            (err:Error) => {
              throw err
            },
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then((url: string) => {
                
                // Controller to post url to db


                res.end();
              });
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



router.post('/background', (req:Request, res: Response, next: NextFunction) => {
    
})


export default router