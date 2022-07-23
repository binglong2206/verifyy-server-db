export interface DataPoint { // date, followers | engagement | impressions
  [key: string]: string | number;
  end_time: string
  value: number;
}

export interface IntervalData { 
  day: {
    follower_count: DataPoint[];
    engagement_count: DataPoint[];
    impression_count: DataPoint[];
  }
  week: {
    follower_count: DataPoint[];
    engagement_count: DataPoint[]
    impression_count: DataPoint[];
  }  
  month: {
    follower_count: DataPoint[];
    engagement_count: DataPoint[]
    impression_count: DataPoint[];
  }
}


export interface Media {
  media_url: string;
  src_url: string;
  like_count: number;
  comment_count: number;
  impression_count: number;
}

export interface FB_data {
  follower_count: number;
  like_count: number;
  media_count: number;
  demographics: any; // refer to fb_demo_geo.json
  geographics: any; // refer to fb_demo_geo.json
  data_intervals: IntervalData;
  medias: Media[];
}