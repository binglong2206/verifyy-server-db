type YT_demo_raw = [string,string,number][];
interface YT_demo {
  male: number;
  female: number;
  age: {
    "18-24": number
    "25-34": number
    "35-44": number
      "45+": number
  }
}

export const parseDemoYT = (data: YT_demo_raw): YT_demo => {
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
  return holder
}



interface IG_demo_raw {
  [key:string]: number
}
interface IG_demo {
  male: number;
  female: number;
  others: number;
  age: {
    "18-24": number
    "25-34": number
    "35-44": number
      "45+": number
  }
}
export const parseDemoIG = (data: IG_demo_raw): IG_demo => {
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
  
  return holder
}


interface FB_demo_raw {
  [key:string]: number
}
interface FB_demo {
  male: number;
  female: number;
  others: number;
  age: {
    "18-24": number
    "25-34": number
    "35-44": number
      "45+": number
  }
}

export const parseDemoFB = (data: FB_demo_raw): FB_demo => {
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

  return holder;

}
