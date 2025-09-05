/** @format */

/** @format */
import type { Appointment, MonthlyAppointmentSummary, Rating, Transaction, User } from "@/types";
import { format, subDays } from "date-fns";
import moment from "moment";

export const getDateFormat = (
  dateString: string = "",
  divided: string | null = null
): string => {
  return !divided
    ? dateString
      ? moment(dateString).format("Do MMMM YYYY • hh:mm a")
      : moment().format("Do MMMM YYYY • hh:mm a")
    : dateString && divided === "date"
    ? moment(dateString).format("Do MMMM YYYY ")
    : dateString && divided === "time"
    ? moment(dateString).format("hh:mm a")
    : moment().format("Do MMMM YYYY • hh:mm a");
};

export const getNestedValue = (obj: any, keyPath: string) => {
  return keyPath.split(".").reduce((value, key) => value && value[key], obj);
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const formatAmount = (amount: number) => {
  if (amount == null || isNaN(amount)) {
    return "0.00";
  }

  return amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const encodeIfURL = (str: string): string => {
  try {
    const url = new URL(str);
    console.log(url);
    return encodeURI(str);
  } catch (error) {
    return str;
  }
};

export const toTitleCase = (str: string): string => {
  return str ? str.replace(/(^[a-z])|(\s+[a-z])/g, (txt) => txt.toUpperCase()) : str;
};

export const getAgeFromDOB = (dob: string): number => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
};

export const getTotalAddedThisMonthAndYear = (
  users: User[]
): {
  thisMonth: number;
  thisYear: number;
} => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based, January is 0
  const currentYear = currentDate.getFullYear();

  let thisMonthCount = 0;
  let thisYearCount = 0;

  users.forEach((user) => {
    const createdAt = new Date(user.created_at);
    const createdMonth = createdAt.getMonth();
    const createdYear = createdAt.getFullYear();

    // Check if the record was added this month (regardless of the year)
    if (createdMonth === currentMonth) {
      thisMonthCount++;
    }

    // Check if the record was added this year (regardless of the month)
    if (createdYear === currentYear) {
      thisYearCount++;
    }
  });

  return {
    thisMonth: thisMonthCount,
    thisYear: thisYearCount,
  };
};

export const formateDate = (_relative: any, absolute: any) => {
  return format(subDays(new Date(), absolute), "iii d LLL");
};

// Function to count users by month for the current year and return array of objects
export const countUsersByMonth = (users: any[]) => {
  const currentYear = new Date().getFullYear();

  // Initialize an array of objects with abbreviated month names and initial counts
  const userCountByMonth = [
    { month: "Jan", newUsers: 0 },
    { month: "Feb", newUsers: 0 },
    { month: "Mar", newUsers: 0 },
    { month: "Apr", newUsers: 0 },
    { month: "May", newUsers: 0 },
    { month: "Jun", newUsers: 0 },
    { month: "Jul", newUsers: 0 },
    { month: "Aug", newUsers: 0 },
    { month: "Sep", newUsers: 0 },
    { month: "Oct", newUsers: 0 },
    { month: "Nov", newUsers: 0 },
    { month: "Dec", newUsers: 0 },
  ];

  // Loop through each user
  users.forEach((user) => {
    const createdDate = new Date(user.created_at);
    const year = createdDate.getFullYear();

    // Only count if the user was created this year
    if (year === currentYear) {
      const monthIndex = createdDate.getMonth(); // Get the index of the month (0-11)
      userCountByMonth[monthIndex].newUsers += 1; // Increment the newUsers count for the correct month
    }
  });

  return userCountByMonth;
};

// Function to count and organize top patients and doctors by appointments
export const getTopPatientsAndDoctors = (appointments: any[]) => {
  const patientCount: Record<string, number> = {};
  const doctorCount: Record<string, number> = {};

  // Loop through the appointments and count appointments for both patients and doctors
  appointments.forEach((appointment) => {
    const patientName =
      appointment.patient.fullname || appointment.patient.username;
    const doctorName =
      appointment.doctor.fullname || appointment.doctor.username;

    // Increment patient count
    if (patientName in patientCount) {
      patientCount[patientName] += 1;
    } else {
      patientCount[patientName] = 1;
    }

    // Increment doctor count
    if (doctorName in doctorCount) {
      doctorCount[doctorName] += 1;
    } else {
      doctorCount[doctorName] = 1;
    }
  });

  // Convert counts to arrays and sort them in descending order
  const sortedPatients = Object.entries(patientCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Get top 10 patients

  const sortedDoctors = Object.entries(doctorCount)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10); // Get top 10 doctors

  return { topPatients: sortedPatients, topDoctors: sortedDoctors };
};

