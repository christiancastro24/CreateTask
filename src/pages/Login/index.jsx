import { Container } from "./styles"

import { useHistory } from "react-router-dom";
import { api } from "../../api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiOutlineMail } from "react-icons/ai"
import { RiLockPasswordLine } from "react-icons/ri"

export const Login = () => {

    const history = useHistory();

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
    try {
        await api.post("/register", userInfo);

    } catch (err) {
      alert("Erro");
    }
  };

    return (
        <Container>
        <form method="post" onSubmit={handleSubmit(registerUser)} autoComplete="new-password">
          <h2>LOGIN</h2>
          <label>E-mail</label>
          <div>
          <span style={{size: '22px', position: "relative", top: "42px", left: "10px"}}><AiOutlineMail size="26" /></span>
          <input type="email" name="email" {...register("email")} data-gtm-form-interact-field-id="0" autoComplete="off"/>
          </div>
  
          <label>Senha</label>
          <div>
          <span style={{size: '22px', position: "relative", top: "42px", left: "10px"}}><RiLockPasswordLine size="26" /></span>
          </div>
          <input type="password" name="password" {...register("password")} data-gtm-form-interact-field-id="0" autoComplete="off"/>
          <br />
          <br />
          <div>
            <button type="submit">Entrar</button>
          </div>
        </form>


        <div className="blue">
          <h1>LOGIN</h1>
        </div>
      </Container>
    )
}