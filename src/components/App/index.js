import React, { useState } from "react";
import styles from "./index.module.css";
import Form from "../Form";
import Item from "../Item";
import Toggle from "../Toggle";
import Requests from "../Requests";
import AjaxError from "../AjaxError";
import NoDataFound from "../NoDataFound";
import { MyContext } from "../../context";
import AjaxTime from "../AjaxTime";
import Filter from "../Filter";

const App = () => {
  const [requests, setRequests] = useState([]);
  const [darkTheme, setDarkTheme] = useState(false);
  const [value, setValue] = useState("");
  const [ajaxError, setAjaxError] = useState({
    error: "No error",
    status: false
  });
  const [data, setData] = useState();
  const [filteredData, setFilteredData] = useState([]);
  const [showFilteredData, setShowFilteredData] = useState(false);
  const [ajaxTime, setAjaxTime] = useState(0);

  const wikiResults = () => {
    if (data && data.length === 0) {
      return <NoDataFound />;
    } else if (data && data.length !== 0) {
      return (
        <ul className={styles.items}>
          {showFilteredData
            ? filteredData.map((element, index) => {
                return (
                  <Item
                    title={element.title}
                    snippet={element.snippet}
                    link={element.link}
                    key={index}
                  />
                );
              })
            : data.map((element, index) => {
                return (
                  <Item
                    title={element.title}
                    snippet={element.snippet}
                    link={element.link}
                    key={index}
                  />
                );
              })}
        </ul>
      );
    }
  };

  darkTheme
    ? (document.body.style.background = "#05263f")
    : (document.body.style.background = "white");
  return (
    <MyContext.Provider value={darkTheme}>
      <div className={styles.app}>
        <AjaxTime ajaxTime={ajaxTime} />
        <Toggle setDarkTheme={setDarkTheme} />
        <Filter
          data={data}
          setFilteredData={setFilteredData}
          setShowFilteredData={setShowFilteredData}
        />
        <div className={styles.logo}>wiki search</div>
        <Form
          setData={setData}
          value={value}
          setValue={setValue}
          requests={requests}
          setAjaxError={setAjaxError}
          setRequests={setRequests}
          setAjaxTime={setAjaxTime}
          setShowFilteredData={setShowFilteredData}
        />
        <Requests requests={requests} setValue={setValue} />
        {ajaxError.status ? <AjaxError ajaxError={ajaxError} /> : wikiResults()}
      </div>
    </MyContext.Provider>
  );
};

export default App;
