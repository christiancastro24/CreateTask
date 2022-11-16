import { Container, IconSpan } from "./styles"

import { Link, Redirect, useHistory } from "react-router-dom";
import { api } from "../../api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineMail } from "react-icons/ai"
import { RiLockPasswordLine } from "react-icons/ri"
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../../context/auth";


export const Login = () => {

  const { authenticated, setAuthenticated } = useAuth();
    const history = useHistory();
    const [loading, setLoading] = useState(false);

  const formSchema = yup.object({
    email: yup.string().email().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const registerUser = async (userInfo) => {
    setLoading(true)
    try {
        const { data } = await api.post("/login", userInfo);
        const { token } = data
        const userId = jwt_decode(token).UserId
        localStorage.setItem("token", JSON.stringify(token))
        localStorage.setItem("userId", userId)
        setLoading(false)
        setAuthenticated(true)
        history.push('/dashboard')

    } catch (err) {
      toast.error("E-mail ou senha inválido!");
      setLoading(false)
    }
  };




  if(authenticated) {
      return <Redirect to="/dashboard" />;
  }

    return (
        <Container>
        <form method="post" onSubmit={handleSubmit(registerUser)} autoComplete="new-password">
          <h2>LOGIN</h2>
          <label>E-mail</label>
          <div>
          <IconSpan><AiOutlineMail size="26" /></IconSpan>
          <input type="email" name="email" {...register("email")} data-gtm-form-interact-field-id="0" autoComplete="off"/>
          </div>
  
          <label>Senha</label>
          <div>
          <IconSpan><RiLockPasswordLine size="26" /></IconSpan>
          </div>
          <input type="password" name="password" {...register("password")} data-gtm-form-interact-field-id="0" autoComplete="off"/>
          <div>
            <button type="submit">{loading ? "Validando..." : "Entrar"}</button>
          </div>

          <div>
            <p>Não possui uma conta? <Link to={"/"}>Registre-se!</Link></p>
          </div>
        </form>


        <div className="blue">
          <h1>LOGIN</h1>
        </div>
      </Container>
    )
}