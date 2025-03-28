import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addDelay, isTokenValid } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postAuthLogin } from "@/generated";
import { toast } from "sonner";
import { login } from "@/redux/slices/authSlice";
import { save } from "@/redux/slices/userSlice";
import { authSchema, AuthSchema } from "@/schemas/auth.schema";
import logger from "@/common/pino";

export const Login: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchema>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (submittedData: AuthSchema) => {
    setLoading(true);

    const loadingToast = toast.loading("Logging in...");
    try {
      const { data, error } = await postAuthLogin({ body: submittedData });

      if (error) {
        const errorMessage = (error as { message?: string }).message || "An unknown error occurred";
        throw new Error(errorMessage);
      }

      dispatch(login(data!.data!.token));
      dispatch(save(data!.data!.user));

      toast.success("Login successful!", { id: loadingToast });
      await addDelay(500);
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(error.message);
      toast.error("Login failed. Email or Password is not correct.", { id: loadingToast });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isTokenValid(token)) {
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label className="block text-sm font-medium text-gray-700">Email</Label>
          <Input
            id="email"
            {...register("email")}
            type="text"
            placeholder="Enter your email"
            className="mt-1 w-full"
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
          />
          <Button className="w-full mt-4 bg-black text-white" disabled={loading}>
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "Login"}
          </Button>
          <p className="text-center text-sm text-gray-600 mt-3">
            Don&apos;t have an account?{" "}
            <span className="text-blue-500 cursor-pointer" onClick={() => navigate("/register")}>
              {}
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};
