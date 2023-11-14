import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import { GiSettingsKnobs } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";

const App = () => {
  const [show, setShow] = useState(false);

  const initialViewState = {
    groupBy: "status",
    sortOrder: "priority",
  };

  const [data, setData] = useState(() => {
    const storedData = localStorage.getItem("ticketData");
    return storedData ? JSON.parse(storedData) : null;
  });

  const [viewState, setViewState] = useState(() => {
    const storedViewState = localStorage.getItem("viewState");
    return storedViewState ? JSON.parse(storedViewState) : initialViewState;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const result = await response.json();
        console.log(result);
        setData(result);

        localStorage.setItem("ticketData", JSON.stringify(result));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("viewState", JSON.stringify(viewState));
  }, [viewState]);

  const handleGroupByChange = (e) => {
    setViewState((prevState) => ({ ...prevState, groupBy: e.target.value }));
  };

  const handleSortOrderChange = (e) => {
    setViewState((prevState) => ({ ...prevState, sortOrder: e.target.value }));
  };

  const groupData = () => {
    const groupedTickets = {};

    data.tickets.forEach((ticket) => {
      let groupKey;

      if (viewState.groupBy === "priority") {
        const priorityMap = {
          4: "Urgent",
          3: "High",
          2: "Medium",
          1: "Low",
          0: "No Priority",
        };
        groupKey = priorityMap[ticket[viewState.groupBy]];
      } else if (viewState.groupBy === "userId") {
        const user = data.users.find((user) => user.id === ticket.userId);
        groupKey = user ? user.name : "Unassigned";
      } else {
        groupKey = ticket[viewState.groupBy];
      }

      if (!groupedTickets[groupKey]) {
        groupedTickets[groupKey] = [];
      }
      groupedTickets[groupKey].push(ticket);
    });

    return groupedTickets;
  };

  const sortedTickets = () => {
    const groupedTickets = groupData();

    for (const group in groupedTickets) {
      console.log(groupedTickets[group]);
      groupedTickets[group] = groupedTickets[group].sort((a, b) => {
        if (viewState.sortOrder === "priority") {
          return b.priority - a.priority;
        } else if (viewState.sortOrder === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    return groupedTickets;
  };

  return (
    <div>
      {data && (
        <>
          <div className="app_display">
            <button onClick={() => setShow(!show)}>
              <GiSettingsKnobs className="settings" />
              <p>Display </p>
              <RiArrowDropDownLine className="dropdown" />
            </button>
            {show ? (
              <div className="app_display_options">
                <div className="grouping_label">
                  <small>Grouping</small>
                  <select
                    value={viewState.groupBy}
                    onChange={handleGroupByChange}
                  >
                    <option value="status">Status</option>
                    <option value="userId">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>

                <div className="grouping_label">
                  <small>Ordering</small>
                  <select
                    value={viewState.sortOrder}
                    onChange={handleSortOrderChange}
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            ) : null}
          </div>
          <div className="ticket-group-container">
            <Board
              groupedAndSortedTickets={sortedTickets()}
              display={viewState.groupBy}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
