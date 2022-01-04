import { SearchByUrlPlaylist } from '../interfaces/searchByUrl';
import { Song } from '../interfaces/song';
import * as ytSearch from 'yt-search';
import * as ytpl from 'ytpl';
import { getData } from 'spotify-url-info';
import { typesOfArgs } from '..';
import { GetData } from '../interfaces/getData';
import { validatorArgument } from '../validators/validators';
import { searchTypeSpotify } from './spotify';
import {
  searchByTypeName,
  searchByTypePlaylistYT,
  messageTypePodcastYT,
  messageTypeMixedYT,
  messageTypeInvalid,
  messageTypeError,
} from './youtube';

export const searchByUrlAndNameSong = async (
  url: string
): Promise<ytSearch.VideoSearchResult> => {
  const videoResult = await ytSearch(url);
  return videoResult.videos.length > 1 ? videoResult.videos[0] : null;
};

export const searchByUrlPlaylist = async (
  url
): Promise<SearchByUrlPlaylist> => {
  const result = await ytpl(url);
  const videos = result.items;
  const songs = buildSearchSongs(videos);
  return { songs: songs, title: result.title };
};

function buildSearchSongs(videos: ytpl.Item[]) {
  const songs: Song[] = [];
  for (const video of videos) {
    const song = {
      title: video.title,
      url: video.url,
    };
    songs.push(song);
  }
  return songs;
}

export async function searchVideoSongs(
  args: string[],
  message
): Promise<any[]> {
  const search = args.join(' ');
  const video = [];
  const type = validatorArgument(search);
  if (type == typesOfArgs.name) {
    await searchByTypeName(search, video);
  } else if (type == typesOfArgs.urlPlaylistYT) {
    await searchByTypePlaylistYT(search, message, video);
  } else if (type == typesOfArgs.urlPodcastSP) {
    messageTypePodcastYT(message);
  } else if (type == typesOfArgs.urlMixedYT) {
    messageTypeMixedYT(message);
  } else if (type == typesOfArgs.urlSpotify) {
    const response: GetData = await getData(search);
    await searchTypeSpotify(response, video, message, search);
  } else if (type == typesOfArgs.invalid) {
    messageTypeInvalid(message);
  } else {
    messageTypeError(message);
  }
  return video;
}
