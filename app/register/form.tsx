"use client";
import * as Form from "@radix-ui/react-form";
import { Button, TextFieldInput } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { VscLoading } from "react-icons/vsc";

export const RegisterForm = () => {
  const [error, setError] = useState<string | null>(null);
  const { pending } = useFormStatus();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: any) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidPassword = () => {
    if (form?.password === form?.confirmPassword) return true;
  };

  const onSubmit = async () => {
    if (!isValidPassword) {
      setError("Passwords do not match");
      return;
    }
    const formData = new FormData();
    formData.append("name", form?.name);
    formData.append("email", form?.email);
    formData.append("password", form?.password);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        signIn(undefined, { callbackUrl: "http://localhost:3000/" });
      }
    } catch (error: any) {
      setError(error?.message);
      alert("Your password is too short");
      console.log(error);
    }
  };

  return (
    <Form.Root action={onSubmit} className="space-y-4 w-full sm:w-[400px]">
      <Form.Field name="name" className="flex flex-col">
        <Form.Label className="FormLabel">Name</Form.Label>
        <Form.Control asChild>
          <TextFieldInput
            className="Input"
            type="name"
            name="name"
            onChange={handleChange}
            placeholder="Name"
          />
        </Form.Control>
      </Form.Field>
      <Form.Field name="email" className="flex flex-col">
        <Form.Label className="FormLabel">Email</Form.Label>
        <Form.Control asChild>
          <TextFieldInput
            className="Input"
            type="email"
            name="email"
            required
            onChange={handleChange}
            placeholder="Email"
          />
        </Form.Control>
        <Form.Message match="valueMissing">
          Please enter your email
        </Form.Message>
        <Form.Message match="typeMismatch">
          Please provide a valid email
        </Form.Message>
      </Form.Field>

      <Form.Field name="password" className="flex flex-col">
        <Form.Label className="FormLabel">Password</Form.Label>
        <Form.Control asChild>
          <TextFieldInput
            className="Input"
            type="password"
            name="password"
            required
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Control>
        <Form.Message match="valueMissing">
          Please enter a password
        </Form.Message>
        {error && <div>{error}</div>}
      </Form.Field>
      <Form.Field name="password" className="flex flex-col">
        <Form.Label className="FormLabel">Password</Form.Label>
        <Form.Control asChild>
          <TextFieldInput
            className="Input"
            type="password"
            name="confirmPassword"
            required
            onChange={handleChange}
            placeholder="Password"
          />
        </Form.Control>
        <Form.Message match="valueMissing">Passwords do not match</Form.Message>
        {error && <div>{error}</div>}
      </Form.Field>
      <Form.Submit asChild>
        <Button disabled={pending}>
          {pending ? <VscLoading className="animate-spin" /> : "Sign up"}
        </Button>
      </Form.Submit>
    </Form.Root>
  );
};
