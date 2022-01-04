import * as Discord from 'discord.js';
import { searchByUrlPlaylist, searchByUrlAndNameSong } from './search';
export function messageTypeError(message: any) {
  const error = new Discord.MessageEmbed()
    .setColor(`#ffbb3b`)
    .setTitle(`🔒 El argumeto ingresado es invalido 🔒`);
  message.channel.send(error);
}
export function messageTypeInvalid(message: any) {
  const errorTypeEmbed = new Discord.MessageEmbed()
    .setColor(`#ffbb3b`)
    .setTitle(`🔒 La **URL** es invalida 🔒`);
  message.channel.send(errorTypeEmbed);
}
export function messageTypeMixedYT(message: any) {
  const errorTypeEmbed = new Discord.MessageEmbed()
    .setColor(`#6600cd`)
    .setTitle(`🎶 Las radios y mixes no pueden ser añadidas 🎶`);
  message.channel.send(errorTypeEmbed);
}
export function messageTypePodcastYT(message: any) {
  const errorTypeEmbed = new Discord.MessageEmbed()
    .setColor(`#6600cd`)
    .setTitle(`🎶 Los podcast no pueden ser añadidos 🎶`);
  message.channel.send(errorTypeEmbed);
}

export async function searchByTypePlaylistYT(
  search: any,
  message: any,
  video: any[]
) {
  const playlist = await searchByUrlPlaylist(search);
  const playlistEmbed = new Discord.MessageEmbed()
    .setColor(`#0099ff`)
    .setTitle(`🎶 Playlist Encontrada 🎶`)
    .setDescription(`Playlist - ${playlist.title}`)
    .setURL(`${search}`);
  message.channel.send(playlistEmbed);
  video.push(...playlist.songs);
}

export async function searchByTypeName(search: any, video: any[]) {
  const song = await searchByUrlAndNameSong(search);
  video.push(song);
}
