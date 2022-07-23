import express, { NextFunction, Request, Response } from "express";
import { verifyCookieJWT, verifyHeaderJWT } from "../middleware/verifyJWT";
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



router.get('/redirect', verifyCookieJWT, async (req: Request, res: Response, next: NextFunction) => {
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
  console.log('***CODE***', code)

  const accessToken = await getAccessToken(code);
  console.log('***accessToken***', accessToken)


  const pageId = await getPageId(accessToken);
  console.log('***pageID***', pageId)


  const pageAccessToken = await getPageAccessToken(accessToken, pageId);
  console.log('***pageAccessToken***', pageAccessToken)

  const {followers_count, fan_count} = await getBasicStats(accessToken, pageId);
  console.log('***followers_count***', followers_count, fan_count)


  const {media_count, media_list} = await getMedias(pageAccessToken, pageId);
  console.log('***media_count***', media_count, media_list)

  const {demographics, geographics} = await getDemoGeo(pageAccessToken, pageId);
  console.log('***demographics***', demographics, geographics)

  const data_intervals = await getIntervalsData(pageAccessToken, pageId);
  console.log('***data_intervals***')



  const organized_data: FB_data = {
    follower_count: followers_count,
    like_count: fan_count,
    media_count: media_count,
    demographics: demographics,
    geographics: geographics,
    medias: media_list,
    data_intervals: data_intervals
  };

  await postFBData(organized_data, req.headers.cookie).then(()=> {res.redirect('http://localhost:3001')})

})


router.post("/update", verifyHeaderJWT, updateFB, aggregateStat);

export default router;
