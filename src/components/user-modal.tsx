/** @format */

import {
  Calendar,
  Edit,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
  X,
} from "lucide-react";
import { getRoleColor, getStatusColor } from "@/services/helpers";

export const UserModal = ({
  user,
  isOpen,
  onClose,
}: {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen || !user) return null;

  return (
    <div className='fixed inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-200'>
          <div className='flex items-center space-x-3'>
            <div className='w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center'>
              <User className='h-6 w-6 text-white' />
            </div>
            <div>
              <h2 className='text-xl font-bold text-gray-900'>{user.name}</h2>
              <span
                className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
                  user.role
                )}`}>
                {user.role}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200'>
            <X className='h-5 w-5 text-gray-500' />
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Status and Basic Info */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-gray-600'>
                  Status
                </label>
                <div className='mt-1'>
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      user.status
                    )}`}>
                    {user.status}
                  </span>
                </div>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-600'>
                  User ID
                </label>
                <p className='mt-1 text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded'>
                  {user.user_id}
                </p>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-600'>
                  Employee ID
                </label>
                <p className='mt-1 text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded'>
                  {user.employeeId}
                </p>
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-gray-600'>
                  Department
                </label>
                <p className='mt-1 text-sm text-gray-900'>{user.department}</p>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-600'>
                  Join Date
                </label>
                <div className='mt-1 flex items-center space-x-2'>
                  <Calendar className='h-4 w-4 text-gray-400' />
                  <span className='text-sm text-gray-900'>{user.joinDate}</span>
                </div>
              </div>

              <div>
                <label className='text-sm font-medium text-gray-600'>
                  Last Login
                </label>
                <p className='mt-1 text-sm text-gray-900'>{user.lastLogin}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className='border-t border-gray-200 pt-6'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Contact Information
            </h3>
            <div className='space-y-4'>
              <div className='flex items-center space-x-3'>
                <Mail className='h-4 w-4 text-gray-400' />
                <div>
                  <label className='text-sm font-medium text-gray-600'>
                    Email
                  </label>
                  <p className='text-sm text-gray-900'>{user.email}</p>
                </div>
              </div>

              <div className='flex items-center space-x-3'>
                <Phone className='h-4 w-4 text-gray-400' />
                <div>
                  <label className='text-sm font-medium text-gray-600'>
                    Phone
                  </label>
                  <p className='text-sm text-gray-900'>{user.phone}</p>
                </div>
              </div>

              <div className='flex items-start space-x-3'>
                <MapPin className='h-4 w-4 text-gray-400 mt-1' />
                <div>
                  <label className='text-sm font-medium text-gray-600'>
                    Address
                  </label>
                  <p className='text-sm text-gray-900'>{user.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className='border-t border-gray-200 pt-6'>
            <div className='flex space-x-3'>
              <button className='flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2'>
                <Edit className='h-4 w-4' />
                <span>Edit User</span>
              </button>
              <button className='px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors duration-200 flex items-center space-x-2'>
                <Trash2 className='h-4 w-4' />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
