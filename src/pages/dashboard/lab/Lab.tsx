/** @format */

import { useState, useMemo } from "react";
import {
  FlaskConical,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Printer,
  X,
  User,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"; // Correct import of all necessary Select components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// Import your mock data and types
import { sampleLabTests } from "./constants/data";
import type { LabTest } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";

// Helper functions for styling
const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "Pending":
      return "bg-yellow-100 text-yellow-800";
    case "Cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Lab = () => {
  const [labTests, setLabTests] = useState<LabTest[]>(sampleLabTests);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isEditing, setIsEditing] = useState(false);

  const statuses = useMemo(
    () => ["All", "Pending", "Completed", "Cancelled"],
    []
  );

  const filteredLabTests = useMemo(() => {
    return labTests.filter((test) => {
      const matchesSearch =
        test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.patientId.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || test.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [labTests, searchQuery, statusFilter]);

  const [formTestData, setFormTestData] = useState<Omit<LabTest, "id">>(
    {} as Omit<LabTest, "id">
  );

  // --- Handlers for Modals and Actions ---
  const handleViewTest = (test: LabTest) => {
    setSelectedTest(test);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTest(null);
  };

  const handleOpenCreateModal = () => {
    setIsEditing(false);
    setFormTestData({
      patientId: "",
      patientName: "",
      testName: "",
      dateRequested: new Date().toISOString().split("T")[0],
      status: "Pending",
      result: null,
      dateCompleted: null,
      requestedBy: "Admin",
    });
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
    setSelectedTest(null);
  };

  const handlePrintTest = (test: LabTest) => {
    toast.info(`Printing report for ${test.testName} - ${test.patientName}...`);
  };

  const handleDeleteTest = (testId: string) => {
    if (window.confirm("Are you sure you want to delete this lab test?")) {
      setLabTests(labTests.filter((test) => test.id !== testId));
      toast.success("Lab test deleted successfully!");
    }
  };

  const handleEditTest = (test: LabTest) => {
    setIsEditing(true);
    setFormTestData(test);
    setSelectedTest(test); // For reference in the modal
    setIsCreateModalOpen(true);
  };

  // --- Form handling for Create/Edit (can be combined in one modal) ---
  const handleFormInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormTestData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formTestData.patientName ||
      !formTestData.testName ||
      !formTestData.patientId
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (isEditing) {
      setLabTests(
        labTests.map((test) =>
          test.id === selectedTest?.id ? { ...formTestData, id: test.id } : test
        )
      );
      toast.success("Lab test updated successfully!");
    } else {
      const newTest: LabTest = {
        id: `lt${Math.random().toString(36).substr(2, 5)}`,
        ...formTestData,
        status: "Pending",
        result: null,
        dateCompleted: null,
        requestedBy: "Admin",
      };
      setLabTests([newTest, ...labTests]);
      toast.success("Lab test created successfully!");
    }

    handleCloseCreateModal();
  };

  const columns: ColumnDef<LabTest>[] = [
    {
      accessorKey: "patientName",
      header: "Patient Name",
      cell: ({ row }) => (
        <div className='flex items-center space-x-2'>
          <div className='w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center'>
            <User className='h-4 w-4 text-gray-600' />
          </div>
          <span className='text-sm font-medium text-gray-900'>
            {row.original.patientName}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "testName",
      header: "Test Name",
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
      accessorKey: "dateRequested",
      header: "Requested On",
    },
    {
      accessorKey: "dateCompleted",
      header: "Completed On",
      cell: ({ row }) =>
        row.original.dateCompleted ? row.original.dateCompleted : "-",
    },
    {
      accessorKey: "requestedBy",
      header: "Requested By",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className='flex items-center space-x-2'>
          <Button
            onClick={() => handleViewTest(row.original)}
            className='bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors'
            size='sm'>
            <Eye className='h-3 w-3 mr-1' /> View
          </Button>
          <Button
            onClick={() => handleEditTest(row.original)}
            className='bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors'
            size='sm'>
            <Edit className='h-3 w-3 mr-1' /> Edit
          </Button>
          <Button
            onClick={() => handlePrintTest(row.original)}
            className='bg-gray-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors'
            size='sm'>
            <Printer className='h-3 w-3 mr-1' /> Print
          </Button>
          <Button
            onClick={() => handleDeleteTest(row.original.id)}
            className='bg-gray-100 text-red-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors'
            size='sm'>
            <Trash2 className='h-3 w-3 mr-1' /> Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className='space-y-6 p-6 bg-gray-50 min-h-screen'>
      <Toaster position='top-right' richColors />
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='p-2 bg-blue-500 rounded-lg'>
            <FlaskConical className='h-6 w-6 text-white' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Lab Test Management
            </h1>
            <p className='text-gray-600'>
              Manage all patient lab test requests and results
            </p>
          </div>
        </div>
        <Button
          onClick={handleOpenCreateModal}
          className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors space-x-2'>
          <Plus className='h-4 w-4' />
          <span>Add New Test</span>
        </Button>
      </div>

      {/* Filters and Search */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Search Tests
            </label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <Input
                type='text'
                placeholder='Search by name, test, or ID...'
                className='w-full pl-10'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Filter by Status
            </label>
            <Select
              value={statusFilter}
              onValueChange={(val) => setStatusFilter(val)}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='All' />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='flex items-end'>
            <div className='flex items-center h-10 px-3 bg-gray-100 rounded-lg w-full'>
              <span className='text-sm text-gray-600'>
                {filteredLabTests.length} test
                {filteredLabTests.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Tests Table */}
      <DataTable
        columns={columns}
        data={filteredLabTests}
        showPagination={true}
      />

      {/* View Lab Test Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={handleCloseViewModal}>
        <DialogContent className='sm:max-w-[500px] bg-white rounded-lg shadow-sm border border-gray-200'>
          <DialogHeader>
            <DialogTitle className='text-lg font-semibold text-gray-900'>
              Lab Test Details
            </DialogTitle>
            <DialogClose asChild>
              <Button variant='ghost' className='absolute top-4 right-4 p-2'>
                <X className='h-4 w-4 text-gray-500' />
              </Button>
            </DialogClose>
          </DialogHeader>
          <div className='p-4 space-y-4'>
            {selectedTest && (
              <>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Patient Name
                    </p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {selectedTest.patientName}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Patient ID
                    </p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {selectedTest.patientId}
                    </p>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Test Name
                    </p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {selectedTest.testName}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>Status</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                        selectedTest.status
                      )}`}>
                      {selectedTest.status}
                    </span>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Requested On
                    </p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {selectedTest.dateRequested}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      Completed On
                    </p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {selectedTest.dateCompleted || "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    Requested By
                  </p>
                  <p className='text-sm font-semibold text-gray-900'>
                    {selectedTest.requestedBy}
                  </p>
                </div>
                {selectedTest.status === "Completed" && (
                  <div>
                    <p className='text-sm font-medium text-gray-500'>Result</p>
                    <p className='text-sm font-semibold text-gray-900'>
                      {selectedTest.result}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
          <DialogFooter className='pt-4'>
            <Button variant='outline' onClick={handleCloseViewModal}>
              Close
            </Button>
            <Button
              onClick={() => handlePrintTest(selectedTest!)}
              className='bg-blue-600 text-white hover:bg-blue-700'>
              <Printer className='h-4 w-4 mr-2' /> Print Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create/Edit Lab Test Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={handleCloseCreateModal}>
        <DialogContent className='sm:max-w-[500px] bg-white rounded-lg shadow-sm border border-gray-200'>
          <DialogHeader>
            <DialogTitle className='text-lg font-semibold text-gray-900'>
              {isEditing ? "Edit Lab Test" : "Add New Lab Test"}
            </DialogTitle>
            <DialogClose asChild>
              <Button variant='ghost' className='absolute top-4 right-4 p-2'>
                <X className='h-4 w-4 text-gray-500' />
              </Button>
            </DialogClose>
          </DialogHeader>
          <form onSubmit={handleSaveTest}>
            <div className='p-4 space-y-4'>
              {/* Patient Name */}
              <div>
                <label
                  htmlFor='patientName'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Patient Name
                </label>
                <Input
                  type='text'
                  id='patientName'
                  name='patientName'
                  value={formTestData.patientName}
                  onChange={handleFormInputChange}
                  required
                />
              </div>
              {/* Patient ID */}
              <div>
                <label
                  htmlFor='patientId'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Patient ID
                </label>
                <Input
                  type='text'
                  id='patientId'
                  name='patientId'
                  value={formTestData.patientId}
                  onChange={handleFormInputChange}
                  required
                />
              </div>
              {/* Test Name */}
              <div>
                <label
                  htmlFor='testName'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Test Name
                </label>
                <Input
                  type='text'
                  id='testName'
                  name='testName'
                  value={formTestData.testName}
                  onChange={handleFormInputChange}
                  required
                />
              </div>
              {/* Date Requested */}
              <div>
                <label
                  htmlFor='dateRequested'
                  className='block text-sm font-medium text-gray-700 mb-1'>
                  Date Requested
                </label>
                <Input
                  type='date'
                  id='dateRequested'
                  name='dateRequested'
                  value={formTestData.dateRequested}
                  onChange={handleFormInputChange}
                  required
                />
              </div>

              {isEditing && (
                <>
                  <div>
                    <label
                      htmlFor='status'
                      className='block text-sm font-medium text-gray-700 mb-1'>
                      Status
                    </label>
                    <Select
                      value={formTestData.status}
                      onValueChange={(val) =>
                        setFormTestData((prev) => ({
                          ...prev,
                          status: val as LabTest["status"],
                        }))
                      }>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Status' />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses
                          .filter((s) => s !== "All")
                          .map((status) => (
                            <SelectItem key={status} value={status}>
                              {status}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formTestData.status === "Completed" && (
                    <>
                      <div>
                        <label
                          htmlFor='result'
                          className='block text-sm font-medium text-gray-700 mb-1'>
                          Result
                        </label>
                        <Input
                          type='text'
                          id='result'
                          name='result'
                          value={formTestData.result || ""}
                          onChange={handleFormInputChange}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='dateCompleted'
                          className='block text-sm font-medium text-gray-700 mb-1'>
                          Date Completed
                        </label>
                        <Input
                          type='date'
                          id='dateCompleted'
                          name='dateCompleted'
                          value={formTestData.dateCompleted || ""}
                          onChange={handleFormInputChange}
                        />
                      </div>
                    </>
                  )}
                  <div>
                    <label
                      htmlFor='requestedBy'
                      className='block text-sm font-medium text-gray-700 mb-1'>
                      Requested By
                    </label>
                    <Input
                      type='text'
                      id='requestedBy'
                      name='requestedBy'
                      value={formTestData.requestedBy}
                      onChange={handleFormInputChange}
                      disabled
                    />
                  </div>
                </>
              )}
            </div>
            <DialogFooter className='pt-6'>
              <Button variant='outline' onClick={handleCloseCreateModal}>
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-blue-600 text-white hover:bg-blue-700'>
                {isEditing ? "Save Changes" : "Add Test"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Lab;
