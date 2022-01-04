import { typesOfArgs } from '../index';

export function validatorArgument(arg) {
  if (
    arg.includes('https://') ||
    arg.includes('www.') ||
    arg.includes('.com') ||
    arg.includes('.cl')
  ) {
    if (arg.includes('youtube.com')) {
      if (arg.includes('watch?')) {
        return typesOfArgs.name;
      } else if (arg.includes('playlist?')) {
        return typesOfArgs.urlPlaylistYT;
      } else if (arg.includes('start_radio')) {
        return typesOfArgs.urlMixedYT;
      } else {
        return typesOfArgs.invalid;
      }
    } else if (arg.includes('spotify.com')) {
      if (
        arg.includes('album') ||
        arg.includes('track') ||
        arg.includes('playlist') ||
        arg.includes('artist')
      ) {
        return typesOfArgs.urlSpotify;
      } else if (arg.includes('episode')) {
        return typesOfArgs.urlPodcastSP;
      } else {
        return typesOfArgs.invalid;
      }
    }else if (arg.includes('youtu.be')) {
        return typesOfArgs.name;
    } else {
      return typesOfArgs.invalid;
    }
  } else {
    return typesOfArgs.name;
  }
}
