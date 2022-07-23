import axios from 'axios'
import {Media, IntervalData, FB_data} from '../types/facebookTypes'

let url = "https://www.facebook.com/v14.0/dialog/oauth";

  url += `?client_id=${process.env.FB_CLIENT_ID}`;
  url += "&redirect_uri=http://localhost:8000/facebook/connect";
  url += "&response_type=code";
  url +=
    "&scope=pages_show_list,pages_read_engagement,pages_read_user_content,read_insights";

export const fbURL = url;



export function getCode(url: string) {
  return url?.split("code=")[1];
};


export async function getAccessToken(code: string) {
  const accessToken = await axios.get(`https://graph.facebook.com/v14.0/oauth/access_token?client_id=${process.env.FB_CLIENT_ID}&redirect_uri=http://localhost:8000/facebook/connect&client_secret=${process.env.FB_CLIENT_SECRET}&code=${code}` // redirect & resume back here
  ).then(r=>r.data.access_token);

  return accessToken
};

export async function getPageId(accessToken:string) {
  const pageList = await axios.get(
    `https://graph.facebook.com/v14.0/me/accounts?access_token=${accessToken}`
  )
    .then((r) => r.data)
  const pageId = pageList.data[0].id; // Glory Trading Page

  return pageId
}

export async function getPageAccessToken(accessToken:string, pageId:string) {
  const pageAccessToken = await axios.get(
    `https://graph.facebook.com/v14.0/${pageId}?fields=access_token&access_token=${accessToken}`
  )
    .then((r) => r.data.access_token);

  return pageAccessToken;
}

export async function getBasicStats(accessToken:string, pageId:string) {
  const { followers_count, fan_count } = await axios.get(
    `https://graph.facebook.com/v14.0/${pageId}?fields=followers_count,fan_count&access_token=${accessToken}`
  )
    .then((r) => r.data);
  
  return {followers_count, fan_count}
}


export async function getMedias(pageAccessToken: string, pageId: string) {
  const post_list = await axios.get(
    `https://graph.facebook.com/v14.0/${pageId}/published_posts?summary=total_count&limit=5&fields=id&access_token=${pageAccessToken}`
  )
    .then((r) => r.data)

  const media_count = post_list.summary.total_count;
  const postIds = post_list.data.map((e: { id: string }) => {
    return e.id;
  });

  // Get all media stats -> like_count, comment_count, imprression, url, img
  const raw_media_list = await axios.get(
    `https://graph.facebook.com/v14.0/?ids=${postIds.toString()}&fields=permalink_url,picture,likes.limit(1).summary(true),comments.limit(1).summary(true),insights.metric(post_impressions)&access_token=${pageAccessToken}`
  ).then((r) => r.data);

  // Organize medias query -> {id, url, picture, like_count, comment_count, impression_count}[]
  const media_list: Media[] = [];
  for (let key in raw_media_list) {
    let holder: any = {};
    holder.src_url = raw_media_list[key].permalink_url;
    holder.media_url = raw_media_list[key].picture;
    holder.like_count = raw_media_list[key].likes.summary.total_count;
    holder.comment_count = raw_media_list[key].comments.summary.total_count;
    holder.impression_count =
      raw_media_list[key].insights.data[0].values[0].value;

    const media: Media = holder;
    media_list.push(media);
  }

  return {media_count, media_list}
};


export async function getDemoGeo(pageAccessToken: string, pageId: string) {
  const agg_demographics_geographics = await axios.get(
    `https://graph.facebook.com/v14.0/${pageId}/insights?metric=page_fans_gender_age,page_fans_country&access_token=${pageAccessToken}`
  )
    .then((r) => r.data)
  const demographics = agg_demographics_geographics.data[0].values[0].value;
  const geographics = agg_demographics_geographics.data[1].values[0].value;

  return {demographics, geographics}
};


export async function getIntervalsData(pageAccessToken: string, pageId: string) {
  const data_intervals: IntervalData = {
    day: {follower_count:[], impression_count:[], engagement_count:[]}, 
    week: {follower_count:[], impression_count:[], engagement_count:[]}, 
    month:{follower_count:[], impression_count:[],engagement_count:[]}
  };

  const daily_data = await axios.get(
    `https://graph.facebook.com/v14.0/${pageId}/insights?metric=page_fan_adds,page_engaged_users,page_impressions&period=day&date_preset=yesterday&access_token=${pageAccessToken}`)
    .then(r=> {
      data_intervals.day.follower_count = r.data.data[0].values;
      data_intervals.day.engagement_count = r.data.data[1].values;
      data_intervals.day.impression_count = r.data.data[2].values
    });
  
  const weekly_data = await axios.get(
    `https://graph.facebook.com/v14.0/${pageId}/insights?metric=page_fan_adds,page_engaged_users,page_impressions&period=day&date_preset=last_7d&access_token=${pageAccessToken}`)
      .then(r=> {
        data_intervals.week.follower_count = r.data.data[0].values;
      data_intervals.week.engagement_count = r.data.data[1].values;
      data_intervals.week.impression_count = r.data.data[2].values
      });

  const monthly_data = await axios.get(
    `https://graph.facebook.com/v14.0/${pageId}/insights?metric=page_fan_adds,page_engaged_users,page_impressions&period=day&date_preset=last_28d&access_token=${pageAccessToken}`)
        .then(r=> {
      data_intervals.month.follower_count = r.data.data[0].values;
      data_intervals.month.engagement_count = r.data.data[1].values;
      data_intervals.month.impression_count = r.data.data[2].values

        });
  
  return data_intervals
}


export async function postFBData(organized_data: FB_data, cookies: string) {
  await axios.post("http://localhost:8000/facebook/update", organized_data, {
    headers:  {
      "Content-Type": "application/json",
      "Authorization": cookies // not parsed
    },
    withCredentials: true
  })
}