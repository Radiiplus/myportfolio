export const githubIcon = `./src/assets/img/github.svg`;

export const linkIcon = `./src/assets/img/link.svg`;

export function createIconElement(iconSrc, altText = '') {
  const img = document.createElement('img');
  img.src = iconSrc;
  img.alt = altText;
  return img;
}