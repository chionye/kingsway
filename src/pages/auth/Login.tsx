/** @format */

import { useForm } from "react-hook-form";
import InputField from "@/components/form/input-field";
import { LoginSchema } from "@/utils/forms";
import { CustomButton } from "@/components/buttons/custom-button";
import type z from "zod";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png"; // Assuming your logo is in this path

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    console.log(data);
    // Navigate to the dashboard after successful login
    navigate("/dashboard/admin/home");
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-8'>
        {/* Logo and Header */}
        <div className='flex flex-col items-center space-y-4'>
          <img src={logo} alt='Kingsway Logo' className='w-[150px] h-auto' />
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-gray-900'>Welcome Back</h1>
            <p className='text-gray-600 mt-1'>Log in to your account</p>
          </div>
        </div>

        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <InputField
                  placeholder='Enter your email'
                  label='Email'
                  type='email'
                  {...field}
                />
              )}
            />
            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <InputField
                  placeholder='Enter your password'
                  label='Password'
                  type='password'
                  isHiddenInput
                  {...field}
                />
              )}
            />
            <div className='text-right'>
              <Link
                to={"/forgot-password"} // Assuming a route for forgot password
                className='text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors'>
                Forgot Password?
              </Link>
            </div>
            <CustomButton
              label='Login'
              className='w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors py-3 font-semibold text-sm rounded-lg'
              type={"submit"}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
