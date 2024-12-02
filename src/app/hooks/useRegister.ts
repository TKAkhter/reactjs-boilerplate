import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import axiosClient from "../common/axios";
import { login } from "../redux/slices/authSlice";
import { JwtUserPayload } from "../types/types";
import { jwtDecode } from "jwt-decode";
import { save } from "../redux/slices/userSlice";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(6).required(),
});

interface LoginForm {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const useRegister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (submitData: LoginForm) => {
    try {
      const { data } = await axiosClient.post("/auth/login", submitData);
      const decoded: JwtUserPayload = jwtDecode(data.token);
      dispatch(login(data.token));
      dispatch(
        save({
          email: decoded.email,
          id: decoded.id,
          username: decoded.username,
          name: decoded.name,
        }),
      );
      history.push("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message || "Login failed");
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
};
