// Response for Uptime Robot
/*
const http = require("http");

http.createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Discord bot is active now \n");
  }).listen(3000);
*/


const http = require("http");
const querystring = require("querystring");

http
  .createServer(function(req, res) {
    if (req.method == "POST") {
      var data = "";
      req.on("data", function(chunk) {
        data += chunk;
      });
      req.on("end", function() {
        if (!data) {
          console.log("No post data");
          res.end();
          return;
        }
        var dataObject = querystring.parse(data);
        console.log("post:" + dataObject.type);
        if (dataObject.type == "wake") {
          console.log("Woke up in post");
          res.end();
          return;
        }
        res.end();
      });
    } else if (req.method == "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Discord Bot is active now\n");
    }
  })
  .listen(3000);


//implements
const discord = require("discord.js");
const client = new discord.Client();
const ytdl = require('ytdl-core');
const fs=require("fs");
/*const {Readable}=require('stream'); //録音botとかできたらいいけど...難しい //I wanted to record, but did't find good way.
class Silence extends Readable{
  _read(){this.push(Buffer.from([0xF8,0xFF,0xFE]))}
}*/
//const path=require('path');
//const wavConverter = require('wav-converter') //pcm to wav


//自分でどこかに音声データをアップロードし、そのurlをここに追加したら、アップロードした音声をShortReaction(message);関数で再生できる。client.on中でコメントアウトしている部分参照
//upload audio data, set it's url here. function ShortReaction(message) play the audio. See  on.client
const short_reaction_list=[
  /*
  example: 
  ["hello","voice data url for hello"], 
  ["good bye","voice data url for good bye"],
  ["happy birthday","voice data url for happy birthday"]  */
]

//readyの時
client.on("ready", message => {
  client.user.setPresence({ activity: { name: "「!help」でヘルプ" } });
});




//話しかけられた時
client.on("message", message => {
  //console.log(client.user);
  
  if(message.author == client.user) return; //自分には絶対に反応しない
  
  //呼びかけ
  if (message.mentions.has(client.user) ) {
    message.reply("Hello , I am a bot! \n!help　と送信すればこのbotの機能が分かります");
    return;
  }
  
  //操作色々
  if (message.content.startsWith("!help") ) {
    message.channel.send(
      "!help: helpを見る。 \n!youtube url: youtubeのurlの動画の音声を流す \n!r: 短いリアクション音声を送信　\n!bye: ボイスチャンネルから追い出す \n"
    );
    return;
  }

  //youtue
  if (message.content.startsWith("!youtube ") ) {
    youtube_sound(message);
    return;
  }
  
  //reation voice
  /*
  if(message.content.startsWith("!r") ){
    ShortReaction(message);
    return;
  }  */
  
   //stop
  if (message.content.startsWith("!bye") ) {
    bye(message);
    return;
  }

});




if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);
//console.log(process.env.DISCORD_BOT_TOKEN);






// make a new stream for each time someone starts to talk
/* gave up recording voice
function generateOutputFile(member) {
  // use IDs instead of username cause some people have stupid emojis in their name
  const fileName = `./public/recordings/${member.id}-${Date.now()}.pcm`;
  const file= fs.createWriteStream(fileName);
  return file;
}*/


/*関数が出てくるぜ functions below*/
//諦めた gave up
/*
function voice_record(message){
  if (!message.member.voice.channel) {
    message.reply("ボイスチャンネルへ入ってください");
    return;
  }

  message.member.voice.channel.join().then(connection => {
      //connection.play(new Silence,{type:'opus'});//silence
      
      message.reply("音声を録音します \n何か入力されれば録音終了します。(max30秒)");
      var receiver=connection.receiver;
      var recorded;
    
    //const outputStream = generateOutputFile({id:'a'});
      
      connection.on('speaking', (user, speaking) => {
        if(!speaking) return;
        //if(user==client.user)return;
        //console.log(user);
        recorded=receiver.createStream(user,{mode:'pcm'}); //,end:'manual'
        const outputStream = generateOutputFile({user});
         recorded.pipe(outputStream);
        outputStream.on('data',console.log);
        recorded.on('end',()=>{
          outputStream.end();
          message.channel.send("end");
          connection.play(iceman_sound_url[1]);
          
          /*var pcmData = fs.readFileSync(path.resolve('./public/recordings', `./${user.id}-${Date.now()}.pcm`))
          var wavData = wavConverter.encodeWav(pcmData, {
            numChannels: 1,
            sampleRate: 16000,
            byteRate: 16
          })
          fs.writeFileSync(path.resolve('./public/recordings', `./${user.id}-${Date.now()}.wav`), wavData)*/
       /*   
        });
      });
    
      //録音終了判定
      const filter = message=>message.author!=client.user;//自分以外
      message.channel.awaitMessages(filter,{ max: 1, time: 30000 }).then(collected=>{    
        const response = collected.first();
         if (!response){
           message.member.voice.channel.leave();
           return message.channel.send('30秒超過。録音を停止します');
         }
         if(client.user!=response.author) {
           message.member.voice.channel.leave();
           message.channel.send("録音を終了します。");
           //console.log(recorded);
           //setTimeout(function(){ connection.play(recorded,{ type:'opus' });},2000);
           /*message.channel.send({
             files: [{
    attachment: recorded,
    name: 'file.jpg'
  }]});*/
           /*
         }
        
         
      });  
    }).catch(err => console.log(err));

}*/


