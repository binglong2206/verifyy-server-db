import date from "date-and-time";
import {PlaylistItem, VideoStat, IntervalData, YT_data} from '../types/youtubeTypes'
import axios from "axios";



let url = "https://accounts.google.com/o/oauth2/v2/auth";
  url += `?client_id=284320772177-9it3a6skjshvpeu4nvpeknp6nq8ko8h2.apps.googleusercontent.com`;
  url += "&redirect_uri=http://localhost:8000/api/youtube/connect";
  url += "&response_type=code";
  url +=
    "&scope=https://www.googleapis.com/auth/yt-analytics.readonly https://www.googleapis.com/auth/youtube.readonly";
  url += "&include_granted_scopes=true";
  url += "&state=";

export const ytURL = url;

export function getCode(url) {
  return url?.substring(url?.indexOf("&code="), url?.indexOf("&scope=")).split("code=")[1];
}

export async function getAccessToken(code) {
  const accessToken = await axios.post(
    `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.YT_CLIENT_ID}&client_secret=${process.env.YT_CLIENT_SECRET}&redirect_uri=http://localhost:8000/api/youtube/connect&grant_type=authorization_code`
  ).then(r=> r.data.access_token);

  return accessToken
}

export async function fetchBasicStat (yt_accessToken: string) {

    // Youtube Data API -> views, subscribers, uploads
    const channelStats = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/channels?mine=true&part=snippet,contentDetails,statistics&access_token=${yt_accessToken}`
      ).then((r) => r.data);
      const { viewCount, subscriberCount, videoCount } =
        channelStats.items[0].statistics;
    
    // Youtube Data API -> Get top 5 videos from 'Uploads' playlist
      const playlistId =
        channelStats.items[0].contentDetails.relatedPlaylists.uploads;
    
      const uploadPlaylist = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=5&playlistId=${playlistId}&key=${process.env.YT_API_KEY}`
      ).then((r) => r.data);
      const videoIdList = <string[]>uploadPlaylist.items.map((e: PlaylistItem) => {
        return e.contentDetails.videoId;
      });
    
      const videoStatsList = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics,player&id=${videoIdList.toString()}&key=${
          process.env.YT_API_KEY
        }`
      ).then((r) => r.data);
    
      const videoObjects = videoStatsList.items.map((e: VideoStat) => {
        return {
          title: e.snippet.title,
          view_count: e.statistics.viewCount,
          like_count: e.statistics.likeCount,
          comment_count: e.statistics.commentCount,
        };
      });

      return {viewCount, subscriberCount, videoCount, videoObjects}
}


export async function fetchDemoGeo (yt_accessToken: string) {
      // Youtube Analytics API -> Demographics (age&gender)
  const dateNow = new Date();
  const formattedDateNow = date.format(dateNow, "YYYY-MM-DD");
  const demographics = await axios.get(
    `https://youtubeanalytics.googleapis.com/v2/reports?dimensions=ageGroup,gender&startDate=2000-05-01&endDate=${formattedDateNow}&ids=channel==MINE&metrics=viewerPercentage&sort=gender,ageGroup&access_token=${yt_accessToken}`
  ).then((r) => r.data.rows)

  // Youtube Analytics API -> Geographics (Country by views)
  const geographics = await axios.get(
    `https://youtubeanalytics.googleapis.com/v2/reports?dimensions=country&startDate=2000-05-01&endDate=${formattedDateNow}&ids=channel==MINE&metrics=views&sort=views&access_token=${yt_accessToken}`
  ).then((r) => r.data.rows)

  return {demographics, geographics}
}


export async function fetchIntervalData (yt_accessToken: string) {
    let day = new Date(), prevDay = new Date(), week = new Date(), month = new Date()
    prevDay.setDate(week.getDate()-3)
    week.setDate(week.getDate()-9)
    month.setDate(month.getDate()-31)
    const dayFormat = date.format(day, "YYYY-MM-DD");
    const prevDayFormat = date.format(prevDay, "YYYY-MM-DD");
    const weekFormat = date.format(week, "YYYY-MM-DD");
    const monthFormat = date.format(month, "YYYY-MM-DD");

    const data_intervals: IntervalData = {day: [],week: [],month: []}

    const dailyData = await axios.get(
        `https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day&startDate=${prevDayFormat}&endDate=${dayFormat}&ids=channel==MINE&metrics=views,likes,subscribersGained&sort=day&access_token=${yt_accessToken}`
      ).then((r) => data_intervals.day = r.data.rows )

    const weeklyData = await axios.get(
        `https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day&startDate=${weekFormat}&endDate=${dayFormat}&ids=channel==MINE&metrics=views,likes,subscribersGained&sort=day&access_token=${yt_accessToken}`
      ).then((r) => data_intervals.week = r.data.rows )

    const monthlyData = await axios.get(
        `https://youtubeanalytics.googleapis.com/v2/reports?dimensions=day&startDate=${monthFormat}&endDate=${dayFormat}&ids=channel==MINE&metrics=views,likes,subscribersGained&sort=day&access_token=${yt_accessToken}`
      ).then((r) => data_intervals.month = r.data.rows )

      return data_intervals
}



export async function postYTData(organized_data: YT_data, cookies:string) {
  await axios.post("http://localhost:8000/api/youtube/update", organized_data, {
    headers:  {
      "Content-Type": "application/json",
      "Authorization": cookies
    },
    withCredentials: true
  })
}

