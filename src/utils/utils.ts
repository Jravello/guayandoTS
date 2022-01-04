export function filterTypeVideo(item) {
  return item.filter((video) => video.type == 'video');
}
export function sortByViews(search) {
  return search.sort((videoA, videoB) => videoA.views - videoB.views);
}
