export function scrollMoveTo(
  wrapperElement: HTMLDivElement,
  currentIndex: number
) {
  const wrapperWidth = wrapperElement.offsetWidth;
  const wrapperMidPos = wrapperWidth / 2;
  const wrapperLeftOffset = wrapperElement.offsetLeft;

  const $elemCurrentMenu = wrapperElement.children[0].children[
    currentIndex
  ] as HTMLLIElement;
  const $elemMenuWrapperWidth = (wrapperElement.children[0] as HTMLUListElement)
    .offsetWidth;
  const currenttMidWidth = $elemCurrentMenu.offsetWidth / 2;
  const currentLeftOffset = $elemCurrentMenu.offsetLeft;
  const maxWidth = $elemMenuWrapperWidth - wrapperWidth;
  console.log(maxWidth);
  let startX =
    wrapperLeftOffset - currentLeftOffset + wrapperMidPos - currenttMidWidth;

  if (startX > 0) {
    startX = 0;
  } else if (startX < -maxWidth) {
    startX = -maxWidth;
  }

  return startX;
}
