/** @format */

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CustomTabs({
  tabList,
  defaultValue,
  tabContent,
  rghtPositionedChild,
  onValueChange,
}: {
  defaultValue: string;
  tabList: { value: string; label: React.ReactNode }[];
  tabContent: { key: string; children: React.ReactNode }[];
  rghtPositionedChild?: React.ReactNode;
  onValueChange?: (value: string) => void;
}) {
  return (
    <div className='w-full'>
      <Tabs
        defaultValue={defaultValue}
        className='w-full'
        onValueChange={onValueChange}>
        <div className='flex lg:flex-row flex-col items-center justify-between w-full lg:gap-0 gap-3'>
          <TabsList className='p-2 h-fit flex flex-wrap'>
            {tabList.map((tab) => (
              <TabsTrigger
                value={tab.value}
                className='px-5 py-1 cursor-pointer'>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          {rghtPositionedChild && rghtPositionedChild}
        </div>
        {tabContent.map(
          (
            content: { key: string; children: React.ReactNode },
            index: number
          ) => (
            <TabsContent value={content.key} key={index} className='w-full'>
              {content.children}
            </TabsContent>
          )
        )}
      </Tabs>
    </div>
  );
}
