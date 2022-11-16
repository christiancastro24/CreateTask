import { Sidebar } from "../../components/Sidebar";
import { Container } from "./styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../api";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const Dashboard = () => {

  const [tasks, setTask] = useState([]);
  const history = useHistory();
  const formSchema = yup.object({
    title: yup.string().required("Campo obrigatório"),
    description: yup.string().required("Campo obrigatório"),
  });

  const UserId = parseInt(localStorage.getItem("userId"))

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(formSchema),
  });


  useEffect(() => {
    const getTasks = async () => {

      try {
        const { data } = await api.post('/tasks', { UserId })
        setTask(data.tasks)

      } catch (error) {
        console.log(error)
      }
    }

    getTasks()
    }, [])

  const onSub = async data  => {
    const content = {...data, UserId}
    console.log(content)
    try {
      await api.post('/createTask', content)
      toast.success('Sucesso ao criar a tarefa!')

      setTimeout(() => {
        history.go(0)
      }, 1200)

    } catch(err) {
      toast.error('Erro ao criar a tarefa!')
    }
  }
  return (
    <Container>
      <Sidebar />

      <h2>Tarefas</h2>

    <form method="post" onSubmit={handleSubmit(onSub)}>
      <input type="text" name="title" placeholder="Título" {...register("title")}/>
      <br />
      <input type="textarea" name="description" placeholder="Descrição"  {...register("description")}/>
      <br />
      <br />
      <button style={{background: "green"}} type="submit">Cadastrar</button>
    </form>

    <h2>Tasks</h2>

    {tasks.map((x, y) => (
      <div key={y}>
        <h1>Título: {x.title}</h1>
        <h1>Descrição: {x.description}</h1>
        <br />
      </div>
    ))}
    </Container>
  );
};
