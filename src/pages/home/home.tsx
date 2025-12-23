import { DataTable, FormInput, PageWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

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

const Home = () => {
  const sampleData = useMemo(() => generateSampleData(1000), []);

  const formStore = useForm({
    mode: "onSubmit", // Validatsiya faqat submitda ishlaydi
  });

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  const handleClear = () => {
    formStore.reset(); // Formani tozalash
    console.log("Form cleared");
  };

  return (
    <PageWrapper>
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p className="mt-4">Welcome to the home page!</p>
      <p className="mt-2">This is where you can find the latest updates.</p>

      <DataTable
        data={sampleData}
        columns={columns}
        pageSize={100}
        searchable={true}
        height="600px"
      />

      <FormProvider {...formStore}>
        <form onSubmit={formStore.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-4 mt-10">
            {Array.from({ length: 100 }, (_, i) => i).map((v) => (
              <FormInput
                name={`name${v}`}
                label={`User name ${v + 1}`}
                key={v}
                type="password"
              />
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-2">
            <Button type="submit">Save</Button>
            <Button variant={"outline"} onClick={handleClear}>
              Clear
            </Button>
          </div>
        </form>
      </FormProvider>
    </PageWrapper>
  );
};

export default Home;
