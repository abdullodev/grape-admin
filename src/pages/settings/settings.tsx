import { DataTable, PageWrapper } from "@/components";
import { useMemo } from "react";

// Generate sample data
const generateSampleData = (count: number) => {
  const statuses = ["Active", "Pending", "Inactive", "Completed"];
  const departments = ["Engineering", "Sales", "Marketing", "HR", "Finance"];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    department: departments[Math.floor(Math.random() * departments.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    joinDate: new Date(
      2020 + Math.floor(Math.random() * 5),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28)
    ).toLocaleDateString(),
    salary: Math.floor(Math.random() * 100000) + 50000,
  }));
};

const columns = [
  { key: "id" as const, label: "ID", width: "80px" },
  { key: "name" as const, label: "Name", width: "150px" },
  { key: "email" as const, label: "Email", width: "220px" },
  {
    key: "department" as const,
    label: "Department",
    render: (value: string) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === "Engineering"
            ? "bg-blue-100 text-blue-700"
            : value === "Sales"
            ? "bg-green-100 text-green-700"
            : value === "Marketing"
            ? "bg-purple-100 text-purple-700"
            : value === "HR"
            ? "bg-orange-100 text-orange-700"
            : "bg-gray-100 text-gray-700"
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: "status" as const,
    label: "Status",
    render: (value: string) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          value === "Active"
            ? "bg-emerald-100 text-emerald-700"
            : value === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : value === "Inactive"
            ? "bg-red-100 text-red-700"
            : "bg-blue-100 text-blue-700"
        }`}
      >
        {value}
      </span>
    ),
  },
  { key: "joinDate" as const, label: "Join Date", width: "120px" },
  {
    key: "salary" as const,
    label: "Salary",
    render: (value: number) => `$${value.toLocaleString()}`,
  },
];

const Settings = () => {
  const sampleData = useMemo(() => generateSampleData(1000), []);

  return (
    <PageWrapper>
      <DataTable
        data={sampleData}
        columns={columns}
        pageSize={50}
        searchable={true}
        height="600px"
      />
    </PageWrapper>
  );
};

export default Settings;
