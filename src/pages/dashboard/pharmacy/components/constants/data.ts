/** @format */

// src/components/constants/pharmacy-data.ts

import {
  Package,
  PackageX,
  CircleDollarSign,
  CalendarClock,
} from "lucide-react";
import type { Medicine } from "@/types"; 

// Sample Data for Medicines
export const sampleMedicines: Medicine[] = [
  {
    id: 1,
    sn: 1,
    name: "Paracetamol",
    generic_name: "Acetaminophen",
    supplier: "DrugCorp",
    price: 5.5,
    in_stock: 1200,
    reorder_level: 200,
    expiry_date: "2026-05-15",
    batch_number: "PC-2023-A",
  },
  {
    id: 2,
    sn: 2,
    name: "Amoxicillin",
    generic_name: "Amoxicillin",
    supplier: "PharmaLink",
    price: 15.75,
    in_stock: 80,
    reorder_level: 100,
    expiry_date: "2025-01-20",
    batch_number: "AMX-2024-B",
  },
  {
    id: 3,
    sn: 3,
    name: "Vitamin C",
    generic_name: "Ascorbic Acid",
    supplier: "HealthCo",
    price: 8.0,
    in_stock: 1500,
    reorder_level: 250,
    expiry_date: "2027-11-30",
    batch_number: "VITC-2024-C",
  },
  {
    id: 4,
    sn: 4,
    name: "Metformin",
    generic_name: "Metformin HCl",
    supplier: "MediLife",
    price: 12.25,
    in_stock: 150,
    reorder_level: 150,
    expiry_date: "2025-07-01",
    batch_number: "MET-2024-D",
  },
  {
    id: 5,
    sn: 5,
    name: "Lagos",
    generic_name: "Unknown",
    supplier: "Generic Pharma",
    price: 3.0,
    in_stock: 0, // Example of stock-out
    reorder_level: 50,
    expiry_date: "2025-03-10",
    batch_number: "GEN-2024-E",
  },
];

// Metric Data
export const pharmacyMetrics = [
  {
    title: "Total Medicines",
    value: "5", // This should ideally be dynamic
    icon: Package,
    color: "bg-blue-500",
    subtitle: "unique items in stock",
  },
  {
    title: "Expiring Soon",
    value: "1", // This should ideally be dynamic (e.g., medicines expiring in next 30-90 days)
    icon: CalendarClock,
    color: "bg-orange-500",
    subtitle: "within 3 months",
  },
  {
    title: "Low Stock",
    value: "1", // This should ideally be dynamic (e.g., count of items below reorder_level)
    icon: PackageX,
    color: "bg-red-500",
    subtitle: "below reorder level",
  },
  {
    title: "Average Price",
    value: "$9.10", // This should ideally be dynamic
    icon: CircleDollarSign,
    color: "bg-green-500",
    subtitle: "per medicine",
  },
];

// Helper functions (similar to your user data helpers)
// You might want to integrate these into a central data utility file
export const getExpiryStatusColor = (expiryDate: string) => {
  const today = new Date();
  const expiry = new Date(expiryDate);
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "bg-red-100 text-red-800"; // Expired
  if (diffDays < 90) return "bg-orange-100 text-orange-800"; // Expiring soon (within 90 days)
  return "bg-green-100 text-green-800"; // In stock / Not expiring soon
};

export const getStockStatusColor = (inStock: number, reorderLevel: number) => {
  if (inStock === 0) return "bg-red-100 text-red-800"; // Out of Stock
  if (inStock <= reorderLevel) return "bg-orange-100 text-orange-800"; // Low Stock
  return "bg-green-100 text-green-800"; // In Stock
};
