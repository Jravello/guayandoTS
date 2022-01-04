import { typesOfArgs } from '..';
import { GetData } from '../interfaces/getData';
import { searchByUrlAndNameSong } from './search';
import * as Discord from 'discord.js';

export async function searchTypeSpotify(
  response: GetData,
  video: any[],
  message: any,
  search: any
) {
  if (response.type == typesOfArgs.urlTrakcSP) {
    const search = await searchByUrlAndNameSong(response.name);
    video.push(search);
  } else if (
    response.type == typesOfArgs.urlPlaylistSP
  ) {
    const title = response.name;
    const items = response.tracks.items;
    const songs = [];
    const searchEmbed = new Discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setDescription(`🎶 Se buscaran las canciones de la Playlist...🎶`);
    message.channel.send(searchEmbed);
    const playlistTime = new Discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`🎶 La Playlist Sera Buscada En Los Registros 🎶`)
      .setDescription(`Playlist - ${title}`)
      .setURL(`${search}`);
    message.channel.send(playlistTime);
    await Promise.all(
      items.map(async (item, ind) => {
        const song = `${item.track.name} - ${item.track.artists[0].name}`;
        const search = await searchByUrlAndNameSong(song);
        songs.push(search);
      })
    );
    video.push(...songs);
    const playlistEmbed = new Discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`🎶 Playlist Encontrada 🎶`)
      .setDescription(`Playlist - ${title}`)
      .setURL(`${search}`);
    message.channel.send(playlistEmbed);
  } else if (
    response.type == typesOfArgs.urlAlbumSP
  ) {
    const title = response.name;
    const items = response.tracks.items;
    const songs = [];
    const searchEmbed = new Discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setDescription(`🎶 Se buscaran las canciones de la Playlist...🎶`);
    message.channel.send(searchEmbed);
    const playlistTime = new Discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`🎶 La Playlist Sera Buscada En Los Registros 🎶`)
      .setDescription(`Playlist - ${title}`)
      .setURL(`${search}`);
    message.channel.send(playlistTime);
    await Promise.all(
      items.map(async (item, ind) => {
        const song = `${item.name} - ${title}`;
        const search = await searchByUrlAndNameSong(song);
        songs.push(search);
      })
    );
    video.push(...songs);
    const playlistEmbed = new Discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`🎶 Playlist Encontrada 🎶`)
      .setDescription(`Playlist - ${title}`)
      .setURL(`${search}`);
    message.channel.send(playlistEmbed);
  } else if (response.type == typesOfArgs.urlArtistSP) {
    const title = response.name;
    const items = response.tracks;
    const songs = [];
    const searchEmbed = new Discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setDescription(`🎶 Se buscaran las canciones de la Playlist... 🎶`);
    message.channel.send(searchEmbed);
    const playlistTime = new Discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`🎶 La Playlist Sera Buscada En Los Registros 🎶`)
      .setDescription(`Playlist - ${title}`)
      .setURL(`${search}`);
    message.channel.send(playlistTime);
    await Promise.all(
      items.map(async (item) => {
        const song = `${item.name} - ${title}`;
        const search = await searchByUrlAndNameSong(song);
        songs.push(search);
      })
    );
    video.push(...songs);
    const playlistEmbed = new Discord.MessageEmbed()
      .setColor(`#0099ff`)
      .setTitle(`🎶 Playlist Encontrada 🎶`)
      .setDescription(`Playlist - ${title}`)
      .setURL(`${search}`);
    message.channel.send(playlistEmbed);
  } else {
    const errorTypeEmbed = new Discord.MessageEmbed()
      .setColor(`#ffbb3b`)
      .setTitle(`🔒 La **URL** es invalida 🔒`);
    message.channel.send(errorTypeEmbed);
  }
}
