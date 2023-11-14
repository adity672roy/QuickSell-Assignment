import React from "react";
import { GoDotFill } from "react-icons/go";
import { BsThreeDots } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import { CgTimelapse } from "react-icons/cg"; 
import { MdRadioButtonUnchecked } from "react-icons/md";
import { TbCircleDotted } from "react-icons/tb";

const Card = ({ ticket, display }) => {
  
  return (
    <div className="card">
      <div className="card_title">
        <h3>{ticket.id}</h3>
        {display !== "userId" ? (
          <div className="card_avatar">
            <RxAvatar className="avatar" />
            <GoDotFill className="online" />
          </div>
        ) : null}
      </div>
      <div className="card_description">
        {display !== "status" ? (
          <div>
            {ticket.status === "Todo" ? (
              <MdRadioButtonUnchecked />
            ) : ticket.status === "In progress" ? (
              <CgTimelapse className="progress" />
            ) : (
              <TbCircleDotted   className="backlog" />
            )}
          </div>
        ) : null}

        <small>{ticket.title}</small>
      </div>
      <div className="card_button">
        <button>
          <BsThreeDots  />
        </button>
        <button>
          <GoDotFill className="dot" />
          {ticket.tag}
        </button>
      </div>
    </div>
  );
};

export default Card;
