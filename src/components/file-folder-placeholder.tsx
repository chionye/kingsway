/** @format */

const FileFolderPlaceholder = ({
  report,
}: {
  report: { title: string; count: number; icon: React.ReactNode }[];
}) => {
  return (
    <div className='flex items-center gap-2'>
      {report.map((item) => (
        <div className='flex items-center gap-1'>
          {item.icon}
          <p className='font-maven text-[#7D7E8E] text-xs font-semibold'>
            {item.count} {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FileFolderPlaceholder;
