import React, { useEffect, useState } from "react";
import "../styles/Table.css";
import axios from "axios";
import { useHistory } from "react-router";
import TextField from "@mui/material/TextField";

function Table() {
  //Setting all the patients data from the db in order to place them in the UI table.
  //Setting the questionsData from the backhand as a list with the new value id which contains the id of the field,
  //for example gender, procedure etc.
  const [clientsData, setClientsData] = useState([]);
  const [search, setSearch] = useState("");
  const headers = {
    "x-access-token": localStorage.getItem("token"),
  };

  const history = useHistory();

  //Setting the data everytime the table is rendering.
  useEffect(async () => {
    await getClients();
  }, []);

  const getClients = async () => {
    const response = await axios.post(
      "https://localhost:3005/clients/getClients/",
      { firstName: search },
      { headers: headers }
    );
    if (response.status === 200) {
      setClientsData(response.data);
    } else {
      console.log("Unable to get client/s");
    }
  };

  return (
    <>
      {/* The add button that will navigate us into the addOrEdit component. */}
      <div className="table-options">
        <div className="add-patient-btn-container">
          <button
            className="btn btn-add-patient"
            onClick={() => {
              history.push("/AddClient");
              window.location.reload();
            }}
          >
            Add Client
          </button>
        </div>

        <div className="search-table">
          <button
            className="btn btn-add-patient"
            onClick={() => {
              getClients();
            }}
          >
            Search
          </button>

          <TextField
            onChange={(e) => setSearch(e.target.value)}
            style={{ sx: 2 }}
            id="outlined-basic"
            variant="outlined"
            size="small"
          />
        </div>
      </div>

      <div style={{ marginTop: "15px" }}>
        <table className="styled-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>No.</th>

              <th style={{ textAlign: "center" }} key={"First_name"}>
                First name
              </th>
              <th style={{ textAlign: "center" }} key={"Last_name"}>
                Last name
              </th>
              <th style={{ textAlign: "center" }} key={"Product"}>
                Product
              </th>
            </tr>
          </thead>

          <tbody>
            {clientsData &&
              clientsData.map((record, index) => {
                return (
                  <tr key={index}>
                    <td>{record["id"]}</td>
                    <td>{<div dangerouslySetInnerHTML={{ __html: record["firstName"]}}></div>}</td>
                    <td>{record["lastName"]}</td>
                    <td>{record["product"]}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
