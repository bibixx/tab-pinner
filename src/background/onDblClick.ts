let timer: NodeJS.Timeout | null = null;

export const handleDoubleClick = (onClick: Function, onDblClick: Function): void => {
  if (timer !== null) {
    clearTimeout(timer);
    timer = null;
    onDblClick();
    return;
  }

  const onTimerFinished = () => {
    onClick();
    timer = null;
  };

  timer = setTimeout(onTimerFinished, 200);
};
