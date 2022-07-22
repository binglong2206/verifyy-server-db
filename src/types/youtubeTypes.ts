
export interface IntervalData { // date, view, likes, subsGained
    day: [string, number, number, number][]
    week: [string, number, number, number][]
    month: [string, number, number, number][]
  }
  
export interface YT_data {
    follower_count: number;
    view_count: number;
    media_count: number;
    demographics: [string, string, number][];
    geographics: [string, number][];
    data_intervals: IntervalData;
    medias: {
      title: string;
      view_count: number;
      like_count: number;
      comment_count: number;
    }[];
  }


 export interface PlaylistItem {
    kind: string;
    etag: string;
    id: string;
    contentDetails: {
      videoId: string;
      videoPublishedAt: string;
    };
  }
  
  export interface VideoStat {
    kind: string;
    etag: string;
    id: string;
    snippet: any;
    contentDetails: any;
    statistics: any;
    player: any;
  }


