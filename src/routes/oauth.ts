import express, { NextFunction, Request, Response } from "express";
import { verifyHeaderJWT } from "../middleware/verifyJWT";
import { updateYT } from "../controller/updateYT";
import aggregateStat from "../controller/aggregateStat";
import { ConnectionIsNotSetError } from "typeorm";
import cookie from "cookie";
import axios from "axios";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("OAuth API homepage");
});


router.get('/youtube', (req: Request, res: Response) => {

    let url = "https://accounts.google.com/o/oauth2/v2/auth";

    url += `?client_id=${process.env.YT_CLIENT_ID}`;
    url += "&redirect_uri=http://localhost:8000/oauth/youtube/response";
    url += "&response_type=code";
    url +=
      "&scope=https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/youtube.readonly";
    url += "&include_granted_scopes=true";
    url += "&state=" + 'CSRFSTATE';
  
    res.redirect(url);
});

router.get('/nihao', (req: Request, res: Response) => {
    console.log('ni hao cookie')
    res.json({hello: 'world'})

})

router.get('/youtube/response', async (req: Request, res: Response) => {
    // Get Code
    const code = req.url
    ?.substring(req.url?.indexOf("&code="), req.url?.indexOf("&scope="))
    .split("code=")[1];

   // Get Access Token
   try{ 
    const yt_accessToken = await axios.post(
      `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.YT_CLIENT_ID}&client_secret=${process.env.YT_CLIENT_SECRET}&redirect_uri=http://localhost:8000/oauth/youtube/response&grant_type=authorization_code`
    ).then(r=> r.data.access_token);
    
    const channelStats = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/channels?mine=true&part=snippet,contentDetails,statistics&access_token=${yt_accessToken}`
  ).then((r) => r.data.items);
  const { viewCount, subscriberCount, videoCount } =
    channelStats[0].statistics;

    console.log(viewCount,subscriberCount,videoCount)
    
   } catch(e) {
    console.error(e)
   }
  

    res.redirect('http://localhost:3000/redirect_edit')
})


router.post("/update", updateYT, aggregateStat);

export default router;
