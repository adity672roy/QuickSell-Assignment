import React from "react";
import Card from "./Card"
import { BsThreeDots, BsExclamationSquareFill  } from "react-icons/bs";
import { HiMiniPlus } from "react-icons/hi2";
import { RxAvatar } from "react-icons/rx";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import { GiNetworkBars } from "react-icons/gi";
import { CgTimelapse } from "react-icons/cg";
import { TbCircleDotted } from "react-icons/tb";

const Board = ({ groupedAndSortedTickets, display }) => {
   
  return (
    <div className="ticket-group">
      {Object.keys(groupedAndSortedTickets).map((group) => (
        <div key={group} className="board">
          <div className="board_top">
            {display === "userId" ? (
              <div className="card_avatar">
                <RxAvatar className="avatar" />
                <GoDotFill className="online" />
              </div>
            ) : display === "status" ? (
              <div>
                {group === "Todo" ? (
                  <MdRadioButtonUnchecked />
                ) : group === "In progress" ? (
                  <CgTimelapse className="progress" />
                ) : (
                  <TbCircleDotted className="backlog" />
                )}
              </div>
            ) : (
              <>
                {group === "Urgent" ? (
                  <BsExclamationSquareFill  className="urgent" />
                ) : group === "No Priority" ? (
                  <BsThreeDots />
                ) : (
                  <GiNetworkBars />
                )}
              </>
            )}
            <p className="board_top_title">
              {group} <span>{groupedAndSortedTickets[group].length}</span>
            </p>
            <HiMiniPlus />
            <BsThreeDots />
          </div>
          <div className="board_cards">
            {groupedAndSortedTickets[group].map((ticket) => (
              <Card key={ticket.id} ticket={ticket} display={display} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Board;
