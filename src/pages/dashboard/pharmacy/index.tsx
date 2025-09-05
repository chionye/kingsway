/** @format */

import { useState, useMemo } from "react";
import {
  Package,
  PackageX,
  CircleDollarSign,
  CalendarClock,
  Plus,
  Search,
  FileText,
} from "lucide-react";

import { MetricCard } from "@/components/cards/metric-card";
import { DataTable } from "@/components/table/data-table";

import { sampleMedicines } from "./components/constants/data";
import type { Medicine } from "@/types";
import { medicineColumns } from "./components/table/pharmacy-table-column";

export const Pharmacy = () => {
  const [medicines] = useState<Medicine[]>(sampleMedicines);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("All"); // e.g., "All", "In Stock", "Low Stock", "Out of Stock"
  const [expiryFilter, setExpiryFilter] = useState("All"); // e.g., "All", "Expiring Soon", "Expired"

  // Memoize filtered medicines to avoid recalculating on every render
  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) => {
      const matchesSearch =
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.generic_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        medicine.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
        medicine.batch_number.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStock =
        stockFilter === "All" ||
        (stockFilter === "In Stock" &&
          medicine.in_stock > medicine.reorder_level) ||
        (stockFilter === "Low Stock" &&
          medicine.in_stock <= medicine.reorder_level &&
          medicine.in_stock > 0) ||
        (stockFilter === "Out of Stock" && medicine.in_stock === 0);

      const today = new Date();
      const expiryDate = new Date(medicine.expiry_date);
      const diffDays = Math.ceil(
        (expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      );

      const matchesExpiry =
        expiryFilter === "All" ||
        (expiryFilter === "Expiring Soon" && diffDays < 90 && diffDays >= 0) ||
        (expiryFilter === "Expired" && diffDays < 0);

      return matchesSearch && matchesStock && matchesExpiry;
    });
  }, [medicines, searchQuery, stockFilter, expiryFilter]);

  // --- Dynamic Metric Calculation (Example) ---
  const totalMedicines = medicines.length;
  const expiringSoonCount = medicines.filter((m) => {
    const today = new Date();
    const expiry = new Date(m.expiry_date);
    const diffDays = Math.ceil(
      (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
    return diffDays < 90 && diffDays >= 0;
  }).length;
  const lowStockCount = medicines.filter(
    (m) => m.in_stock <= m.reorder_level && m.in_stock > 0
  ).length;
  // const outOfStockCount = medicines.filter((m) => m.in_stock === 0).length;

  // Calculate total value - simple example, could be more complex
  const totalInventoryValue = medicines.reduce(
    (sum, med) => sum + med.price * med.in_stock,
    0
  );
  const averagePrice =
    totalMedicines > 0 ? totalInventoryValue / totalMedicines : 0;

  // Update pharmacyMetrics with dynamic data
  const dynamicPharmacyMetrics = [
    {
      title: "Total Medicines",
      value: totalMedicines.toString(),
      icon: Package,
      color: "bg-blue-500",
      subtitle: "unique items in stock",
      // onClick: () => console.log("Go to all medicines"),
    },
    {
      title: "Expiring Soon",
      value: expiringSoonCount.toString(),
      icon: CalendarClock,
      color: "bg-orange-500",
      subtitle: "within 3 months",
      onClick: () => {
        setExpiryFilter("Expiring Soon"); // Example: set filter when card is clicked
        setStockFilter("All"); // Reset other filters if needed
      },
    },
    {
      title: "Low Stock",
      value: lowStockCount.toString(),
      icon: PackageX,
      color: "bg-red-500",
      subtitle: "below reorder level",
      onClick: () => {
        setStockFilter("Low Stock"); // Example: set filter when card is clicked
        setExpiryFilter("All"); // Reset other filters if needed
      },
    },
    {
      title: "Average Price",
      value: `$${averagePrice.toFixed(2)}`,
      icon: CircleDollarSign,
      color: "bg-green-500",
      subtitle: "per medicine",
    },
  ];

  // Filter options for the dropdowns
  const stockFilters = ["All", "In Stock", "Low Stock", "Out of Stock"];
  const expiryFilters = ["All", "Expiring Soon", "Expired"];

  return (
    <div className='space-y-6 bg-gray-50 min-h-screen'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <div className='p-2 bg-purple-500 rounded-lg'>
            {" "}
            {/* Using purple for pharmacy */}
            <Package className='h-6 w-6 text-white' />
          </div>
          <div>
            <h1 className='text-2xl font-bold text-gray-900'>
              Pharmacy Inventory
            </h1>
            <p className='text-gray-600'>
              Manage medicines, stock, and suppliers
            </p>
          </div>
        </div>
        <button
          className='bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2'
          // onClick={() => { /* Open modal to add new medicine */ }}
        >
          <Plus className='h-4 w-4' />
          <span>Add New Medicine</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {dynamicPharmacyMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
            subtitle={metric.subtitle}
            onClick={metric.onClick} // Pass the onClick handler
          />
        ))}
      </div>

      {/* Filters and Search */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Search Medicines
            </label>
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
              <input
                type='text'
                placeholder='Search by name, generic, supplier, batch...'
                className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Filter by Stock
            </label>
            <select
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}>
              {stockFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Filter by Expiry
            </label>
            <select
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              value={expiryFilter}
              onChange={(e) => setExpiryFilter(e.target.value)}>
              {expiryFilters.map((filter) => (
                <option key={filter} value={filter}>
                  {filter}
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
                {filteredMedicines.length} medicine
                {filteredMedicines.length !== 1 ? "s" : ""} found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Medicines Table */}
      <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
        <DataTable
          columns={medicineColumns}
          data={filteredMedicines}
          showPagination={true} // Or false, depending on preference
        >
          {/* Optional: Add a button or other controls here if needed */}
          {/* For example, a button to export data */}
          <button className='flex items-center space-x-1 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50'>
            <FileText className='h-4 w-4' />
            <span>Export List</span>
          </button>
        </DataTable>

        {filteredMedicines.length === 0 && (
          <div className='text-center py-12'>
            <Package className='mx-auto h-12 w-12 text-gray-400' />
            <h3 className='mt-2 text-sm font-medium text-gray-900'>
              No medicines found
            </h3>
            <p className='mt-1 text-sm text-gray-500'>
              Try adjusting your search criteria or filters.
            </p>
          </div>
        )}
      </div>

      {/* You'll need a MedicineModal component similar to UserModal */}
      {/* <MedicineModal isOpen={isAddMedicineModalOpen} onClose={handleCloseAddMedicineModal} /> */}
    </div>
  );
};

export default Pharmacy;
