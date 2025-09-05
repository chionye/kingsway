/** @format */

import { Form, FormField } from "@/components/ui/form";
import { searchSchema } from "@/utils/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import Icons from "@/constants/icons";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const SearchPromptField = ({
  onSubmit,
  placeholder = "Enter search term...",
}: {
  onSubmit: (data: z.infer<typeof searchSchema>) => void;
  placeholder?: string;
}) => {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      search: "",
    },
  });

  return (
    <div className='w-full'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='search'
            render={({ field }) => (
              <div className='flex flex-row items-center gap-x-2 bg-white w-full py-1.5 px-1.5 rounded-xl'>
                <div className='w-8'>
                  <Icons.search />
                </div>
                <div className='w-full'>
                  <Input
                    placeholder={placeholder}
                    className='border-0 rounded-[8px] px-4 outline-0 bg-transparent focus-visible:ring-0 w-full shadow-none'
                    type='text'
                    {...field}
                  />
                </div>
                <div className='w-10'>
                  <Button
                    variant='ghost'
                    className='w-8 h-8 rounded-lg bg-[#10A37F] flex items-center justify-center hover:bg-[#10A37F] hover:text-white cursor-pointer'>
                    <Icons.arrowTop />
                  </Button>
                </div>
              </div>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default SearchPromptField;
