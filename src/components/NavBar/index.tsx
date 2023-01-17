import {
  Avatar,
  Button as MuiButton,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useState } from "react";
import { useApp } from "../../context/AppContext";
import Button from "../Button";

export default function NavBar() {
  const { isLogged, user, signOut } = useApp();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
  };

  const routes = [
    {
      label: "Eventos",
      to: "/",
      canView: true,
    },
    {
      label: "Organize",
      to: "/organize",
      canView: isLogged,
    },
  ];

  return (
    <nav>
      <div className="flex items-center">
        <Link href={"/"}>
          <Image src="/assets/logo.png" alt="Eventful" width={50} height={50} />
        </Link>

        <ul className="menu">
          {routes.map((route, index) => {
            return (
              <Fragment key={index}>
                {route.canView && (
                  <Link href={route.to} passHref>
                    <li className="text-lg font-bold">{route.label}</li>
                  </Link>
                )}
              </Fragment>
            );
          })}
        </ul>
      </div>
      {!isLogged ? (
        <Link href="/usuario/login">
          <Button title="Entrar" size="sm" color="dark" />
        </Link>
      ) : (
        <>
          <Typography
            component="div"
            display="flex"
            alignItems="center"
            gap={2}
          >
            <MuiButton
              aria-controls="user-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Avatar>{user?.name[0]}</Avatar>
            </MuiButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </Menu>
          </Typography>
        </>
      )}
    </nav>
  );
}
