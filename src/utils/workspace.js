const sampleYTDemo = [
    ["age18-24", "female", 1.3],
    ["age25-34", "female", 0.3],
    ["age35-44", "female", 0],
    ["age55-64", "female", 0.1],
    ["age13-17", "male", 0.1],
    ["age18-24", "male", 59.2],
    ["age25-34", "male", 36.3],
    ["age35-44", "male", 2.2],
    ["age45-54", "male", 0.4],
    ["age55-64", "male", 0.2],
    ["age65-", "male", 0.1]
  ];
 
 const sampleIGDemo = {
    "F.18-24": 2,
    "F.25-34": 5,
    "F.35-44": 6,
    "F.45-54": 7,
    "F.55-64": 2,
    "F.65+": 2,
    "M.18-24": 7,
    "M.25-34": 12,
    "M.35-44": 10,
    "M.45-54": 4,
    "M.55-64": 4,
    "M.65+": 6,
    "U.18-24": 4,
    "U.25-34": 6,
    "U.35-44": 16,
    "U.45-54": 1,
    "U.55-64": 4
  };

const sampleFBDemo = {
    "M.25-34": 37,
    "F.65+": 1,
    "F.55-64": 5,
    "M.55-64": 4,
    "M.65+": 3,
    "F.35-44": 6,
    "M.18-24": 3,
    "M.35-44": 29,
    "M.45-54": 19,
    "F.18-24": 1,
    "F.25-34": 19
  };



const parseDemoYT = (data) => {
    let holder = {
        male: 0,
        female: 0,
        age: {
            "18-24": 0,
            "25-34": 0,
            "35-44": 0,
            "45+": 0
        }
    }

    for (let i = 0; i < data.length; i++) {
        const el = data[i];

        switch(el[0]){
            case("age18-24"): {
                holder.age['18-24'] = holder.age['18-24'] + el[2];
                break;
            }
            case("age25-34"): {
                holder.age['25-34'] = holder.age['25-34'] + el[2];
                break;
            }
            case("age35-44"): {
                holder.age['35-44'] = holder.age['35-44'] + el[2];
                break;
            }
           default: {
                holder.age['45+'] = holder.age['45+'] + el[2]
                break;
            }
        };

        switch(el[1]){
            case 'male': {
                holder.male = holder.male + el[2]
                break;
            }
            case 'female': {
                holder.female = holder.female + el[2]
                break;
            }
        }



    }

    console.log(holder)
}




const parseDemoIG = (data) => {
    let holder = {
        male: 0,
        female: 0,
        others: 0,
        age: {
            "18-24": 0,
            "25-34": 0,
            "35-44": 0,
            "45+": 0
        }
    }
    let follower_count = 0; // get total to calculate %

    // Object.entries -> [...[key,value]]
    for (let [key,value] of Object.entries(data)){ 
        const gender = key[0]
        const age = key.split('.')[1];  
        follower_count += value   

        switch(age){
            case("18-24"): {
                holder.age['18-24'] = holder.age['18-24'] + value;
                break;
            }
            case("25-34"): {
                holder.age['25-34'] = holder.age['25-34'] + value;
                break;
            }
            case("35-44"): {
                holder.age['35-44'] = holder.age['35-44'] + value;
                break;
            }
           default: {
                holder.age['45+'] = holder.age['45+'] + value
                break;
            }
        };

        switch(gender){
            case("M"): {
                holder.male = holder.male+ value;
                break;
            }
            case("F"): {
                holder.female = holder.female + value;
                break;
            }
            case("U"): {
                holder.others = holder.others + value;
                break;
            }
        };
    };

    holder.male = (holder.male/follower_count) * 100;
    holder.female = (holder.female/follower_count) * 100;
    holder.others = (holder.others/follower_count) * 100;

    for (let key in holder.age){
        holder.age[key] = (holder.age[key]/follower_count) * 100;
    }
    console.log(holder)
}


const parseDemoFB = (data) => {
    let holder = {
        male: 0,
        female: 0,
        others: 0,
        age: {
            "18-24": 0,
            "25-34": 0,
            "35-44": 0,
            "45+": 0
        }
    }
    let follower_count = 0; // get total to calculate %

    // Object.entries -> [...[key,value]]
    for (let [key,value] of Object.entries(data)){ 
        const gender = key[0]
        const age = key.split('.')[1];  
        follower_count += value   

        switch(age){
            case("18-24"): {
                holder.age['18-24'] = holder.age['18-24'] + value;
                break;
            }
            case("25-34"): {
                holder.age['25-34'] = holder.age['25-34'] + value;
                break;
            }
            case("35-44"): {
                holder.age['35-44'] = holder.age['35-44'] + value;
                break;
            }
           default: {
                holder.age['45+'] = holder.age['45+'] + value
                break;
            }
        };

        switch(gender){
            case("M"): {
                holder.male = holder.male+ value;
                break;
            }
            case("F"): {
                holder.female = holder.female + value;
                break;
            }
            case("U"): {
                holder.others = holder.others + value;
                break;
            }
        };
    };

    holder.male = (holder.male/follower_count) * 100;
    holder.female = (holder.female/follower_count) * 100;
    holder.others = (holder.others/follower_count) * 100;

    for (let key in holder.age){
        holder.age[key] = (holder.age[key]/follower_count) * 100;
    }
    console.log(follower_count)

}



// parseDemoYT(sampleYTDemo)
// parseDemoIG(sampleIGDemo)
// parseDemoFB(sampleFBDemo)




