import noImg from "../Assets/no-photo.png";

export default function getImageCast(path) {
  if(null === path) {
    return `${noImg}`
  } else {
    return `https://image.tmdb.org/t/p/w300/${path}`
  }
}