import { queue } from '../index';

import * as ytdl from 'ytdl-core';
import * as Discord from 'discord.js';

export function play(guild, song) {
  const serverQueue = queue.get(guild.id);
  if (serverQueue.songs.length == 0) {
    setTimeout(() => {
      if (serverQueue.songs.length == 0) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
      }
    }, 15000);
  }
  try {
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url, { filter: 'audioonly' }))
      .on('finish', () => {
        serverQueue.songs.shift();
        play(guild, serverQueue.songs[0]);
      })
      .on('error', (error) => console.log(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    return messageIsPlaying(song, serverQueue);
  } catch (err) {
    if (String(err).includes(`TypeError: Cannot read property 'url'`)) {
      mesaggeEmptyQueueToSkip(serverQueue);
    } else {
      console.log(err);
      return messageErrorAndStop(serverQueue);
    }
  }
}
function messageErrorAndStop(serverQueue: any) {
  const error = new Discord.MessageEmbed()
    .setColor(`#ffbb3b`)
    .setTitle(`🛡️ Se detuvo bot Guayando 2 🛡️`);
  return serverQueue.textChannel.send(error);
}

function mesaggeEmptyQueueToSkip(serverQueue: any) {
  const errorSong = new Discord.MessageEmbed()
    .setColor(`#ff3b3b`)
    .setTitle(`🎵 No hay canciones para saltar 🎵`);
  serverQueue.textChannel.send(errorSong);
}

function messageIsPlaying(song: any, serverQueue: any) {
  const playEmbed = new Discord.MessageEmbed()
    .setColor(`#00e600`)
    .setTitle(`🎵 Se esta Reproduciendo 🎵`)
    .setDescription(`${song.title}`)
    .setURL(`${song.url}`);
  return serverQueue.textChannel.send(playEmbed);
}
