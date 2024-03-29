import express, { NextFunction, Request, Response } from 'express';
import { storage } from '../service/firebase'; 
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateBackgroundImage, updateProfileImage, updateWhitelist } from '../controller/updateUser';
import { deleteChart, patchChart } from '../controller/updateCharts';
import {loadSampleData} from "../controller/loadSampleData"
import aggregateStat from '../controller/aggregateStat';
import { getDashboard } from '../controller/getDashboard';

const router = express.Router();

interface Locals{
    id: number;
    username: string
}


router.patch('/charts/:chartId', patchChart)
router.delete('/charts/:chartId', deleteChart)
router.patch('/whitelist/:platform', updateWhitelist)
router.get('/sampleData', loadSampleData, aggregateStat, getDashboard) // aggregateStat creates Account_stat table


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
                  res.locals.url = url
                  next();
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
}, updateProfileImage)



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
                res.locals.url = url
                next();
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
}, updateBackgroundImage);






export default router