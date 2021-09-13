import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";
import { Authenticate } from "./authorisations";
import axios from "axios";
import styles from "../../styles/Parent.module.scss";
function Copyright() {
  const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF",
      fontSize: "23px",
    },
  })(Typography);
  return (
    <WhiteTextTypography variant="body2" color="white" align="center">
      {"Copyright © "}
      <Link color="#fff" href="https://ownleads.net/">
        OwnLeads
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </WhiteTextTypography>
  );
}
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#00B5BE",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#00B5BE",
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
      .post("https://ownleads-apps.herokuapp.com/apis/api/signin/user/", myData)
      .then((response) => {
        Authenticate(response.data, async () => {
          if (localStorage.getItem("Token")) {
            const datafromStorage = JSON.parse(localStorage.getItem("Token"));
            const userId = datafromStorage.Token.userIden;
            const rolebyIdapi = await axios.get(
              "https://ownleads-apps.herokuapp.com/apis/api/get/user_id/" + userId
            );
            const exactRole = rolebyIdapi.data.role;
            if (exactRole === "admin") {
              return (window.location = "/admin/" + userId);
            } else {
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
  body   {background: rgba(7, 1, 48, 0.4) !important;}
`,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: -500 }}
        animate={{ opacity: 1, y: 100 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={styles.handle_styles_forSignIn}
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
