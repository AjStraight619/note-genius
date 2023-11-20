import { Button } from "@radix-ui/themes";
import { useFormStatus } from "react-dom";
import { VscLoading } from "react-icons/vsc";

type SubmitButtonProps = {
  children: React.ReactNode;
};

const SubmitButton = ({ children }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <div>
      <Button type="submit" disabled={pending}>
        {pending ? <VscLoading className="animate-spin" /> : children}
      </Button>
    </div>
  );
};

export default SubmitButton;
