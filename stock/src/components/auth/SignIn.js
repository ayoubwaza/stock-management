import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";
import { Authenticate } from "./authorisations";
import axios from "axios";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://ownleads.net/">
        OwnLeads
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "orange",
  },
}));

export default function SignIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const classes = useStyles();
  const onSubmit = (e) => {
    e.preventDefault();
    var myData = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/apis/api/signin/user/", myData)
      .then((response) => {
        Authenticate(response.data, async () => {
          if (localStorage.getItem("Token")) {
            const datafromStorage = JSON.parse(localStorage.getItem("Token"));
            const userId = datafromStorage.Token.userIden;
            const rolebyIdapi = await axios.get(
              "http://localhost:8000/apis/api/get/user_id/" + userId
            );
            const exactRole = rolebyIdapi.data.role;
            if (exactRole === "admin") {
              return (window.location = "/");
            } else{
                return (window.location = `/dashboard/user_uu/${userId}`);
            }
          }
        });
      })
      .catch((err) => alert(err.response.data));
  };
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
  body {  background:linear-gradient(to right , #348ce0 , white) !important;}
`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 100 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              s'identifier
            </Typography>
            <form onSubmit={onSubmit} className={classes.form}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse Mail"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Mot De Passe"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                s'identifier
              </Button>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </motion.div>
    </div>
  );
}
