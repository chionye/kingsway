/** @format */

import { useState } from "react";
import { User as UserIcon } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@kingsway.com",
    role: "Admin",
    date: "2024-01-15",
    phone: "+234 801 234 5678",
    address: "123 Medical Center Drive, Lagos",
    department: "Cardiology",
    status: "Active",
    lastLogin: "2024-09-04 14:30",
    employeeId: "EMP001",
    joinDate: "2024-01-15",
    avatar: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUser(formData);
    setEditMode(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData(user);
    setEditMode(false);
    toast.info("Profile update cancelled.");
  };

  return (
    <div className='space-y-6 p-6 bg-gray-50 min-h-screen'>
      <Toaster position='top-right' richColors />
      {/* Header */}
      <div className='flex items-center space-x-3'>
        <div className='p-2 bg-blue-500 rounded-lg'>
          <UserIcon className='h-6 w-6 text-white' />
        </div>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>My Profile</h1>
          <p className='text-gray-600'>
            View and edit your personal information
          </p>
        </div>
      </div>

      {/* Profile Card */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='flex items-center space-x-6'>
          <div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center'>
            <UserIcon className='h-12 w-12 text-gray-500' />
          </div>
          <div className='space-y-1'>
            <h2 className='text-xl font-semibold text-gray-900'>{user.name}</h2>
            <p className='text-gray-600'>{user.role}</p>
            <p className='text-sm text-gray-500'>
              Employee ID: {user.employeeId}
            </p>
          </div>
        </div>
      </div>

      {/* Profile Details Form */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <h2 className='text-lg font-semibold text-gray-900 mb-4'>
          Personal Information
        </h2>
        <form onSubmit={handleSave}>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Name */}
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'>
                Full Name
              </label>
              <Input
                type='text'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
            {/* Email */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'>
                Email
              </label>
              <Input
                type='email'
                id='email'
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
            {/* Phone */}
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700'>
                Phone Number
              </label>
              <Input
                type='tel'
                id='phone'
                name='phone'
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
            {/* Address */}
            <div>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'>
                Address
              </label>
              <Input
                type='text'
                id='address'
                name='address'
                value={formData.address}
                onChange={handleInputChange}
                disabled={!editMode}
              />
            </div>
            {/* Department */}
            <div>
              <label
                htmlFor='department'
                className='block text-sm font-medium text-gray-700'>
                Department
              </label>
              <Input
                type='text'
                id='department'
                name='department'
                value={formData.department}
                disabled
              />
            </div>
            {/* Join Date */}
            <div>
              <label
                htmlFor='joinDate'
                className='block text-sm font-medium text-gray-700'>
                Join Date
              </label>
              <Input
                type='text'
                id='joinDate'
                name='joinDate'
                value={formData.joinDate}
                disabled
              />
            </div>
          </div>

          <div className='mt-6 flex justify-end space-x-2'>
            {editMode ? (
              <>
                <Button type='button' variant='outline' onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type='submit' className='bg-blue-600 text-white'>
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                type='button'
                className='bg-blue-600 text-white'
                onClick={() => setEditMode(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
