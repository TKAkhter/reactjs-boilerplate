import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addDelay, cn, isTokenValid } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check, X, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postAuthRegister } from "@/generated";
import { toast } from "sonner";
import { login } from "@/redux/slices/authSlice";
import { save } from "@/redux/slices/userSlice";
import { registerSchema, RegisterSchema } from "@/schemas/auth.schema";

export const Register: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (submittedData: RegisterSchema) => {
    setLoading(true);

    const loadingToast = toast.loading("Logging in...");
    try {
      const { data, error } = await postAuthRegister({ body: submittedData });

      if (error) {
        const errorMessage = (error as { message?: string }).message || "An unknown error occurred";
        throw new Error(errorMessage);
      }

      dispatch(login(data!.data!.token));
      dispatch(save(data!.data!.user));

      toast.success("User Created Successfully", { id: loadingToast });
      await addDelay(500);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`User Creation Failed: ${error.message}`, { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isTokenValid(token)) {
      navigate("/dashboard");
    }
  }, [token]);

  const passwordRules = [
    { regex: /.{8,}/, label: "At least 8 characters" },
    { regex: /[a-z]/, label: "One lowercase letter" },
    { regex: /[A-Z]/, label: "One uppercase letter" },
    { regex: /\d/, label: "One number" },
    { regex: /[@$!%*?&]/, label: "One special character" },
  ];

  const checkPasswordRule = (rule: { regex: RegExp }) => rule.regex.test(password);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label className="block text-sm font-medium text-gray-700">Name</Label>
          <Input
            id="name"
            {...register("name")}
            type="text"
            placeholder="Enter your name"
            className="my-1 w-full"
            {...register("name")}
          />
          {errors.name && (
            <Alert variant="destructive" className="my-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {typeof errors.name.message === "string" && errors.name.message}
              </AlertTitle>
            </Alert>
          )}

          <Label className="block text-sm font-medium text-gray-700 mt-3">Email</Label>
          <Input
            id="email"
            {...register("email")}
            type="text"
            placeholder="Enter your email"
            className="my-1 w-full"
            {...register("email")}
          />
          {errors.email && (
            <Alert variant="destructive" className="my-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {typeof errors.email.message === "string" && errors.email.message}
              </AlertTitle>
            </Alert>
          )}

          <Label className="block text-sm font-medium text-gray-700 mt-3">Password</Label>
          <Input
            id="password"
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="mt-1 w-full"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="my-4 text-sm">
            {passwordRules.map((rule, index) => (
              <p
                key={index}
                className={cn(
                  "flex my-1",
                  checkPasswordRule(rule) ? "text-green-600" : "text-red-600",
                )}
              >
                {checkPasswordRule(rule) ? <Check /> : <X />} {rule.label}
              </p>
            ))}
          </div>

          <Label className="block text-sm font-medium text-gray-700">Confirm Password</Label>
          <Input
            id="confirmPassword"
            {...register("confirmPassword")}
            type="text"
            placeholder="Enter your confirmPassword"
            className="mt-1 w-full"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <Alert variant="destructive" className="my-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {typeof errors.confirmPassword.message === "string" &&
                  errors.confirmPassword.message}
              </AlertTitle>
            </Alert>
          )}

          <Button className="w-full mt-4 bg-black text-white" disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
          </Button>
          <p className="text-center text-sm text-gray-600 mt-3">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
