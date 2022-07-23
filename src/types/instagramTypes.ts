
export interface DataPoint {
  [key: string]: string | number;
  value: number;
  end_time: string
}
export interface IntervalData { // {date, followers | impressions | reach}
  day: {
    follower_count: DataPoint[];
    impression_count: DataPoint[];
    reach_count: DataPoint[]
  }
  week: {
    follower_count: DataPoint[];
    impression_count: DataPoint[];
    reach_count: DataPoint[]
  }  
  month: {
    follower_count: DataPoint[];
    impression_count: DataPoint[];
    reach_count: DataPoint[]
  }
}

export interface IG_data {
  username: string;
  follower_count: number;
  media_count: number;
  demographics: any; // refer to ig_demo_geo.json
  geographics: any; // refer to ig_demo_geo.json
  data_intervals: IntervalData
  medias: {
    id: string;
    like_count: number;
    comment_count: number;
    media_url: string;
    src_url: string;
  }[];
}