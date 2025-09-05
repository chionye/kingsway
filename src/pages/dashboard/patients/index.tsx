/** @format */

import { useState, useMemo } from "react";
import { Users, Search, Plus, Eye, User } from "lucide-react";
import { sampleUsers } from "./components/constants/data";
import { UserModal } from "../../../components/user-modal";
import { DataTable } from "@/components/table/data-table"; // Assuming this is the path to your DataTable
import type { ColumnDef } from "@tanstack/react-table";
import { getRoleColor, getStatusColor } from "@/services/helpers";

// Type definition for a user object
export interface User {
  id: number;
  sn: number;
  name: string;
  email: string;
  user_id: string;
  role: string;
  date: string;
  phone: string;
  address: string;
  department: string;
  status: string;
  lastLogin: string;
  employeeId: string;
  joinDate: string;
  avatar: string | null;
};

const Patients = () => {
  const [users] = useState(sampleUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Get unique roles for filter dropdown
  const roles = useMemo(
    () => ["All", ...new Set(users.map((user) => user.role))],
    [users]
  );
  const statuses = ["All", "Active", "Inactive"];

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.user_id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesRole = roleFilter === "All" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Define the columns for the DataTable
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "sn",
      header: "S/N",
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className='flex items-center'>
          <div className='w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center mr-3'>
            <User className='h-4 w-4 text-gray-600' />
          </div>
          <span className='text-sm font-medium text-gray-900'>
            {row.original.name}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "user_id",
      header: "User ID",
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => (
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(
            row.original.role
          )}`}>
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            row.original.status
          )}`}>
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "date",
      header: "Date Added",
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <button
          onClick={() => handleViewUser(row.original)}
          className='bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center space-x-1'>
          <Eye className='h-3 w-3' />
          <span>View</span>
        </button>
      ),
    },
  ];

  return (
    <div className='space-y-6 p-6 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='p-2 bg-blue-500 rounded-lg'>
            <Users className='h-6 w-6 text-white' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Patients Management
            </h1>
            <p className='text-gray-600'>Manage patients</p>
          </div>
        </div>
        <button className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2'>
          <Plus className='h-4 w-4' />
          <span>Add New User</span>
        </button>
      </div>

      <DataTable
        columns={columns}
        data={filteredUsers}
        showPagination={false} // Assuming you don't want pagination for this view
      >
        {/* Filters and Search are passed as children */}
        <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Search Users
              </label>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search by name, email, or ID...'
                  className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Filter by Role
              </label>
              <select
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Filter by Status
              </label>
              <select
                className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Results
              </label>
              <div className='flex items-center h-10 px-3 bg-gray-100 rounded-lg'>
                <span className='text-sm text-gray-600'>
                  {filteredUsers.length} user
                  {filteredUsers.length !== 1 ? "s" : ""} found
                </span>
              </div>
            </div>
          </div>
        </div>
      </DataTable>

      {/* User Details Modal */}
      <UserModal
        user={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Patients;
