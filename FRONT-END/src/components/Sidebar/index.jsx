/** @REACT */
import { Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useState } from "react";

/** @BILIOTECAS (ICONS/IMPORTS) */
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { FiLogOut } from "react-icons/fi";
import { AiOutlineUser } from "react-icons/ai";

/** @IMAGES INTERNAS */
import Menu from "../../assets/botao-de-menu.png";

/** @ESTILOS INTERNOS */
import { Container } from "./styles";
import toast from "react-hot-toast";

export const Sidebar = () => {
  const history = useHistory();
  const { authenticated } = useAuth();
  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const Logout = () => {
    localStorage.clear();
    toast("Você saiu da sua sessão, obrigado!", {
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setTimeout(() => {
      history.go(0);
    }, 1100);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {/* {["All mail", "Editar", "Sair"].map((text, index) => ( */}
          <ListItem disablePadding>
            <ListItemButton>
            <div>
              <ListItemIcon  style={{display: "flex", flexDirection: "column"}}>
                <div>
               <InboxIcon size="25"/>
               <br />  
               <br />  
                  <span onClick={() => history.push("/editProfile")}>
                    <AiOutlineUser size="25"/>{" "}
                  </span>
                </div>

                  <br />
         
                  <span onClick={Logout}>
                    <FiLogOut size="25"/>
                  </span>
                
              </ListItemIcon>

              </div>
              <div style={{display: "flex", flexDirection: "column"}}>

              <ListItemText onClick={Logout} role="button">
                Mail
              </ListItemText>
              <br />  

              <ListItemText onClick={() => history.push("/editProfile")}>
                Editar perfil
              </ListItemText>
              <br />  

              <ListItemText onClick={Logout} role="button">
                Sair
              </ListItemText>

              </div>
            </ListItemButton>
          </ListItem>
        {/* ))} */}
      </List>
    </Box>
  );

  if (!authenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Container>
      <div>
        {["left"].map((anchor) => (
          <div key={anchor}>
            <img
              src={Menu}
              alt="menu-burguer"
              onClick={toggleDrawer(anchor, true)}
              role="button"
            />
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </div>
        ))}
      </div>
    </Container>
  );
};
