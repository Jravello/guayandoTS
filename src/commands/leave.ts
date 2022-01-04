import { queue } from '../index';
import * as Discord from 'discord.js';
import { messageErrorVoiceChannel } from '../utils/message/messages';
import { messageInAnotherVoiceChannel } from './execute';

export function leave(message, serverQueue) {
  if (!serverQueue) {
    return messageErrorVoiceChannel(message);
  }
  if (serverQueue) {
    if (message.member.voice.channel.id != serverQueue.voiceChannel.id) {
      return messageInAnotherVoiceChannel(message);
    }
  }
  serverQueue.voiceChannel.leave();
  queue.delete(message.guild.id);
  const leaveEmbed = new Discord.MessageEmbed()
    .setColor(`#000022`)
    .setTitle(`👋 Nos vemos! 👋`);
  return serverQueue.textChannel.send(leaveEmbed);
}
