import * as Discord from 'discord.js';

const { prefix, token } = require('../config.json');
const { name, version } = require('../package.json');

import { execute } from './commands/execute';
import { help } from './commands/help';
import { leave } from './commands/leave';
import { queueList } from './commands/queue';
import { skip } from './commands/skip';
import { stop } from './commands/stop';
import { isUndefined } from 'underscore';
const client = new Discord.Client();

export const queue = new Map<string, any>();

export enum typesOfArgs {
  name = 'isName',
  urlPlaylistYT = 'isPlaylistYT',
  urlMixedYT = 'isMixedYT',
  urlTrakcSP = 'track',
  urlPlaylistSP = 'playlist',
  urlPodcastSP = 'episode',
  urlArtistSP = 'artist',
  urlAlbumSP = 'album',
  urlSpotify = 'spotify',
  invalid = 'isInvalid',
}

client.once('ready', () => {
  console.log(`¡Bot ${name.toUpperCase()} - ${version} esta andando!`);
});

client.once('reconnecting', () => {
  console.log(`Reconectando Bot ${name} - ${version}`);
});

client.once('disconnect', () => {
  console.log(`Bot ${name} - ${version} se ha desconectado`);
});

/* client.on('voiceStateUpdate', (oldVoiceState, newVoiceState) => {
  // Listeing to the voiceStateUpdate event
  if (newVoiceState.channel) {
    // The member connected to a channel.
    console.log(
      `${newVoiceState.member.user.tag} connected to ${newVoiceState.channel.name}.`
    );
  } else if (oldVoiceState.channel) {
    // The member disconnected from a channel.
    console.log(
      `${oldVoiceState.member.user.tag} disconnected from ${oldVoiceState.channel.name}.`
    );
  }
}); */

client.on('message', async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLocaleLowerCase();
  const serverQueue = queue.get(message.guild.id);
  if (command === 'leave' || command === 'l') {
    leave(message, serverQueue);
  } else if (command === 'play' || command === 'p') {
    if (args.length == 0) {
      const invalidArgCommandEmbed = new Discord.MessageEmbed()
        .setColor(`#6600cd`)
        .setTitle(`🛡️ El argumento en el comando ingresado es invalido 🛡️`)
        .setDescription(
          `Escribe *--<help* | *--<h* para ver los comandos y su descripcion`
        );
      return message.channel.send(invalidArgCommandEmbed);
    } else {
      execute(message, serverQueue, args);
    }
  } else if (command === 'skip' || command === 's') {
    skip(message, serverQueue);
  } else if (command === 'stop' || command === 'st') {
    stop(message, serverQueue);
  } else if (command === 'queue' || command === 'q') {
    queueList(message, serverQueue);
  } else if (command === 'help' || command === 'h') {
    help(message);
  } else {
    const invalidCommandEmbed = new Discord.MessageEmbed()
      .setColor(`#6600cd`)
      .setTitle(`🛡️ El comando ingresado es invalido 🛡️`)
      .setDescription(
        `Escribe *--<help* | *--<h* para ver los comandos y su descripcion`
      );
    message.channel.send(invalidCommandEmbed);
  }
});

client.login(token);
