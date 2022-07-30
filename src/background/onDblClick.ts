let timer: NodeJS.Timeout | null = null;

export const handleDoubleClick = (onClick: () => void, onDblClick: () => void): void => {
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
