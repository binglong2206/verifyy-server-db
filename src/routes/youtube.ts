import express, { NextFunction, Request, Response } from "express";
import { updateYT } from "../controller/updateYT";
import aggregateStat from "../controller/aggregateStat";
import { ConnectionIsNotSetError } from "typeorm";
import { ytURL, getCode, getAccessToken, fetchBasicStat, fetchDemoGeo, fetchIntervalData, postYTData } from "../utils/youtube_utils";
import cookie from 'cookie'
import { YT_data } from "../types/youtubeTypes";
import { verifyCookieJWT } from "../middleware/verifyJWT";
import { verifyHeaderJWT } from "../middleware/verifyJWT";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Youtube API homepage");
});


router.get('/redirect', (req: Request, res: Response) => {
  console.log("THIS ONE", cookie.parse(req.headers.cookie))
  const {accessToken, refreshToken} = cookie.parse(req.headers.cookie)
  const csrfState = Math.random().toString(36).substring(2);
  res.setHeader("Set-Cookie", [
    cookie.serialize("yt_csrf", csrfState, { maxAge: 300 }),
    cookie.serialize("web_accessToken", accessToken as string, {
      maxAge: 300,
    }),
    cookie.serialize("web_refreshToken", refreshToken as string, {
      maxAge: 300,
    }),
  ]);

  let url = ytURL;
  url += csrfState;

  res.redirect(url)
});


router.get('/connect', async (req: Request, res: Response, next: NextFunction) => {
  try{ 
   // Get Code
   const code = await getCode(req.url)
   
   // Get Access Token
   const yt_accessToken = await getAccessToken(code);

  // lifetime basic stats, and latest 5 videos stat
  const {viewCount, subscriberCount, videoCount, videoObjects} = await fetchBasicStat(yt_accessToken);

  // lifetime demographcis & geographics
  const {demographics, geographics} = await fetchDemoGeo(yt_accessToken);

  // day/week/28 for views, likes, subsGained
  const data_intervals  = await fetchIntervalData(yt_accessToken);

 // Organize all data into single object
   const organized_data: YT_data = {
     follower_count: subscriberCount,
     view_count: 699999,
     media_count: videoCount,
     demographics: demographics,         
     geographics: geographics,                 
     medias: videoObjects,
     data_intervals: data_intervals,
   };

// Post data as json to DB's controller
   await postYTData(organized_data, req.headers.cookie).then(()=> {res.redirect('http://localhost:3000')})
   
  } catch(err) {
   console.error(err);
   return next(err)
  }
 })




router.post("/update", verifyHeaderJWT, updateYT, aggregateStat);

export default router;
