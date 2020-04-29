let timer: NodeJS.Timeout;
let timerActive = false;

export const handleDoubleClick = (onClick: Function, onDblClick: Function): void => {
  if (timerActive) {
    clearTimeout(timer);
    timerActive = false;
    onDblClick();
  } else {
    timer = setTimeout(() => {
      onClick();
      timerActive = false;
    }, 200);
    timerActive = true;
  }
};
