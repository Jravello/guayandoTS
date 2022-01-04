import {
  messageErrorVoiceChannel,
  messageQueueEmpty,
} from '../utils/message/messages';
import { messageInAnotherVoiceChannel } from './execute';

export function skip(message, serverQueue) {
  if (!message.member.voice.channel) {
    return messageErrorVoiceChannel(message);
  }
  if (!serverQueue) {
    return messageQueueEmpty(message);
  }
  if (serverQueue) {
    if (message.member.voice.channel.id != serverQueue.voiceChannel.id) {
      return messageInAnotherVoiceChannel(message);
    }
  }
  if (serverQueue.songs.length == 1) {
    return messageQueueEmpty(message);
  } else {
    serverQueue.connection.dispatcher.end();
  }
}
