interface ProcessProps {
  data: any;
}

const Process = ({ data }: ProcessProps) => {
  return (
    <div className="flex w-full rounded-[20px] bg-white px-9 py-9">
      <div className="flex w-full justify-between">
        {data?.roadmapList?.map((el: any, idx: number) => (
          <div className="relative flex w-[14%] flex-col items-center">
            <div className="mb-[14px] flex h-7 w-7 items-center justify-center rounded-full bg-[#5257D6] text-base font-bold text-white">
              {el.step}
            </div>
            <div className="mb-8 text-center text-base font-semibold text-black">
              {el.title}
            </div>
            <div className='flex flex-col items-center gap-3'>
              {el?.templateList.map((el: any) => (
                <div className="flex w-full items-center justify-center rounded-full bg-gray7 px-1.5 py-1 text-center text-[14px] font-semibold text-gray3">
                  {el.title}
                </div>
              ))}
            </div>
            {idx < data?.roadmapList?.length - 1 && (
              <div className="absolute left-[77%] top-3 h-[5px] w-[100%] bg-blue3" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Process;