import { leave } from './leave';

export function stop(message, serverQueue) {
  leave(message, serverQueue);
}
