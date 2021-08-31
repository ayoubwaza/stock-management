import {
  FormControl,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { FcHome, FcPlus } from "react-icons/fc";
import { Link } from "react-router-dom";
import NoData from "../../Images/data-dates.webp";
import styles from "../../styles/Parent.module.scss";
import Loading from "../loading";
import Pdf from "react-to-pdf";
import { AiFillFilePdf } from "react-icons/ai";
import { motion } from "framer-motion";
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function HistoriquDateProducts() {
  const [data, setData] = useState([]);
  const [maxdate, setMaxdate] = useState("");
  const [mindate, setMinDate] = useState("");
  const [product, setProduct] = useState("Slim Body");
  const [loading, setLoading] = useState(false);
  const [nodata, setNodata] = useState(false);
  const classes = useStyles();
  const ref = useRef();
  const handleChange = (e) => {
    setProduct(e.target.value);
  };
  useEffect(() => {
    if (data.length <= 0) {
      setNodata(true);
    } else {
      setNodata(false);
    }
  }, [data]);
  console.log(data);
  const whichProcut = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const urlSb = "http://localhost:8000/api/slimbody/date/";
      const urlCl = "http://localhost:8000/api/collaforce/date/";
      const urlGg = "http://localhost:8000/api/giantgel/date/";
      const urlGh = "http://localhost:8000/api/goldenhorn/date/";
      const handleProdChanges =
        product === "Slim Body"
          ? urlSb
          : product === "Colla Force"
          ? urlCl
          : product === "Giant Gel"
          ? urlGg
          : urlGh;
      const sendDataa = {
        startDate: mindate,
        endDate: maxdate,
      };
      const getprodData = await Axios.post(handleProdChanges, sendDataa);
      setData(getprodData.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  //tables **********************************************
  const TableHeaderCl = () => {
    return (
      <tr>
        <th>Date d'ajout</th>
        <th>Stock Initial</th>
        <th>Entrées</th>
        <th>Retour</th>
        <th>Sorties</th>
        <th>Solde</th>
      </tr>
    );
  };
  const TableBodyCl = () => {
    return data.map((data, i) => {
      return (
        <tr key={i}>
          <td className={styles.ensrDates}>
            {"Le" +
              " " +
              data.createdAt.substr(0, 10) +
              " " +
              "à" +
              " " +
              data.createdAt.substr(11, 8) +
              "h"}
          </td>
          <td>{data.stockInitialC}</td>
          <td>{data.addedC}</td>
          <td>{data.routurnC}</td>
          <td>{data.minusC}</td>
          <td>{data.stockValueC}</td>
        </tr>
      );
    });
  };
  //colla force Table
  const TableHeaderSb = () => {
    return (
      <tr>
        <th>Date d'ajout</th>
        <th>Stock Initial</th>
        <th>Entrées</th>
        <th>Retour</th>
        <th>Sorties</th>
        <th>Solde</th>
      </tr>
    );
  };
  const TableBodySb = () => {
    return data.map((data, i) => {
      return (
        <tr key={i}>
          <td className={styles.ensrDates}>
            {"Le" +
              " " +
              data.createdAt.substr(0, 10) +
              " " +
              "à" +
              " " +
              data.createdAt.substr(11, 8) +
              "h"}
          </td>
          <td>{data.stockInitialH}</td>
          <td>{data.addedH}</td>
          <td>{data.routurnH}</td>
          <td>{data.minusH}</td>
          <td>{data.stockValueH}</td>
        </tr>
      );
    });
  };
  //giant gel table
  const TableHeaderGG = () => {
    return (
      <tr>
        <th>Date d'ajout</th>
        <th>Stock Initial</th>
        <th>Entrées</th>
        <th>Retour</th>
        <th>Sorties</th>
        <th>Solde</th>
      </tr>
    );
  };
  const TableBodyGG = () => {
    return data.map((data, i) => {
      return (
        <tr key={i}>
          <td className={styles.ensrDates}>
            {"Le" +
              " " +
              data.createdAt.substr(0, 10) +
              " " +
              "à" +
              " " +
              data.createdAt.substr(11, 8) +
              "h"}
          </td>
          <td>{data.stockInitialG}</td>
          <td>{data.addedG}</td>
          <td>{data.routurnG}</td>
          <td>{data.minusG}</td>
          <td>{data.stockValueG}</td>
        </tr>
      );
    });
  };
  //golden horn
  const TableHeaderGh = () => {
    return (
      <tr>
        <th>Date d'ajout</th>
        <th>Stock Initial</th>
        <th>Entrées</th>
        <th>Retour</th>
        <th>Sorties</th>
        <th>Solde</th>
      </tr>
    );
  };
  const TableBodyGh = () => {
    return data.map((data, i) => {
      return (
        <tr key={i}>
          <td className={styles.ensrDates}>
            {"Le" +
              " " +
              data.createdAt.substr(0, 10) +
              " " +
              "à" +
              " " +
              data.createdAt.substr(11, 8) +
              "h"}
          </td>
          <td>{data.stockInitialGh}</td>
          <td>{data.addedGh}</td>
          <td>{data.routurnGh}</td>
          <td>{data.minusGh}</td>
          <td>{data.stockValueGh}</td>
        </tr>
      );
    });
  };
  return (
    <div className={styles.dats_filtered_allproducts}>
      <div className={styles.histo_fuct}>
        <div className={styles.headers_fact}>
          <div className={styles.handle_btns_histo_func}>
            <motion.div
              className={styles._home_fact_histo}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                  y: -300,
                },
                ani: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                  },
                },
              }}
            >
              <Link to="/">
                <button>
                  <span>
                    <FcHome />
                  </span>
                  Accueil
                </button>
              </Link>
            </motion.div>
            <motion.div
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                  y: -300,
                },
                ani: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.4,
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                  },
                },
              }}
            >
              <ReactHTMLTableToExcel
                className={styles.to_excel_fact_histo}
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Télécharger Comme Excel"
              />
            </motion.div>
            <motion.div
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                  y: -300,
                },
                ani: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.6,
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                  },
                },
              }}
            >
              <Link to="/all/products/">
                <button>
                  <span>
                    <FcPlus />
                  </span>
                  Modifier à Nouveau
                </button>
              </Link>
            </motion.div>
            <motion.div
              className={styles.to_pdf}
              initial="ini"
              animate="ani"
              variants={{
                ini: {
                  opacity: 0,
                  y: -300,
                },
                ani: {
                  opacity: 1,
                  y: 0.9,
                  transition: {
                    delay: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 30,
                  },
                },
              }}
            >
              <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => (
                  <button onClick={toPdf}>
                    <span>
                      <AiFillFilePdf />
                    </span>
                    Générer Pdf
                  </button>
                )}
              </Pdf>
            </motion.div>
          </div>
        </div>
        <div className={styles.child_histo_prod_dates}>
          <form onSubmit={whichProcut}>
            <div>
              <TextField
                required
                type="date"
                name="as"
                value={mindate}
                onChange={(e) => setMinDate(e.target.value)}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined"
                type="date"
                name="asa"
                value={maxdate}
                onChange={(e) => setMaxdate(e.target.value)}
              />
            </div>
            <div>
              <FormControl className={classes.formControl}>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  className={styles.select_inpu}
                  value={product}
                  onChange={handleChange}
                >
                  <MenuItem value="Slim Body">
                    <em>Slim Body</em>
                  </MenuItem>
                  <MenuItem value="Colla Force">Colla Force</MenuItem>
                  <MenuItem value="Giant Gel">Giant Gel</MenuItem>
                  <MenuItem value="Golden Horn">Golden Horn</MenuItem>
                </Select>
              </FormControl>
            </div>
            <button>Valider</button>
          </form>
        </div>
        <div className={styles.histo_fuct_child}>
          <div className={styles.histo_histosb_child}>
            {nodata ? (
              <motion.div
                initial="init"
                animate="ani"
                variants={{
                  init: {
                    opacity: 0,
                    scale: 0,
                  },
                  ani: {
                    opacity: 1,
                    scale: 1,
                    y: 200,
                    transition: {
                      type: "spring",
                      stiffness: 50,
                    },
                  },
                }}
              >
                <img src={NoData} width="100%" height="100%" alt="" />
              </motion.div>
            ) : (
              <table ref={ref} id="table-to-xls">
                {loading ? (
                  <div className={styles.center_loadingspinner}>
                    <Loading />
                  </div>
                ) : (
                  <>
                    <thead>
                      {product === "Slim Body"
                        ? TableHeaderSb()
                        : product === "Colla Force"
                        ? TableHeaderCl()
                        : product === "Giant Gel"
                        ? TableHeaderGG()
                        : TableHeaderGh()}
                    </thead>
                    <tbody>
                      {product === "Slim Body"
                        ? TableBodySb()
                        : product === "Colla Force"
                        ? TableBodyCl()
                        : product === "Giant Gel"
                        ? TableBodyGG()
                        : TableBodyGh()}
                    </tbody>
                  </>
                )}
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoriquDateProducts;
