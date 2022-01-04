import { queue } from '../index';
import { searchVideoSongs } from '../search/search';
import { play } from './play';

import * as Discord from 'discord.js';
import { messageErrorVoiceChannel } from '../utils/message/messages';

export async function execute(
  message,
  serverQueue,
  args: string[]
): Promise<void> {
  const voiceChannel = message.member.voice.channel;

  if (serverQueue) {
    if (voiceChannel.id != serverQueue.voiceChannel.id) {
      return messageInAnotherVoiceChannel(message);
    }
  }

  if (!voiceChannel) {
    return messageErrorVoiceChannel(message);
  }

  const permissions = voiceChannel.permissionsFor(message.client.user);
  if (!permissions.has(`CONNECT`) || !permissions.has(`SPEAK`)) {
    return messageRoleToSpeakeInVoiceChannel(message);
  }
  const video = await searchVideoSongs(args, message);

  if (video) {
    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };

      queue.set(message.guild.id, queueContruct);

      queueContruct.songs.push(...video);

      try {
        var connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(message.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(message.guild.id);
        return message.channel.send(err);
      }
    } else {
      if (serverQueue.songs.length != 0) {
        if (video.length == 1) {
          if (serverQueue.songs) serverQueue.songs.push(...video);
          messageQueued(video, message);
        }
      } else {
        serverQueue.songs.push(...video);

        try {
          play(message.guild, serverQueue.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      }
    }
  } else {
    messageEmptySearch(message);
  }
}

function messageRoleToSpeakeInVoiceChannel(message: any) {
  const errorSpeak = new Discord.MessageEmbed()
    .setColor(`#ffbb3b`)
    .setTitle(`🎙️ Se necesitan los permisos de habla en el canal de voz 🎙️`);
  return message.channel.send(errorSpeak);
}

export function messageInAnotherVoiceChannel(message: any) {
  const anotherVoiceChannel = new Discord.MessageEmbed()
    .setColor(`#ffbb3b`)
    .setTitle(`🎙️ Guayando 2 ya esta en otro canal de voz 🎙️`);
  return message.channel.send(anotherVoiceChannel);
}

function messageQueued(video: any[], message: any) {
  const queueEmbed = new Discord.MessageEmbed()
    .setColor(`#0099ff`)
    .setTitle(`🎶 Lista - Elemento añadido 🎶`)
    .setDescription(`${video[0].title} se ha añadido a la lista`);
  message.channel.send(queueEmbed);
}

function messageEmptySearch(message: any) {
  const emptySearchEmbed = new Discord.MessageEmbed()
    .setColor(`#6600cd`)
    .setTitle(`🎵 No se encontraron elementos relacionados a la busqueda 🎵`);
  message.channel.send(emptySearchEmbed);
}