// TEST GEO
const ig_geo = {
    "DE": 5,
    "TW": 1,
    "HK": 1,
    "RU": 7,
    "JP": 3,
    "HR": 1,
    "NZ": 1,
    "UA": 1,
    "FR": 7,
    "BR": 3,
    "SG": 1,
    "ID": 2,
    "GB": 9,
    "US": 18,
    "AE": 1,
    "CH": 1,
    "IN": 1,
    "KR": 1,
    "IQ": 1,
    "CL": 1,
    "GR": 1,
    "MX": 1,
    "MY": 2,
    "CO": 2,
    "ES": 3,
    "VE": 1,
    "CR": 1,
    "AR": 4,
    "AT": 1,
    "AU": 2,
    "TH": 4,
    "PE": 1,
    "CY": 1,
    "PH": 1,
    "VN": 2,
    "PL": 2,
    "TR": 1,
    "LK": 2
  };

  const fb_geo = {
    "CN": 1,
    "MY": 7,
    "TH": 118,
    "KH": 1
  }


  const yt_geo = [
    ["JP", 40109, 58446, 87, 42.46, 0],
    ["KR", 35181, 49166, 83, 42.22, 0],
    ["US", 23599, 31967, 81, 38.19, 0],
    ["PH", 6743, 9603, 85, 47.53, 0],
    ["TH", 5831, 8689, 91, 41.06, 0],
    ["ID", 5148, 7960, 92, 43.66, 0],
    ["BR", 3073, 6720, 131, 45.97, 0],
    ["VN", 1929, 2768, 86, 42.2, 0],
    ["IT", 1406, 2568, 109, 47.87, 0],
    ["FR", 800, 1150, 86, 36.45, 0],
    ["TW", 730, 1247, 102, 46.07, 0],
    ["GB", 422, 727, 103, 41.01, 0],
    ["MX", 388, 1072, 165, 78.98, 0],
    ["CA", 325, 507, 93, 38.39, 0],
    ["HK", 306, 391, 76, 33.02, 0],
    ["MY", 255, 378, 89, 42.88, 0],
    ["DE", 208, 333, 96, 40.07, 0],
    ["RU", 206, 354, 103, 54.08, 0],
    ["SG", 120, 182, 91, 44.05, 0],
    ["IN", 109, 255, 140, 57.28, 0],
    ["AU", 95, 192, 121, 50.42, 0],
    ["ES", 88, 127, 87, 32.7, 0],
    ["PE", 84, 83, 59, 26.229999999999997, 0],
    ["CL", 69, 391, 340, 115.8, 0],
    ["CN", 68, 47, 42, 21.62, 0],
    ["AR", 55, 100, 109, 47.35, 0],
    ["MA", 40, 13, 20, 9.77, 0],
    ["BE", 38, 80, 127, 55.96, 0],
    ["CY", 35, 42, 72, 29.2, 0],
    ["TR", 35, 56, 97, 40.47, 0],
    ["ZA", 35, 23, 39, 16.79, 0],
    ["NZ", 33, 51, 94, 51.76, 0],
    ["PL", 32, 45, 84, 36.17, 0],
    ["PT", 31, 79, 154, 53.81, 0],
    ["CO", 30, 60, 120, 54.569999999999993, 0],
    ["PY", 30, 63, 127, 37.46, 0],
    ["HU", 27, 24, 55, 30.86, 0],
    ["LV", 27, 17, 39, 22.6, 0],
    ["MQ", 27, 21, 47, 21.66, 0],
    ["UA", 26, 9, 22, 7.39, 0],
    ["CH", 25, 32, 77, 31.53, 0],
    ["RO", 25, 49, 118, 50.629999999999995, 0],
    ["FI", 21, 25, 73, 33.27, 0],
    ["NL", 20, 20, 62, 29.14, 0],
    ["AE", 14, 18, 77, 44.79, 0],
    ["SK", 14, 5, 23, 9, 0],
    ["MK", 13, 14, 68, 61.240000000000009, 0],
    ["MN", 13, 35, 164, 64.41, 0],
    ["AT", 12, 6, 33, 15.990000000000002, 0],
    ["CZ", 12, 27, 138, 56.720000000000006, 0],
    ["KH", 11, 8, 46, 28.48, 0],
    ["LA", 11, 18, 99, 68.17, 0],
    ["MM", 11, 8, 49, 23.42, 0],
    ["GR", 10, 55, 332, 113.40999999999998, 0],
    ["IL", 10, 16, 97, 48.78, 0],
    ["KE", 10, 6, 41, 15.990000000000002, 0],
    ["MG", 10, 17, 102, 46.79, 0],
    ["NG", 10, 28, 173, 61.199999999999996, 0],
    ["NO", 10, 10, 60, 25.72, 0],
    ["RS", 10, 30, 185, 61.63000000000001, 0],
    ["SI", 10, 10, 61, 35.55, 0],
    ["VE", 10, 9, 58, 33.28, 0],
    ["EC", 0, 0, 0, 0, 0],
    ["MU", 0, 0, 0, 0, 0]
  ]






const parseGeoYT = (data) => {
    let geoData = [];
    let total_views = 0;

    for (let [country,views] of data) { // For..of iterate over elements, for...in uses just keys
        geoData[country] = views            // key in array is just index key of the elemnt
        total_views +=views
    };

    for (let key in geoData) { 
        geoData[key] = (geoData[key] / total_views) * 100
    }
};


const parseGeoIG = (data) => {
    let holder = {};
    let follower_count = 0;

    for (let [country, value] of Object.entries(data)) {
        holder[country] = value;
        follower_count += value
    };

    for (let [country, value] of Object.entries(holder)) {
        holder[country] = (holder[country] / follower_count )* 100
    };
    
console.log(holder)
return holder
};


const parseGeoFB = (data) => {
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

// parseGeoYT(yt_geo)
// parseGeoIG(ig_geo);
parseGeoFB(fb_geo)