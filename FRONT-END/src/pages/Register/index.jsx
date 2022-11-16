import { Redirect, useHistory } from "react-router-dom";
import { api } from "../../api";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Container, IconSpan } from "./styles";

import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";

export const Register = () => {


  const { authenticated } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const formSchema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().email().required("Campo obrigatório"),
    password: yup.string().required("Campo obrigatório"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  const registerUser = async (userInfo) => {
    setLoading(true);
    try {
      await api.post("/register", userInfo);
      setLoading(false);

      toast.success("Cadastro efetuado com sucesso!", {
        style: {
          backgroundColor: "#fff",
          color: "#000",
        },
      });
      setTimeout(() => {
        history.push("/login");
      }, 1200);
    } catch (err) {
      toast.error("E-mail já existente! Escolha outro.", {
        style: {
          backgroundColor: "#fff",
          color: "#000",
        },
      });
      setLoading(false);
    }
  };

  if(authenticated) {
    return <Redirect to="/dashboard" />;
}


  return (
    <Container>
      <div className="blue">
        <h1>REGISTRE-SE</h1>
      </div>

      <form
        method="post"
        onSubmit={handleSubmit(registerUser)}
        autoComplete="new-password"
      >
        <h2>Registre-se</h2>
        <label>Nome</label>
        <div>
          <IconSpan>
            <BsFillPersonFill size="26" />
          </IconSpan>
          <input
            type="text"
            name="name"
            {...register("name")}
            data-gtm-form-interact-field-id="0"
            autoComplete="off"
          />
        </div>

        <label>E-mail</label>
        <div>
          <IconSpan>
            <AiOutlineMail size="26" />
          </IconSpan>
          <input
            type="email"
            name="email"
            {...register("email")}
            data-gtm-form-interact-field-id="0"
            autoComplete="off"
          />
        </div>

        <label>Senha</label>
        <div>
          <IconSpan>
            <RiLockPasswordLine size="26" />
          </IconSpan>
        </div>
        <input
          type="password"
          name="password"
          {...register("password")}
          data-gtm-form-interact-field-id="0"
          autoComplete="off"
        />
        <br />
        <br />

        <div>
          <button type="submit">{loading ? "Cadastrando" : "Cadastrar"}</button>
        </div>
      </form>
    </Container>
  );
};
