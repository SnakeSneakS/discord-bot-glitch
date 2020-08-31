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
//const fs=require("fs");

const iceman_sound_url = [
  "https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2F0.m4a?v=1597761900695",
  "https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2F1.m4a?v=1597761901329",
  "https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2F2.m4a?v=1597761902562",
  "https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2F3.m4a?v=1597761905033", //3
  "https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2F4.m4a?v=1597761903812",
  "https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2F5.m4a?v=1597761906161",
  "https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2F6.m4a?v=1597761903495",
  "https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2F7.m4a?v=1597761903469" //7
];

const short_reaction_list=[
  ["ありがとう","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_arigatou.m4a?v=1597761480659"], //声、url
  ["いえーい","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_iei.m4a?v=1597761480192"],    //r_iei 
  ["ナイス！","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_nice.m4a?v=1597761482039"],
  ["わらわら","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_warawara.m4a?v=1597761481380"],
  ["おおう...","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_oou.m4a?v=1597761481808"],
  ["ごめん","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_gomen.m4a?v=1597761480281"],
  ["ぴえん","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_pien.m4a?v=1598788034754"],
  ["どんまい","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_donmai.m4a?v=1597761479808"],
  ["こんにちは","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_konnnitiwa.m4a?v=1597761481123"],
  ["こんばんは","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_konbanwa.m4a?v=1597761480809"],
  ["いってらっしゃい","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_itterassyai.m4a?v=1597761480726"],
  ["お疲れ様です","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_otukaresamadesu.m4a?v=1597761481547"],
  ["はい","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_hai.m4a?v=1597761480064"],
  ["いいえ","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_iie.m4a?v=1597761480508"],
  ["of course","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_ofcourse.m4a?v=1597761481630"],
  ["WeCanDoIt!","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fr_wecandoit.m4a?v=1597761482910"]
]

const signal_reaction_list=[
  ["とらつぴーだぉ（男","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fsignal_tratsupidao_0.m4a?v=1598871690054"],
  ["とらつぴーだぉ（女","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fsignal_tratsupidao_1.m4a?v=1598871806405"],
  ["王子ペロペロ","https://cdn.glitch.com/97530961-035b-4578-a35b-a13ae0f6de62%2Fsignal_oujiperopero.m4a?v=1598871980018"]
]


//readyの時
client.on("ready", message => {
  client.user.setPresence({ activity: { name: "I am an ice man 「!help」でヘルプ" } });
  console.log("ice man is here!");
});








//話しかけられた時
client.on("message", message => {
  //console.log(client.user);
  
  if(message.author == client.user) return; //自分には絶対に反応しない
  
  //呼びかけ
  if (message.mentions.has(client.user) ) {
    message.reply("Hello ,  I am an ice man! \n!help　と送信すればこのbotの機能が分かります");
    return;
  }
  

  //操作色々
  if (message.content.startsWith("!help") ) {
    message.channel.send(
      "!help: helpを見る。 \n!youtube url: youtubeのurlの動画の音声を流す \n!iceman: 様々なアイスマンの音声 \n!r: 短いリアクション音声を送信　\n!signal: signal関係のリアクション音声 \n!bye: ボイスチャンネルから追い出す \n\n 何か欲しい機能あればtwitterで言ってください。音声ファイル送ってくれればそれも流せます"
    );
    return;
  }

  /*\n!addch name: 「name」のテキストチャンネルを新しく作る //helpに記述
  if (message.content.startsWith("!addch ") && message.author != client.user) {
    var channelName = message.content.replace(/^!addch /, "");

    guild.channels.create(channelName, {type:"text"});
    message.reply("create channel" + channelName);
    return;
  }*/
  
  //voice record
  if (message.content.startsWith("!try") ) {
    voice_record(message);
    return;
  }
  
  //youtue
  if (message.content.startsWith("!youtube ") ) {
    youtube_sound(message);
    return;
  }

  //iceman
  if (message.content.startsWith("!iceman") ) {
    iceman_sound(message);
    return;
  }
  
  
  //reation voice
  if(message.content.startsWith("!r") ){
    ShortReaction(message);
    return;
  }
  
  
  //signal reation voice
  if(message.content.startsWith("!signal") ){
    SignalReaction(message);
    return;
  }
  
  
   //stop
  if (message.content.startsWith("!bye") ) {
    bye(message);
    return;
  }
  
  

  //名前に反応
  /*if (message.content.includes("ice") && message.author != client.user) {
    message.reply("a");
    message.react(":pensive: ");

    return;
  }*/
});





























if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);
//console.log(process.env.DISCORD_BOT_TOKEN);



















/*関数が出てくるぜkaksjfkakfakkfmkakkfmkmkamkfmmakmkfmkmksmkmfkamkmakkfmkamkfmkamfmamkmfkmkamkmfkmamkmfkamfkaakkakakkakakakka*/

function voice_record(message){
  if (!message.member.voice.channel) {
    message.reply("ボイスチャンネルへ入ってください");
    return;
  }

  message.member.voice.channel.join().then(connection => {
      
      message.reply("音声を録音します \n何か入力されれば録音終了します。");
    
      //録音終了判定
      const filter = msg => msg.author.id === message.author.id;
      message.channel.awaitMessages(()=>true,{ max: 5, time: 100000 }).then(collected=>{    
        const response = collected.first();
         if (!response) return message.channel.send('録音を停止します');
         if(client.user==response.author) return;
        
        message.channel.send("録音を終了します。");
        
         
      });  
    }).catch(err => console.log(err));

}


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