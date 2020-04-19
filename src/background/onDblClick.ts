let timer: NodeJS.Timeout;
let timerActive = false;

export const handleDoubleClick = (onClick: Function, onDblClick: Function): void => {
  if (timerActive) {
    clearTimeout(timer);
    timerActive = false;
    onClick();
  } else {
    timer = setTimeout(() => {
      onDblClick();
      timerActive = false;
    }, 200);
    timerActive = true;
  }
};
