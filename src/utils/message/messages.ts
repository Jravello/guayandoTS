import * as Discord from 'discord.js';

export function messageErrorVoiceChannel(message: any) {
  const errorVoiceChannelEmbed = new Discord.MessageEmbed()
    .setColor(`#ffbb3b`)
    .setTitle(`🎙️ Necesitas estar en un canal de voz 🎙️`);
  return message.channel.send(errorVoiceChannelEmbed);
}
export function messageQueueEmpty(message: any) {
    const emptyQueueEmbed = new Discord.MessageEmbed()
      .setColor(`#6600cd`)
      .setTitle(`🎶 No hay canciones en la cola 🎶`);
    return message.channel.send(emptyQueueEmbed);
  }