// Helper function to parse and get the month/year from a date string
export const getMonthYear = (dateString: string) => {
  const date = new Date(dateString);
  return {
    month: date.getMonth(), // 0 for January, 11 for December
    year: date.getFullYear(),
  };
};

// Function to calculate total amount for a specific month
export const getTotalForMonth = (
  transactions: Transaction[],
  month: number,
  year: number
): number => {
  return transactions
    .filter(
      (t) =>
        getMonthYear(t.created_at).month === month &&
        getMonthYear(t.created_at).year === year
    )
    .reduce((total, t) => total + parseFloat(t.amount), 0);
};

// Function to calculate total amount for a specific year
export const getTotalForYear = (
  transactions: Transaction[],
  year: number
): number => {
  return transactions
    .filter((t) => getMonthYear(t.created_at).year === year)
    .reduce((total, t) => total + parseFloat(t.amount), 0);
};

// Function to calculate the total amount for all time
export const getTotalForAllTime = (transactions: Transaction[]): number => {
  return transactions.reduce((total, t) => total + parseFloat(t.amount), 0);
};

// Function to get totals for all months in the current year
export const getMonthlyTotalsForYear = (transactions: Transaction[], year: number): { month: string, total: number }[] => {
  const monthsAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyTotals = Array.from({ length: 12 }, (_, i) => {
    const total = getTotalForMonth(transactions, i, year);
    return {
      month: monthsAbbr[i],
      total: total,
    };
  });

  return monthlyTotals;
};

export const calculatePatientAverageRating = (ratings: Rating[], user: string): number => {
  // Filter only the raters whose role is "patient"
  const patientRaters = ratings.filter(
    (rating) => rating.rater_details.role === user
  );

  // Sum up the ratings of all patient raters
  const totalRating = patientRaters.reduce((sum, rating) => {
    return sum + parseFloat(rating.rater_details.rating);
  }, 0);

  // Calculate the average
  const averageRating =
    patientRaters.length > 0 ? totalRating / patientRaters.length : 0;

  return averageRating;
};

export const getMonthlyAppointmentSummary = (
  appointments: Appointment[]
): MonthlyAppointmentSummary[] => {
  // Map to store appointment counts per month
  const monthlySummary: { [key: string]: number } = {};

  // Array to store month abbreviations
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Loop through each appointment
  appointments.forEach((appointment) => {
    const appointmentDate = new Date(appointment.appointment_date);
    const monthIndex = appointmentDate.getUTCMonth(); // 0 = Jan, 11 = Dec
    const month = monthNames[monthIndex]; // Get the month abbreviation

    // Increment count for the month
    if (monthlySummary[month]) {
      monthlySummary[month]++;
    } else {
      monthlySummary[month] = 1;
    }
  });

  // Convert the monthlySummary object into an array of objects
  const result: MonthlyAppointmentSummary[] = Object.keys(monthlySummary).map(
    (month) => ({
      month,
      total: monthlySummary[month],
    })
  );

  return result;
};

/** @format */

export const getRoleColor = (role: string) => {
  const colors = {
    Doctor: "bg-blue-100 text-blue-800",
    "Lab Technician": "bg-purple-100 text-purple-800",
    Pharmacist: "bg-green-100 text-green-800",
    Receptionist: "bg-orange-100 text-orange-800",
    Radiographer: "bg-indigo-100 text-indigo-800",
    Admin: "bg-red-100 text-red-800",
    "Super Admin": "bg-gray-100 text-gray-800",
  };
  return colors[role as keyof typeof colors] || "bg-gray-100 text-gray-800";
};

export const getStatusColor = (status: string) => {
  return status === "Active"
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
};
