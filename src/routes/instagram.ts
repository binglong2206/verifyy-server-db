import express, { NextFunction, Request, Response } from "express";
import { verifyHeaderJWT, verifyCookieJWT } from "../middleware/verifyJWT";
import { updateIG } from "../controller/updateIG";
import aggregateStat from "../controller/aggregateStat";
import cookie from 'cookie'
import { igURL, getCode, getAccessToken, getInstagramID, getBasicStats, getMediaList, getDemoGeo, getIntervalsData, postIGData } from "../utils/instagram_utils";
import { IG_data } from "../types/instagramTypes";
import timestamp from 'unix-timestamp';

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Instagram API homepage");
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
    
  res.redirect(igURL);
})


router.get('/connect', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const code =  getCode(req.url);
  
    const accessToken = await getAccessToken(code);
  
    const instagramId = await getInstagramID(accessToken);
  
    const {username, followers_count, media_count} = await getBasicStats(accessToken, instagramId);
  
    const medias = await getMediaList(accessToken, instagramId);
  
    const {demographics, geographics} = await getDemoGeo(accessToken, instagramId);
  
    const data_intervals = await getIntervalsData(accessToken, instagramId);
  
  
    const organized_data: IG_data = {
      username: username,
      follower_count: followers_count,
      media_count: media_count,
      demographics: demographics,
      geographics: geographics,
      medias: medias,
      data_intervals: data_intervals,
    };
  
    await postIGData(organized_data, req.headers.cookie).then(()=> {res.redirect('http://localhost:3000/redirect_edit')})
  } catch(err) {
    console.error(err)
    next(err)
  }

})

router.post("/update", verifyHeaderJWT, updateIG, aggregateStat);

export default router;
