import { FormInput, PageWrapper } from "@/components";
import { Button } from "@/components/ui/button";
import { RemoveFormatting } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

const Home = () => {
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
      <FormProvider {...formStore}>
        <form onSubmit={formStore.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 gap-4 mt-10">
            {Array.from({ length: 120 }, (_, i) => i).map((v) => (
              <FormInput
                name={`name${v}`}
                label={`User name ${v + 1}`}
                key={v}
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
