"use client";

import loginImage from "@/_assets/images/authHero.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { loginFormSchema } from "@/lib/zod-schemas/LoginFormSchema";
import { LoginUserInputType } from "@/types/auth.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import FormInputField from "../../shared/form-elements/FormInputField";
import SpinnerMini from "../../shared/skeltons/SpinnerMini";
import { Form } from "../../ui/form";
import FooterLink from "../cart/FooterLink";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });
  const router = useRouter();

  const { control } = form;

  const { mutate: loginUserApi, isPending: isLoggingIn } = useMutation({
    mutationFn: async ({ ...inputs }: LoginUserInputType) => {
      const { error } = await signIn("credentials", {
        ...inputs,
        redirect: false,
      });

      if (error) {
        if (error === "CredentialsSignin") {
          throw new Error("Invalid login details.");
        } else {
          throw new Error("Something went wrong while login.");
        }
      }

      return true;
    },
    onSuccess: () => {
      // toast.success(data.message);
      toast.success("Login Successfully.");
      form.reset();
      router.push("/reseller");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    loginUserApi({ email: values.email, password: values.password });
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block h-[400px]">
            <Image
              src={loginImage}
              alt="Image"
              fill
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-6 md:p-8 flex flex-col  justify-center"
            >
              <CardTitle className="text-xl font-semibold">Sign In</CardTitle>
              <FormInputField
                control={control}
                label="Email"
                name="email"
                type="text"
                disabled={isLoggingIn}
              />
              <FormInputField
                control={control}
                label="Password"
                name="password"
                type="password"
                showTogglePassword={true}
                disabled={isLoggingIn}
              />

              <FooterLink href={"https://esimcard.com/password/reset/"}>
                Forgot password?
              </FooterLink>
              <Button type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? <SpinnerMini /> : "Login"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
