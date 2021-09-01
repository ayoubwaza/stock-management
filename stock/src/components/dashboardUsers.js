import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "../styles/Parent.module.scss";
import {
  AiFillSetting,
  AiFillSignal,
  AiOutlineClockCircle,
  AiOutlinePoweroff,
  AiOutlineUser,
} from "react-icons/ai";
import Logo from "../Images/logo.webp";
function DashboardUsers(props) {
  const [userData, setUserData] = useState([]);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const fetchUserData = async () => {
      const waitingUserData = await axios.get(
        "http://localhost:8000/apis/api/get/user_id/" +
          props.match.params.userId
      );
      setUserData([waitingUserData.data]);
    };
    fetchUserData();
  }, []);
  //refs
  const refAside = useRef();
  return (
    <div>
      <div ref={refAside} className={styles.dash_users_content}>
        {userData.map((data, i) => {
          return (
            <div key={i}>
              <h1>{data.email}</h1>
            </div>
          );
        })}
      </div>
      <div className={styles.dash_users_aside}>
        <div className={styles.dash_users_aside_wrapper}>
          <div className={styles.dash_users_aside_logo}>
            <img src={Logo} width="100%" height="100%" alt="" />
          </div>
          <div className={styles.dash_users_aside_data}>
            <span>
              <AiOutlineClockCircle />
            </span>
            <h4>{"j17:45/00"}</h4>
          </div>
          <div className={styles.dash_users_aside_data}>
            <span>
              <AiOutlineUser />
            </span>
            <h4>SIHAM</h4>
          </div>
          <div className={styles.dash_users_aside_data}>
            <span>
              <AiFillSignal />
            </span>
            <h4>Analytics</h4>
          </div>
          <div className={styles.dash_users_aside_data}>
            <span>
              <AiFillSetting />
            </span>
            <h4>Parameters</h4>
          </div>
          <div className={styles.dash_users_aside_data}>
            <span>
              <AiOutlinePoweroff />
            </span>
            <h4>Déconnecter</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardUsers;
