type ProgressBarProps = {
  percent: number;
};

const ProgressBar = ({ percent }: ProgressBarProps) => {
  const getBarColor = (percent: number) => {
    if (percent > 0 && percent <= 60) {
      return 'bg-accent-dark';
    }
    if (percent > 60 && percent <= 90) {
      return 'bg-primary';
    }
    return 'bg-system-danger';
  };

  const getPercent = (percent: number) => {
    if (percent >= 100) {
      return 100;
    }
    return percent;
  };

  return (
    <div className="h-2 w-full rounded-full bg-gray-20">
      <div
        className={`h-2 rounded-full ${getBarColor(percent)}`}
        style={{ width: `${getPercent(percent)}%` }}
      />
    </div>
  );
};

export { ProgressBar };
