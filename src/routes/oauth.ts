import express, { NextFunction, Request, Response } from "express";
import { verifyHeaderJWT } from "../middleware/verifyJWT";
import { updateYT } from "../controller/updateYT";
import aggregateStat from "../controller/aggregateStat";
import { ConnectionIsNotSetError } from "typeorm";
import cookie from "cookie";
import axios from "axios";
import fetch from "node-fetch";
import { ytURL, getCode, getAccessToken, fetchBasicStat, fetchDemoGeo, fetchIntervalData, postYTData } from "../utils/youtube_utils";
import { YT_data } from "../types/youtubeTypes";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("OAuth API homepage");
});

router.get('/youtube/redirect', (req: Request, res: Response) => {
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
})

router.get('/youtube', async (req: Request, res: Response, next: NextFunction) => {
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
      view_count: viewCount,
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



export default router;
