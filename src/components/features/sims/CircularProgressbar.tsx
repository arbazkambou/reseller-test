export function CircularProgressBar({ percentage }: { percentage: number }) {
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <div className="relative h-[300px] w-[250px] xs:h-[300px] xs:w-[300px]">
      <svg className="h-full w-full" viewBox="0 0 264 264">
        <circle
          cx="132"
          cy="132"
          r={radius}
          fill="none"
          stroke="#F5F5F5"
          strokeWidth="24"
        />
      </svg>

      <svg
        className="absolute left-0 top-0 h-full w-full rotate-90"
        viewBox="0 0 264 264"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#005a4e" />
            <stop offset="100%" stopColor="#008F82" />
          </linearGradient>
        </defs>
        <circle
          cx="132"
          cy="132"
          r={radius}
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="24"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
