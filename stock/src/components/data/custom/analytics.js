import React, { useState, useEffect } from "react";
import styles from "../../../styles/Parent.module.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Brush,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";
import HeyKey from "../../../Images/heiKey.svg";
import NoDATAIMG from "../../../Images/sleep.svg";
function Analytics(props) {
  const [userData, setUserData] = useState([]);
  const [oct, setOct] = useState([]);
  const [nov, setNov] = useState([]);
  const [dec, setDec] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      const dataOct =
        "http://localhost:8000/apis/alldata/by/dates/month/Siham/";
      const dataNov =
        "http://localhost:8000/apis/alldata/by/dates/month/Siham/nov/";
      const dataDec =
        "http://localhost:8000/apis/alldata/by/dates/month/Siham/dec/";
      const [dataOctData, dataNovData, dataDecData] = await axios.all([
        axios.get(dataOct),
        axios.get(dataNov),
        axios.get(dataDec),
      ]);
      console.log(dataOctData);
      setOct(dataOctData.data.length);
      setNov(dataNovData.data.length);
      setDec(dataDecData.data.length);
      const waitingUserData = await axios.get(
        "http://localhost:8000/apis/api/get/user_id/" +
          props.match.params.userId
      );
      setUserData([waitingUserData.data]);
    };
    fetchUserData();
  }, []);
  const data = [
    {
      name: "October",
      confirmed: oct,
      canceled: 0,
    },
    {
      name: "November",
      confirmed: nov,
      canceled: 10,
    },
    {
      name: "December",
      confirmed: 0,
      canceled: dec,
    },
  ];

  const dataAgadir = [
    {
      name: "October",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "November",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "December",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
  ];
  return (
    <div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
                  body {
                    background:url(${HeyKey});
                    background-size:cover;
                    background-position:center;
                    background-repeat: no-repeat;
                    width:100%;
                    height:100%;
                }
          `,
        }}
      />
      <div className={styles.analytics_parent}>
        <h1>
          ANALYTICS,{" "}
          {userData.map((user) => {
            return user.role.toUpperCase();
          })}{" "}
        </h1>
        <div className={styles.__center_An_child}>
          <div className={styles.analytics_child}>
            <div className={styles.first_Chart}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  width={400}
                  height={400}
                  data={data}
                  margin={{
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeWidth="0" strokeDasharray="0 0" />
                  <XAxis dataKey="name" stroke="orange" />
                  <YAxis stroke="orange" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="confirmed"
                    stroke="#00B5BE"
                    strokeWidth="4"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="canceled"
                    stroke="red"
                    strokeWidth="4"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className={styles.months_top_confirmed}>
              <div className={styles.months_top_firsTwo}>
                <div className={styles.month_}>
                  Month : 10
                  <h4>{oct}</h4>
                </div>
                <div className={styles.month_}>
                  Month : 11
                  <h4>{nov}</h4>
                </div>
              </div>
              <h2>Confirmed Leads</h2>
              <div className={styles.months_top_firsTwo}>
                <div className={styles.month_}>
                  Month : 12
                  <h4>{dec}</h4>
                </div>
                <div className={styles.month_}>
                  Month : ـــ
                  <h4>ـــ</h4>
                </div>
              </div>
            </div>
            <div className={styles.months_top_cancels}>
              <div className={styles.months_top_firsTwo}>
                <div className={styles.month_}>
                  Month : 10
                  <h4>87</h4>
                </div>
                <div className={styles.month_}>
                  Month : 11
                  <h4>120</h4>
                </div>
              </div>
              <h2>Canceled Leads</h2>
              <div className={styles.months_top_firsTwo}>
                <div className={styles.month_}>
                  Month : 12
                  <h4>100</h4>
                </div>
                <div className={styles.month_}>
                  Month : ـــ
                  <h4>ـــ</h4>
                </div>
              </div>
            </div>
            <div className={styles.months_top_deliveredRetourned}>
              <div className={styles.months_top_firsTwo}>
                <div className={styles.month_}>
                  Month : 10
                  <h4>87</h4>
                </div>
                <div className={styles.month_}>
                  Month : 11
                  <h4>120</h4>
                </div>
              </div>
              <h2>Delivered / Retourned</h2>
              <div className={styles.months_top_firsTwo}>
                <div className={styles.month_}>
                  Month : 12
                  <h4>100</h4>
                </div>
                <div className={styles.month_}>
                  Month : ـــ
                  <h4>ـــ</h4>
                </div>
              </div>
            </div>
            <div className={styles.ana_agadirConfirmed}>
              <h2>Confirmed Agadir</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={400}
                  height={400}
                  data={dataAgadir}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="0  0" stroke="0" />
                  <XAxis dataKey="name" stroke="orange" />
                  <YAxis stroke="orange" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
              <p>Delivered</p>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  width={500}
                  height={200}
                  data={dataAgadir}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="0  0" stroke="0" />
                  <XAxis stroke="orange" dataKey="name" />
                  <YAxis stroke="orange" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                  />
                  <Brush />
                </LineChart>
              </ResponsiveContainer>
              <p>Retourned</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                  width={500}
                  height={200}
                  data={dataAgadir}
                  syncId="anyId"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="0  0" stroke="0" />
                  <XAxis dataKey="name" stroke="orange" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fill="red"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
