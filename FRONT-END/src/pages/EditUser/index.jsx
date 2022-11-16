import { useEffect, useRef, useState } from "react";
import { api } from "../../api";
import userImage from "../../assets/user.png";
import { Container } from "./styles";
import { Button } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

export const EditUser = () => {
  const [user, setUser] = useState({});
  const [open, setOpen] = useState(false);

  const idUser = localStorage.getItem("userId");

  const [preview, setPreview] = useState("");

  const formSchema = yup.object({
    name: yup.string().required("Campo obrigatório"),
    email: yup.string().required("Campo obrigatório"),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(formSchema),
  });

  /** @USER */
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await api.get(`/users/${idUser}`);
        setUser(data);
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, [idUser]);

  /** @EDIT USER */
  const editUser = async (data) => {
    const formData = new FormData();

    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('image', preview)

    try {
      await api.patch(`/update/${idUser}`, formData);
      toast.success("Perfil editado com sucesso!");
      handleClose();
    } catch (error) {
      toast.error("Erro ao editar, por favor, tente novamente mais tarde!");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function onFileChange(e) {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  }

  return (
    <Container>
      <Button variant="outlined" onClick={handleClickOpen}>
        Editar
      </Button>

      {user.image || preview ? (
        <img
          src={
            preview
              ? URL.createObjectURL(preview)
              : `${process.env.REACT_APP_API}/images/users/${user.image}`
          }
          alt={user.name}
        />
      ) : (
        <img src={userImage} alt="user-default" />
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form
          method="POST"
          onSubmit={handleSubmit(editUser)}
          enctype="multipart/form-data"
        >
          <DialogTitle id="alert-dialog-title">Editar usuário</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <input
                type="text"
                name="name"
                placeholder={user.name}
                {...register("name")}
              />
              <br />
              <br />
              <input
                text="Imagem"
                type="text"
                name="email"
                placeholder={user.email}
                {...register("email")}
              />
              <br />
              <br />
              <input type="file" name="image" onChange={onFileChange} />
            </DialogContentText>
            <br />
            {user.image || preview ? (
              <img
              style={{width: "200px", borderRadius: "30%"}}
                src={
                  preview
                    ? URL.createObjectURL(preview)
                    : `${process.env.REACT_APP_API}/images/users/${user.image}`
                }
                alt={user.name}
              />
            ) : (
              <img src={userImage} alt="user-default" />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              autoFocus
            >
              Editar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};
