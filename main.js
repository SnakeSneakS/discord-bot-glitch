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
  "https://cdn.glitch.com/75239d71-a04d-498b-93d1-08778b59562b%2F0.m4a?v=1597676969259",
  "https://cdn.glitch.com/75239d71-a04d-498b-93d1-08778b59562b%2F1.m4a?v=1597677097322",
  "https://cdn.glitch.com/75239d71-a04d-498b-93d1-08778b59562b%2F2.m4a?v=1597678560217",
  "https://cdn.glitch.com/75239d71-a04d-498b-93d1-08778b59562b%2F3.m4a?v=1597680127562", //3
  "https://cdn.glitch.com/75239d71-a04d-498b-93d1-08778b59562b%2F4.m4a?v=1597678561675",
  "https://cdn.glitch.com/75239d71-a04d-498b-93d1-08778b59562b%2F5.m4a?v=1597679376800",
  "https://cdn.glitch.com/75239d71-a04d-498b-93d1-08778b59562b%2F6.m4a?v=1597679373976",
  "https://cdn.glitch.com/75239d71-a04d-498b-93d1-08778b59562b%2F7.m4a?v=1597679373931" //7
];

const short_reaction_list=[
  ["ありがとう",""], //声、url
  ["いえーい",""],
  ["ナイス！",""],
  ["わらわら",""],
  ["おおう...",""],
  ["ごめん",""],
  ["ちくしょー",""],
  ["どんまい",""],
  ["こんにちは",""],
  ["こんばんは",""],
  ["いってらっしゃい",""],
  ["お疲れ様です",""],
  ["はい",""],
  ["いいえ",""],
  ["of course",""],
  ["i am iceman",""]
]



client.on("ready", message => {
  client.user.setPresence({ activity: { name: "I am an ice man." } });
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
      "!help: helpを見る。 \n!youtube url: youtubeのurlの動画の音声を流す \n!iceman: 様々なアイスマンの音声 \n!r: 短いリアクション音声を送信"
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



function ShortReaction(message){
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
         message.channel.send(`${response.content} が送信されました`);
       }else{
         message.channel.send('正しくありません');
       }
       
     });
     

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
      const streamOptions = { seek: 0, volume: 0.3 };
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