function record_play(message){
  var fileList;
  fs.readdir('./public/recordings', function(err, files){
    if (err) throw err;
        fileList = files.filter(function(file){
        //return files.filter(el => /\.opus$/.test(el))//絞り込み
          return file;
    })
    
    var text="";
    
    for(let i=0; i<fileList.length;i++){
      text+=`${i}: ${fileList[i]} \n`;
      
    }
    if(text!=""){
      message.channel.send(text);
    }else{
      return message.channel.send('録音は現在存在しません');
    }
});
  
  //if(!fileList.length) 
  const filter = msg => msg.author.id === message.author.id;
  message.channel.awaitMessages(filter, { max: 1, time: 10000 }).then(collected=>{
       const response = collected.first();
       if (!response) return message.channel.send('タイムアウト');
      
       if (0<=response.content && response.content<fileList.length) {
         message.channel.send(`play ${fileList[response.content]}`,{type:'converted'});
         
         message.member.voice.channel.join().then(connection => {
           const dispatcher = connection.play(`./public/recordings/${fileList[response.content]}`);
           dispatcher.once("finish", reason => {
             console.log("finish");
              message.member.voice.channel.leave();
            });
          }).catch(err => console.log(err));
         
       }else{
         message.channel.send('正しくありません');
       }
       
     });
}







//youtube
function youtube_sound(message) {
  if (!message.member.voice.channel) {
    message.reply("ボイスチャンネルへ入ってください");
    return;
  }

  //const url = "https://www.youtube.com/watch?v=ZlAU_w7-Xp8";
  const url = message.content.split(" ")[1];

  if (!ytdl.validateURL(url)) {
    message.reply("動画が存在しません");
    return;
  }

  message.member.voice.channel
    .join()
    .then(connection => {
    
      message.reply("play youtube sound");
    
      const stream = ytdl(url, { filter: 'audioonly' });
      console.log(stream);
      const streamOptions = { seek: 0, volume: 0.2 };
      const dispatcher = connection.play(stream ,streamOptions);

      dispatcher.once("finish", reason => {
        message.reply("youtube sound end");
        message.member.voice.channel.leave();
      });
    }).catch(err => console.log(err));
}









function iceman_sound(message) {
  if (!message.member.voice.channel) {
    message.reply("ボイスチャンネルへ入ってください");
    return;
  }

  //const url = "https://www.youtube.com/watch?v=ZlAU_w7-Xp8";
  const url_num = Math.floor(Math.random() * iceman_sound_url.length);

  const url = iceman_sound_url[url_num];

  message.member.voice.channel
    .join()
    .then(connection => {
      message.reply("play iceman sound");

      const dispatcher = connection.play(url);

      dispatcher.once("finish", reason => {
        message.reply("iceman sound " + url_num + " end");
        message.member.voice.channel.leave();
      });
    })
    .catch(err => console.log(err));
}







function ShortReaction(message){
  if (!message.member.voice.channel) {
    message.reply("ボイスチャンネルへ入ってください");
    return;
  }
  
  let reaction_list="反応一覧 ";
  for(let i=0;i<short_reaction_list.length;i++){
    //reaction_list+="\n"+i+": "+short_reaction_list[i][0];
    if(i%2==0)reaction_list+="\n";
    reaction_list+=i+": "+short_reaction_list[i][0]+" ";
    
  }
  
   message.reply(reaction_list);
  
   message.channel.send('番号を入力してください（10秒）');
     const filter = msg => msg.author.id === message.author.id;
     message.channel.awaitMessages(filter, { max: 1, time: 10000 }).then(collected=>{
       const response = collected.first();
       if (!response) return message.channel.send('タイムアウト');

       if (0<=response.content && response.content<short_reaction_list.length) {
         message.channel.send(`speak ${short_reaction_list[response.content][0]} by ${message.author}`);
         
         message.member.voice.channel.join().then(connection => {
           const dispatcher = connection.play(short_reaction_list[response.content][1]);
           dispatcher.once("finish", reason => {
              message.member.voice.channel.leave();
            });
          }).catch(err => console.log(err));
         
       }else{
         message.channel.send('正しくありません');
       }
       
     });
     

}




function SignalReaction(message){
  if (!message.member.voice.channel) {
    message.reply("ボイスチャンネルへ入ってください");
    return;
  }
  
  let reaction_list="反応一覧 ";
  for(let i=0;i<signal_reaction_list.length;i++){
    //reaction_list+="\n"+i+": "+signal_reaction_list[i][0];
    if(i%2==0)reaction_list+="\n";
    reaction_list+=i+": "+signal_reaction_list[i][0]+" ";
  }
  
   message.reply(reaction_list);
  
   message.channel.send('番号を入力してください（10秒）');
     const filter = msg => msg.author.id === message.author.id;
     message.channel.awaitMessages(filter, { max: 1, time: 10000 }).then(collected=>{
       const response = collected.first();
       if (!response) return message.channel.send('タイムアウト');

       if (0<=response.content && response.content<signal_reaction_list.length) {
         message.channel.send(`speak ${signal_reaction_list[response.content][0]} by ${message.author}`);
         
         message.member.voice.channel.join().then(connection => {
           const dispatcher = connection.play(signal_reaction_list[response.content][1]);
           dispatcher.once("finish", reason => {
              message.member.voice.channel.leave();
            });
          }).catch(err => console.log(err));
         
       }else{
         message.channel.send('正しくありません');
       }
       
     });
     

}





function bye(message){
    if (!message.member.voice.channel) {
      message.reply("ボイスチャンネルへ入ってください");
      return;
  }else{
    message.member.voice.channel.leave();
  }
}