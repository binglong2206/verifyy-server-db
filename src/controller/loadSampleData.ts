import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { Account_stat } from "../entity/Account_stat";
import { FB_account } from "../entity/FB_account";
import { FB_media } from "../entity/FB_media";
import { IG_account } from "../entity/IG_account";
import { IG_media } from "../entity/IG_media";
import { YT_account } from "../entity/YT_account";
import { YT_media } from "../entity/YT_media";
import { AppDataSource } from "../data-source";
import { parseDemoFB } from "../utils/parseDemo";
import { parseGeoFB } from "../utils/parseGeo";
import { parseDemoYT } from "../utils/parseDemo";
import { parseGeoYT } from "../utils/parseGeo";
import { parseDemoIG } from "../utils/parseDemo";
import { parseGeoIG } from "../utils/parseGeo";


export async function loadSampleData(
  req: Request,
  res: Response,
  next: NextFunction
) {

  const insertIGMedia = async (ig_account) => {
    let medias = [];
    for (let i = 0; i < 4; i++){
      const ig_media = new IG_media(); // map & create multiple media entity in array
      ig_media.like_count = 546
      ig_media.comment_count = 34
      ig_media.thumbnail = 'https://firebasestorage.googleapis.com/v0/b/verifyy-e4ece.appspot.com/o/bphcRDY6pys-HD.jpg?alt=media&token=1b3d9aa4-205f-4e73-9c07-d4b1e3ca4f1c'
      ig_media.src_url = 'https://www.google.com/'
      ig_media.account = ig_account // This is null cus' account hasnt been saved yet
      await AppDataSource.manager.save(ig_media).then(() => {
        medias.push(ig_media)
      });
    };
    return medias 
  }

  const insertYTMedia = async (yt_account) => {
    let medias = [];
    for (let i = 0; i < 4; i++){
      const yt_media = new YT_media(); // map & create multiple media entity in array
      yt_media.title = 'sadasd'
      yt_media.thumbnail = 'https://firebasestorage.googleapis.com/v0/b/verifyy-e4ece.appspot.com/o/PPIX_bUanOk-HD.jpg?alt=media&token=35561bf6-865d-4f27-b188-6a29a89a46fe'
      yt_media.view_count = 246
      yt_media.like_count = 34
      yt_media.comment_count = 35
      yt_media.account = yt_account;
      await AppDataSource.manager.save(yt_media).then(()=> {
        medias.push(yt_media)
      })
    };
    return medias 
  }

  const insertFBMedia = async (fb_account) => {
    let medias = [];
    for (let i = 0; i < 4; i++){
      const fb_media = new FB_media(); // map & create multiple media entity in array
      fb_media.like_count = 345
      fb_media.comment_count = 67
      fb_media.thumbnail = 'https://firebasestorage.googleapis.com/v0/b/verifyy-e4ece.appspot.com/o/20syl-e1509026685278%20(1)%20(1).jpg?alt=media&token=baaed643-ed15-4571-a323-df63caa5827b'
      fb_media.src_url = 'https://www.google.com/'
      fb_media.impression_count = 806
      fb_media.account = fb_account
      await AppDataSource.manager.save(fb_media).then(() => {
        medias.push(fb_media)
      });
    };
    return medias 
  }


  try {
    const { id, username } = res.locals; // id & username saved as locals by JWT middleware
    console.log('THISONE', id)
    // Check if fb_account exist
    let fb_account = await FB_account.findOneBy({
      user: {
        id: id,
      },
    });

    if (!fb_account) {
      fb_account = new FB_account();
      await AppDataSource.manager.save(fb_account); // Save here so media entity can assign to it
    }

    // Search all medias belonging to user and delete, repository is the real table itself
    const medias = await FB_media.findBy({
      account: {
        id: fb_account.id,
      },
    });

    const mediaRepository = AppDataSource.getRepository(FB_media);
    if (medias) mediaRepository.remove(medias);

    // Insert from req.body
    fb_account.username = 'Official RobertRobinson'
    fb_account.profile_image = 'https://firebasestorage.googleapis.com/v0/b/verifyy-e4ece.appspot.com/o/cM.Nachtschatt-9297.jpg?alt=media&token=5e747a04-7342-410b-8b87-40b28a8cf8d8'
    fb_account.follower_count = 980
    fb_account.like_count = 36
    fb_account.media_count = 80
    fb_account.demographics = {"male":74.80314960629921,"female":25.196850393700785,"others":0,"age":{"18-24":3.149606299212598,"25-34":44.09448818897638,"35-44":27.559055118110237,"45+":25.196850393700785}}
    fb_account.geographics = {"CN":0.7874015748031495,"MY":5.511811023622047,"TH":92.91338582677166,"KH":0.7874015748031495}
    fb_account.data_intervals = {"day":{"follower_count":[{"value":78 ,"end_time":"2022-07-23T07:00:00+0000"}],"impression_count":[{"value":37,"end_time":"2022-07-23T07:00:00+0000"}],"engagement_count":[{"value":39,"end_time":"2022-07-23T07:00:00+0000"}]},"week":{"follower_count":[{"value":40,"end_time":"2022-07-17T07:00:00+0000"},{"value":0,"end_time":"2022-07-18T07:00:00+0000"},{"value":47,"end_time":"2022-07-19T07:00:00+0000"},{"value":0,"end_time":"2022-07-20T07:00:00+0000"},{"value":56,"end_time":"2022-07-21T07:00:00+0000"},{"value":0,"end_time":"2022-07-22T07:00:00+0000"},{"value":97,"end_time":"2022-07-23T07:00:00+0000"}],"impression_count":[{"value":0,"end_time":"2022-07-17T07:00:00+0000"},{"value":28,"end_time":"2022-07-18T07:00:00+0000"},{"value":0,"end_time":"2022-07-19T07:00:00+0000"},{"value":35,"end_time":"2022-07-20T07:00:00+0000"},{"value":0,"end_time":"2022-07-21T07:00:00+0000"},{"value":37,"end_time":"2022-07-22T07:00:00+0000"},{"value":38,"end_time":"2022-07-23T07:00:00+0000"}],"engagement_count":[{"value":102,"end_time":"2022-07-17T07:00:00+0000"},{"value":0,"end_time":"2022-07-18T07:00:00+0000"},{"value":48,"end_time":"2022-07-19T07:00:00+0000"},{"value":38,"end_time":"2022-07-20T07:00:00+0000"},{"value":99,"end_time":"2022-07-21T07:00:00+0000"},{"value":100,"end_time":"2022-07-22T07:00:00+0000"},{"value":49,"end_time":"2022-07-23T07:00:00+0000"}]},"month":{"follower_count":[{"value":0,"end_time":"2022-06-26T07:00:00+0000"},{"value":0,"end_time":"2022-06-27T07:00:00+0000"},{"value":0,"end_time":"2022-06-28T07:00:00+0000"},{"value":0,"end_time":"2022-06-29T07:00:00+0000"},{"value":0,"end_time":"2022-06-30T07:00:00+0000"},{"value":0,"end_time":"2022-07-01T07:00:00+0000"},{"value":0,"end_time":"2022-07-02T07:00:00+0000"},{"value":0,"end_time":"2022-07-03T07:00:00+0000"},{"value":0,"end_time":"2022-07-04T07:00:00+0000"},{"value":0,"end_time":"2022-07-05T07:00:00+0000"},{"value":0,"end_time":"2022-07-06T07:00:00+0000"},{"value":0,"end_time":"2022-07-07T07:00:00+0000"},{"value":0,"end_time":"2022-07-08T07:00:00+0000"},{"value":0,"end_time":"2022-07-09T07:00:00+0000"},{"value":0,"end_time":"2022-07-10T07:00:00+0000"},{"value":0,"end_time":"2022-07-11T07:00:00+0000"},{"value":0,"end_time":"2022-07-12T07:00:00+0000"},{"value":0,"end_time":"2022-07-13T07:00:00+0000"},{"value":0,"end_time":"2022-07-14T07:00:00+0000"},{"value":0,"end_time":"2022-07-15T07:00:00+0000"},{"value":0,"end_time":"2022-07-16T07:00:00+0000"},{"value":0,"end_time":"2022-07-17T07:00:00+0000"},{"value":0,"end_time":"2022-07-18T07:00:00+0000"},{"value":0,"end_time":"2022-07-19T07:00:00+0000"},{"value":0,"end_time":"2022-07-20T07:00:00+0000"},{"value":0,"end_time":"2022-07-21T07:00:00+0000"},{"value":0,"end_time":"2022-07-22T07:00:00+0000"},{"value":0,"end_time":"2022-07-23T07:00:00+0000"}],"impression_count":[{"value":0,"end_time":"2022-06-26T07:00:00+0000"},{"value":0,"end_time":"2022-06-27T07:00:00+0000"},{"value":0,"end_time":"2022-06-28T07:00:00+0000"},{"value":0,"end_time":"2022-06-29T07:00:00+0000"},{"value":0,"end_time":"2022-06-30T07:00:00+0000"},{"value":0,"end_time":"2022-07-01T07:00:00+0000"},{"value":0,"end_time":"2022-07-02T07:00:00+0000"},{"value":0,"end_time":"2022-07-03T07:00:00+0000"},{"value":0,"end_time":"2022-07-04T07:00:00+0000"},{"value":0,"end_time":"2022-07-05T07:00:00+0000"},{"value":0,"end_time":"2022-07-06T07:00:00+0000"},{"value":33,"end_time":"2022-07-07T07:00:00+0000"},{"value":36,"end_time":"2022-07-08T07:00:00+0000"},{"value":0,"end_time":"2022-07-09T07:00:00+0000"},{"value":0,"end_time":"2022-07-10T07:00:00+0000"},{"value":38,"end_time":"2022-07-11T07:00:00+0000"},{"value":5,"end_time":"2022-07-12T07:00:00+0000"},{"value":0,"end_time":"2022-07-13T07:00:00+0000"},{"value":5,"end_time":"2022-07-14T07:00:00+0000"},{"value":7,"end_time":"2022-07-15T07:00:00+0000"},{"value":5,"end_time":"2022-07-16T07:00:00+0000"},{"value":0,"end_time":"2022-07-17T07:00:00+0000"},{"value":1,"end_time":"2022-07-18T07:00:00+0000"},{"value":0,"end_time":"2022-07-19T07:00:00+0000"},{"value":0,"end_time":"2022-07-20T07:00:00+0000"},{"value":0,"end_time":"2022-07-21T07:00:00+0000"},{"value":0,"end_time":"2022-07-22T07:00:00+0000"},{"value":0,"end_time":"2022-07-23T07:00:00+0000"}],"engagement_count":[{"value":0,"end_time":"2022-06-26T07:00:00+0000"},{"value":0,"end_time":"2022-06-27T07:00:00+0000"},{"value":0,"end_time":"2022-06-28T07:00:00+0000"},{"value":0,"end_time":"2022-06-29T07:00:00+0000"},{"value":0,"end_time":"2022-06-30T07:00:00+0000"},{"value":0,"end_time":"2022-07-01T07:00:00+0000"},{"value":0,"end_time":"2022-07-02T07:00:00+0000"},{"value":0,"end_time":"2022-07-03T07:00:00+0000"},{"value":0,"end_time":"2022-07-04T07:00:00+0000"},{"value":0,"end_time":"2022-07-05T07:00:00+0000"},{"value":0,"end_time":"2022-07-06T07:00:00+0000"},{"value":0,"end_time":"2022-07-07T07:00:00+0000"},{"value":0,"end_time":"2022-07-08T07:00:00+0000"},{"value":0,"end_time":"2022-07-09T07:00:00+0000"},{"value":0,"end_time":"2022-07-10T07:00:00+0000"},{"value":0,"end_time":"2022-07-11T07:00:00+0000"},{"value":0,"end_time":"2022-07-12T07:00:00+0000"},{"value":0,"end_time":"2022-07-13T07:00:00+0000"},{"value":0,"end_time":"2022-07-14T07:00:00+0000"},{"value":0,"end_time":"2022-07-15T07:00:00+0000"},{"value":1,"end_time":"2022-07-16T07:00:00+0000"},{"value":0,"end_time":"2022-07-17T07:00:00+0000"},{"value":0,"end_time":"2022-07-18T07:00:00+0000"},{"value":0,"end_time":"2022-07-19T07:00:00+0000"},{"value":0,"end_time":"2022-07-20T07:00:00+0000"},{"value":0,"end_time":"2022-07-21T07:00:00+0000"},{"value":0,"end_time":"2022-07-22T07:00:00+0000"},{"value":0,"end_time":"2022-07-23T07:00:00+0000"}]}}
    fb_account.user = await User.findOneBy({
      id: id,
    });

    fb_account.medias = await insertFBMedia(fb_account)

    const seededFacebook = await AppDataSource.manager.save(fb_account);

    
     // Check if ig_account exist
     let ig_account = await IG_account.findOneBy({
      user: {
        id: id,
      },
    });

    if (!ig_account) {
      ig_account = new IG_account();
      await AppDataSource.manager.save(ig_account); // Save here so media entity can assign to it
    }

    // Search all medias belonging to user and delete, repository is the real table itself
    const IGmedias = await IG_media.findBy({
      account: {
        id: ig_account.id,
      },
    });

    const IGmediaRepository = AppDataSource.getRepository(IG_media);
    if (IGmedias) IGmediaRepository.remove(IGmedias);

    // Insert from req.body
    ig_account.username = '@Robert20Syl'
    ig_account.profile_image = 'https://firebasestorage.googleapis.com/v0/b/verifyy-e4ece.appspot.com/o/20syl-Mathieu-Renoult-idile-magazine-1.jpg?alt=media&token=f1e7a654-3a5d-4640-a9d0-eb9031078f83'
    ig_account.follower_count = 889
    ig_account.media_count = 26
    ig_account.demographics = {"male":44.44444444444444,"female":24.242424242424242,"others":31.313131313131315,"age":{"18-24":13.131313131313133,"25-34":23.232323232323232,"35-44":32.323232323232325,"45+":31.313131313131315}}
    ig_account.geographics = {"DE":5.05050505050505,"HK":1.0101010101010102,"TW":1.0101010101010102,"RU":7.07070707070707,"JP":4.040404040404041,"HR":1.0101010101010102,"UA":1.0101010101010102,"NZ":1.0101010101010102,"FR":7.07070707070707,"BR":3.0303030303030303,"SG":1.0101010101010102,"ID":2.0202020202020203,"GB":9.090909090909092,"US":18.181818181818183,"AE":1.0101010101010102,"CH":1.0101010101010102,"IN":1.0101010101010102,"KR":1.0101010101010102,"IQ":1.0101010101010102,"CL":1.0101010101010102,"MX":1.0101010101010102,"GR":1.0101010101010102,"CO":2.0202020202020203,"MY":2.0202020202020203,"ES":3.0303030303030303,"CR":1.0101010101010102,"VE":1.0101010101010102,"AR":4.040404040404041,"AT":1.0101010101010102,"AU":2.0202020202020203,"TH":4.040404040404041,"PE":1.0101010101010102,"CY":1.0101010101010102,"PH":1.0101010101010102,"VN":2.0202020202020203,"PL":2.0202020202020203,"TR":1.0101010101010102,"LK":2.0202020202020203}
    ig_account.data_intervals = {"day":{"follower_count":[{"value":57,"end_time":"2022-07-22T07:00:00+0000"},{"value":80,"end_time":"2022-07-23T07:00:00+0000"}],"impression_count":[{"value":37,"end_time":"2022-07-22T07:00:00+0000"},{"value":48,"end_time":"2022-07-23T07:00:00+0000"}],"reach_count":[{"value":34,"end_time":"2022-07-22T07:00:00+0000"},{"value":67,"end_time":"2022-07-23T07:00:00+0000"}]},"week":{"follower_count":[{"value":30,"end_time":"2022-07-17T07:00:00+0000"},{"value":40,"end_time":"2022-07-18T07:00:00+0000"},{"value":39,"end_time":"2022-07-19T07:00:00+0000"},{"value":34,"end_time":"2022-07-20T07:00:00+0000"},{"value":45,"end_time":"2022-07-21T07:00:00+0000"},{"value":98,"end_time":"2022-07-22T07:00:00+0000"}],"impression_count":[{"value":39,"end_time":"2022-07-17T07:00:00+0000"},{"value":84,"end_time":"2022-07-18T07:00:00+0000"},{"value":28,"end_time":"2022-07-19T07:00:00+0000"},{"value":10,"end_time":"2022-07-20T07:00:00+0000"},{"value":19,"end_time":"2022-07-21T07:00:00+0000"},{"value":39,"end_time":"2022-07-22T07:00:00+0000"}],"reach_count":[{"value":21,"end_time":"2022-07-17T07:00:00+0000"},{"value":36,"end_time":"2022-07-18T07:00:00+0000"},{"value":98,"end_time":"2022-07-19T07:00:00+0000"},{"value":73,"end_time":"2022-07-20T07:00:00+0000"},{"value":53,"end_time":"2022-07-21T07:00:00+0000"},{"value":38,"end_time":"2022-07-22T07:00:00+0000"}]},"month":{"follower_count":[{"value":84,"end_time":"2022-06-26T07:00:00+0000"},{"value":67,"end_time":"2022-06-27T07:00:00+0000"},{"value":85,"end_time":"2022-06-28T07:00:00+0000"},{"value":0,"end_time":"2022-06-29T07:00:00+0000"},{"value":125,"end_time":"2022-06-30T07:00:00+0000"},{"value":0,"end_time":"2022-07-01T07:00:00+0000"},{"value":101,"end_time":"2022-07-02T07:00:00+0000"},{"value":45,"end_time":"2022-07-03T07:00:00+0000"},{"value":23,"end_time":"2022-07-04T07:00:00+0000"},{"value":0,"end_time":"2022-07-05T07:00:00+0000"},{"value":0,"end_time":"2022-07-06T07:00:00+0000"},{"value":0,"end_time":"2022-07-07T07:00:00+0000"},{"value":0,"end_time":"2022-07-08T07:00:00+0000"},{"value":0,"end_time":"2022-07-09T07:00:00+0000"},{"value":20,"end_time":"2022-07-10T07:00:00+0000"},{"value":0,"end_time":"2022-07-11T07:00:00+0000"},{"value":0,"end_time":"2022-07-12T07:00:00+0000"},{"value":0,"end_time":"2022-07-13T07:00:00+0000"},{"value":0,"end_time":"2022-07-14T07:00:00+0000"},{"value":0,"end_time":"2022-07-15T07:00:00+0000"},{"value":0,"end_time":"2022-07-16T07:00:00+0000"},{"value":0,"end_time":"2022-07-17T07:00:00+0000"},{"value":0,"end_time":"2022-07-18T07:00:00+0000"},{"value":0,"end_time":"2022-07-19T07:00:00+0000"},{"value":0,"end_time":"2022-07-20T07:00:00+0000"},{"value":0,"end_time":"2022-07-21T07:00:00+0000"},{"value":0,"end_time":"2022-07-22T07:00:00+0000"}],"impression_count":[{"value":0,"end_time":"2022-06-26T07:00:00+0000"},{"value":0,"end_time":"2022-06-27T07:00:00+0000"},{"value":0,"end_time":"2022-06-28T07:00:00+0000"},{"value":0,"end_time":"2022-06-29T07:00:00+0000"},{"value":0,"end_time":"2022-06-30T07:00:00+0000"},{"value":0,"end_time":"2022-07-01T07:00:00+0000"},{"value":0,"end_time":"2022-07-02T07:00:00+0000"},{"value":0,"end_time":"2022-07-03T07:00:00+0000"},{"value":0,"end_time":"2022-07-04T07:00:00+0000"},{"value":0,"end_time":"2022-07-05T07:00:00+0000"},{"value":0,"end_time":"2022-07-06T07:00:00+0000"},{"value":0,"end_time":"2022-07-07T07:00:00+0000"},{"value":0,"end_time":"2022-07-08T07:00:00+0000"},{"value":0,"end_time":"2022-07-09T07:00:00+0000"},{"value":0,"end_time":"2022-07-10T07:00:00+0000"},{"value":0,"end_time":"2022-07-11T07:00:00+0000"},{"value":0,"end_time":"2022-07-12T07:00:00+0000"},{"value":0,"end_time":"2022-07-13T07:00:00+0000"},{"value":0,"end_time":"2022-07-14T07:00:00+0000"},{"value":0,"end_time":"2022-07-15T07:00:00+0000"},{"value":0,"end_time":"2022-07-16T07:00:00+0000"},{"value":0,"end_time":"2022-07-17T07:00:00+0000"},{"value":0,"end_time":"2022-07-18T07:00:00+0000"},{"value":0,"end_time":"2022-07-19T07:00:00+0000"},{"value":0,"end_time":"2022-07-20T07:00:00+0000"},{"value":0,"end_time":"2022-07-21T07:00:00+0000"},{"value":0,"end_time":"2022-07-22T07:00:00+0000"}],"reach_count":[{"value":0,"end_time":"2022-06-26T07:00:00+0000"},{"value":0,"end_time":"2022-06-27T07:00:00+0000"},{"value":0,"end_time":"2022-06-28T07:00:00+0000"},{"value":0,"end_time":"2022-06-29T07:00:00+0000"},{"value":0,"end_time":"2022-06-30T07:00:00+0000"},{"value":0,"end_time":"2022-07-01T07:00:00+0000"},{"value":0,"end_time":"2022-07-02T07:00:00+0000"},{"value":0,"end_time":"2022-07-03T07:00:00+0000"},{"value":0,"end_time":"2022-07-04T07:00:00+0000"},{"value":0,"end_time":"2022-07-05T07:00:00+0000"},{"value":0,"end_time":"2022-07-06T07:00:00+0000"},{"value":0,"end_time":"2022-07-07T07:00:00+0000"},{"value":0,"end_time":"2022-07-08T07:00:00+0000"},{"value":0,"end_time":"2022-07-09T07:00:00+0000"},{"value":0,"end_time":"2022-07-10T07:00:00+0000"},{"value":0,"end_time":"2022-07-11T07:00:00+0000"},{"value":0,"end_time":"2022-07-12T07:00:00+0000"},{"value":0,"end_time":"2022-07-13T07:00:00+0000"},{"value":0,"end_time":"2022-07-14T07:00:00+0000"},{"value":0,"end_time":"2022-07-15T07:00:00+0000"},{"value":0,"end_time":"2022-07-16T07:00:00+0000"},{"value":0,"end_time":"2022-07-17T07:00:00+0000"},{"value":0,"end_time":"2022-07-18T07:00:00+0000"},{"value":0,"end_time":"2022-07-19T07:00:00+0000"},{"value":0,"end_time":"2022-07-20T07:00:00+0000"},{"value":0,"end_time":"2022-07-21T07:00:00+0000"},{"value":0,"end_time":"2022-07-22T07:00:00+0000"}]}}
    ig_account.user = await User.findOneBy({
      id: id,
    });


    ig_account.medias = await insertIGMedia(ig_account)
  

    const seededInstagram = await AppDataSource.manager.save(ig_account);
    
     // Check if yt_account exist
     let yt_account = await YT_account.findOneBy({
      user: {
        id: id,
      },
    });

    if (!yt_account) {
      yt_account = new YT_account();
      await AppDataSource.manager.save(yt_account); // Save here so media entity can assign to it

    }

    // Search all medias belonging to user and delete, repository is the real table itself
    const YTmedias = await YT_media.findBy({
      account: {
        id: yt_account.id,
      },
    });

    const YTmediaRepository = AppDataSource.getRepository(YT_media);
    if (YTmedias) YTmediaRepository.remove(YTmedias);

    // Insert from req.body
    yt_account.username ='Robert Robinson'
    yt_account.profile_image = 'https://firebasestorage.googleapis.com/v0/b/verifyy-e4ece.appspot.com/o/vldEhcWjVYv-qmRSaJ9e7D7QPRTiqqSEYswwjon75aw%2C0K9N-iwDS3H0qz5aDj3jsYQb-ziobmaKhwqgilcgATw.jpg?alt=media&token=9c086e27-bfc8-4b0a-8258-98d7276ed3fc'
    yt_account.follower_count = 586
    yt_account.view_count = 586
    yt_account.media_count = 49
    yt_account.demographics = {"male":98.5,"female":1.7000000000000002,"age":{"18-24":60.5,"25-34":36.599999999999994,"35-44":2.2,"45+":0.9}}
    yt_account.geographics = {"JP":34.39555445026627,"KR":30.16953803672038,"US":20.237370402449166,"PH":5.782473351570607,"TH":5.000385898414386,"ID":4.41467786057919}
    yt_account.data_intervals = {"day":[["2022-07-21",399,10,49]],"week":[["2022-07-15",450,44,33],["2022-07-16",244,39,24],["2022-07-17",930,32,89],["2022-07-18",535,54,10],["2022-07-19",199,78,78],["2022-07-20",390,23,13],["2022-07-21",320,22,36]],"month":[["2022-06-23",0,0,0],["2022-06-24",0,0,0],["2022-06-25",0,0,0],["2022-06-26",0,0,0],["2022-06-27",0,0,0],["2022-06-28",0,0,0],["2022-06-29",0,0,0],["2022-06-30",0,0,0],["2022-07-01",0,0,0],["2022-07-02",0,0,0],["2022-07-03",0,0,0],["2022-07-04",0,0,0],["2022-07-05",0,0,0],["2022-07-06",0,0,0],["2022-07-07",0,0,0],["2022-07-08",1,0,0],["2022-07-09",0,0,0],["2022-07-10",0,0,0],["2022-07-11",0,0,0],["2022-07-12",0,0,0],["2022-07-13",0,0,0],["2022-07-14",0,0,0],["2022-07-15",0,0,0],["2022-07-16",0,0,0],["2022-07-17",0,0,0],["2022-07-18",1,1,0],["2022-07-19",0,0,0],["2022-07-20",0,0,0],["2022-07-21",0,0,0]]}
    yt_account.user = await User.findOneBy({
      id: id,
    });
    yt_account.medias = await insertYTMedia(yt_account)

    const seededYoutube = await AppDataSource.manager.save(yt_account);

    console.log('SAMPLE DATA LOADED');

    next() // Next to aggregate stats
  } catch (err) {
    next(err);
  }
}
