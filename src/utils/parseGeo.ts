type YT_geo_raw = [string,number][];
interface YT_geo {
    [key: string]: number
}

export const parseGeoYT = (data: YT_geo_raw): YT_geo => {
    let holder = {};
    let total_views = 0;

    for (let [country,views] of data) { // For..of iterate over elements, for...in uses just keys
        holder[country] = views            // key in array is just index key of the elemnt
        total_views +=views
    };

    for (let key in holder) { 
        holder[key] = (holder[key] / total_views) * 100
    }
    return holder
};

interface IG_geo {
    [key: string]: number
}


export const parseGeoIG = (data: IG_geo): IG_geo => {
    let holder = {};
    let follower_count = 0;

    for (let [country, value] of Object.entries(data)) {
        holder[country] = value;
        follower_count += value
    };

    for (let [country, value] of Object.entries(holder)) {
        holder[country] = (holder[country] / follower_count )* 100
    };
    
    return holder
};


interface FB_geo {
    [key:string]:number
}
export const parseGeoFB = (data: FB_geo): FB_geo => {
    let holder = {};
    let follower_count = 0;

    for (let [country, value] of Object.entries(data)) {
        holder[country] = value;
        follower_count += value
    };

    for (let [country, value] of Object.entries(holder)) {
        holder[country] = (holder[country] / follower_count )* 100
    };
    
    return holder
}

