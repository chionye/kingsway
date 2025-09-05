/** @format */

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  color,
  link,
  subtitle,
  onClick,
}: {
  title: string;
  value: string;
  icon: any;
  color: string;
  link?: string;
  subtitle?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 ${
        link ? "cursor-pointer" : ""
      }`}
      onClick={onClick}>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-sm font-medium text-gray-600 mb-1'>{title}</p>
          <p className='text-2xl font-bold text-gray-900'>{value}</p>
          {subtitle && <p className='text-sm text-gray-500 mt-1'>{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className='h-6 w-6 text-white' />
        </div>
      </div>
      {link && (
        <div className='text-xs text-blue-600 mt-2'>Click to navigate →</div>
      )}
    </div>
  );
};
