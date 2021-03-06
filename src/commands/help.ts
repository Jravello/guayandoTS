import * as Discord from 'discord.js';

export function help(message) {
  const helpList = `π --<play ***argumento,cancion o url*** => Reproduce una Cancion, Playlist, Album, Artista de Spotify o Youtube [No Reproduce Radios, Mixes o Podcasts] \n
                      π --<stop & --<leave => Para al bot, elimina la lista y retira del canal al bot\n
                      π --<skip => Salta a la proxima CanciΓ³n \n
                      π --<queue => Muestra la Lista de las Canciones `;
  const helpAbList = `\n\n π£ Abreviaciones π£ \n\n
                      π --<play => --<p \n
                      π --<stop | --<leave => --<st | --<l\n
                      π --<skip => --<s \n
                      π --<queue => --<q \n\n`;
  const queueHelpEmbed = new Discord.MessageEmbed()
    .setColor(`#0099ff`)
    .setTitle(`π‘οΈ Lista π‘οΈ \n\n`)
    .setDescription(helpList + helpAbList);
  return message.channel.send(queueHelpEmbed);
}
