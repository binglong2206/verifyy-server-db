import express, { NextFunction, Request, Response } from "express";
import { verifyHeaderJWT } from "../middleware/verifyJWT";
import { updateFB } from "../controller/updateFB";
import aggregateStat from "../controller/aggregateStat";
import {fbURL, getCode, getAccessToken, getPageId, getPageAccessToken, getBasicStats, getMedias, getDemoGeo, getIntervalsData, postFBData} from '../utils/facebook_utils'
import {FB_data} from '../types/facebookTypes'
import cookie from 'cookie'
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  console.log(req.baseUrl)
  res.send("Facebook API homepage");
});



router.get('/redirect', async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = cookie.parse(req.headers.cookie)

  res.setHeader("Set-Cookie", [
    cookie.serialize("web_accessToken", accessToken as string, {
      maxAge: 300,
    }),
    cookie.serialize("web_refreshToken", refreshToken as string, {
      maxAge: 300,
    }),
  ]);
    
  res.redirect(fbURL);

})


router.get('/connect', async (req: Request, res: Response, next: NextFunction) => {
  const code = getCode(req.url);

  const accessToken = await getAccessToken(code);

  const pageId = await getPageId(accessToken);

  const pageAccessToken = await getPageAccessToken(accessToken, pageId);

  const {followers_count, fan_count} = await getBasicStats(accessToken, pageId);

  const {media_count, media_list} = await getMedias(pageAccessToken, pageId);

  const {demographics, geographics} = await getDemoGeo(pageAccessToken, pageId);

  const data_intervals = await getIntervalsData(pageAccessToken, pageId);


  const organized_data: FB_data = {
    follower_count: followers_count,
    like_count: fan_count,
    media_count: media_count,
    demographics: demographics,
    geographics: geographics,
    medias: media_list,
    data_intervals: data_intervals
  };

  await postFBData(organized_data, req.headers.cookie).then(()=> {res.redirect('http://localhost:3000')})

})


router.post("/update", updateFB, aggregateStat);

export default router;
