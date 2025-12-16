import {
  FormDatePicker,
  FormInput,
  FormSelect,
  PageWrapper,
} from "@/components";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";

const Inbox = () => {
  const formStore = useForm();

  const onSubmit = (data: any) => console.log("data", data);

  return (
    <PageWrapper>
      <FormProvider {...formStore}>
        <form onSubmit={formStore.handleSubmit(onSubmit)}>
          <div>
            {Array.from({ length: 1 }, (_, i) => i).map((value) => (
              <div className="grid grid-cols-4 gap-4" key={value}>
                <FormSelect
                  name={"form" + (value + 1)}
                  label={"Select " + (value + 1)}
                />
                <FormInput
                  name={"input" + (value + 1)}
                  label={"Input Text" + value}
                />
                <FormInput
                  name={"passwod" + (value + 1)}
                  label={"Input password" + value}
                  type="password"
                />
                <FormDatePicker
                  name={"date" + (value + 1)}
                  label={"Date" + value}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button type="submit">Save</Button>
            <Button variant={"outline"}>Cancel</Button>
          </div>
        </form>
      </FormProvider>
    </PageWrapper>
  );
};

export default Inbox;
