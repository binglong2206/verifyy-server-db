import axios from "axios";
import {IntervalData, DataPoint, IG_data} from '../types/instagramTypes'
//@ts-ignore
import timestamp from 'unix-timestamp';
timestamp.round = true;



let url = "https://www.facebook.com/v14.0/dialog/oauth";
  url += `?client_id=${process.env.FB_CLIENT_ID}`;
  url += "&redirect_uri=http://localhost:8000/instagram/connect";
  url += "&response_type=code";
  url += "&scope=instagram_basic,pages_show_list,instagram_manage_insights,read_insights";

export const igURL = url;


export function getCode(url: string) {
  return url?.split("code=")[1];
};

export async function getAccessToken(code: string) {
  const accessToken = await axios.get(`https://graph.facebook.com/v14.0/oauth/access_token?client_id=${process.env.FB_CLIENT_ID}&redirect_uri=http://localhost:8000/instagram/connect&client_secret=${process.env.FB_CLIENT_SECRET}&code=${code}` // redirect & resume at this point
  ).then(r=>r.data.access_token);

  return accessToken
};

export async function getInstagramID(accessToken: string) {
  // Get associated page Id first
  const {name, id} = await axios.get(`https://graph.facebook.com/v14.0/me/accounts?access_token=${accessToken}`)
    .then(r => r.data.data[1]) // Page Id

  // Instagram Business Id
  const instagramId = await axios.get(
    `https://graph.facebook.com/v14.0/${id}?fields=instagram_business_account&access_token=${accessToken}`
  )
    .then((r) => r.data.instagram_business_account.id);
  
    return instagramId;
};



export async function getBasicStats(accessToken:string, instagramId:string) {
  const { username, followers_count, media_count } = await axios.get(
    `https://graph.facebook.com/v14.0/${instagramId}?fields=username,followers_count,media_count&access_token=${accessToken}`
  ).then((r) => r.data);

  return {username, followers_count, media_count}
};


export async function getMediaList(accessToken:string, instagramId:string) {
  const medias = await axios.get(
    `https://graph.facebook.com/v14.0/${instagramId}/media?fields=like_count,comments_count,media_url,permalink&limit=5&access_token=${accessToken}`
  )
    .then((r) => r.data.data);
    return medias
};


export async function getDemoGeo(accessToken:string, instagramId:string) {
  const agg_demographics_geographics = await axios.get(
    `https://graph.facebook.com/v14.0/${instagramId}/insights?metric=audience_gender_age,audience_country&period=lifetime&access_token=${accessToken}`
  )
    .then((r) => r.data)

  const demographics = agg_demographics_geographics.data[0].values[0].value;
  const geographics = agg_demographics_geographics.data[1].values[0].value;

  return {demographics, geographics}
};

export async function getIntervalsData(accessToken:string, instagramId:string) {
  const data_intervals: IntervalData = {
    day: {follower_count:[], impression_count:[], reach_count:[]}, 
    week: {follower_count:[], impression_count:[], reach_count:[]}, 
    month:{follower_count:[], impression_count:[], reach_count:[]}
  };

  const daily_data = await axios.get(
    `https://graph.facebook.com/v14.0/${instagramId}/insights?metric=follower_count,impressions,reach&period=day&access_token=${accessToken}`)
    .then(r=> {
      data_intervals.day.follower_count = r.data.data[0].values;
      data_intervals.day.impression_count = r.data.data[1].values;
      data_intervals.day.reach_count = r.data.data[2].values;
    });

  const weekly_data = await axios.get(
      `https://graph.facebook.com/v14.0/${instagramId}/insights?metric=follower_count,impressions,reach&period=day&since=${timestamp.now('-7d')}&until=${timestamp.now('-1d')}&access_token=${accessToken}`)
      .then(r=> {
      data_intervals.week.follower_count = r.data.data[0].values;
      data_intervals.week.impression_count = r.data.data[1].values
      data_intervals.week.reach_count = r.data.data[2].values
      });

  const monthly_data = await axios.get(
        `https://graph.facebook.com/v14.0/${instagramId}/insights?metric=follower_count,impressions,reach&period=day&since=${timestamp.now('-28d')}&until=${timestamp.now('-1d')}&access_token=${accessToken}`)
        .then(r=> {
      data_intervals.month.follower_count = r.data.data[0].values;
      data_intervals.month.impression_count = r.data.data[1].values
      data_intervals.month.reach_count = r.data.data[2].values
        });

  
  return data_intervals;
}


export async function postIGData(organized_data: IG_data, cookies: string) {
  console.log('START POST request to server')
  await axios.post("http://localhost:8000/instagram/update", organized_data, {
    headers:  {
      "Content-Type": "application/json",
      "Authorization": cookies // not parsed
    },
    withCredentials: true
  }).catch(e=>console.error('ERROR: IG post request failed'))
}


