import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import styles from "../../styles/Parent.module.scss";
import Loading from "../loading";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "orange",
  },
  lading_signib:{
    width: "100%", 
    height: "100vh", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }
}));

export default function SignUp() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const handleChange = (e) => {
    setRole(e.target.value);
  };
  const onSubmitUser = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        email: email,
        password: password,
        role: role,
      };
      const sendUser = await axios.post(
        "http://localhost:8000/apis/api/signup/user/",
        data
      );
      console.log(sendUser.data)
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
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
          {loading ? (
            <div className={classes.lading_signib}>
              <Loading />
            </div>
          ) : (
            <>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  S'inscrire
                </Typography>
                <form onSubmit={onSubmitUser} className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required={true}
                        fullWidth
                        id="firstName"
                        label="Prénom"
                        autoFocus
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Adresse Mail"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Mot De Passe"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Grid>
                    <FormControl className={classes.formControl}>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        className={styles.select_inpu}
                        value={role}
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="admin">
                          <em>Admin</em>
                        </MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="super_user">Super_User</MenuItem>
                        <MenuItem value="siham">Siham</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    S'inscrire
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/SignIn" variant="body2">
                        Vous avez déjà un compte? S'identifier
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={5}>
                <Copyright />
              </Box>
            </>
          )}
        </Container>
      </motion.div>
    </div>
  );
}
