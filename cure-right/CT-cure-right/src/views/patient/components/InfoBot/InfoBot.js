import React, { useState } from "react";
import medicine from "../../assets/icons/medicine.svg";
import cross from "../../assets/icons/whiteCross.svg";
import messageIcon from "../../assets/icons/messageIcon.svg";
import "./InfoBot.css";

const InfoBot = ({ setMlResponse, mlResponse, medName }) => {
  return (
    <div className="Infobot">
      <div className="InfoBotBox1">
        <div className="d-flex align-items-center">
          <img style={{ height: "1rem" }} src={messageIcon} alt="" />
          <span
            style={{
              color: "white",
              fontSize: "12px",
              fontWeight: "600",
              marginLeft: "0.5rem",
            }}
          >
            Info Bot
          </span>
        </div>
        <img
          onClick={() => setMlResponse("")}
          className="cursor-pointer h-3"
          src={cross}
          alt=""
        />
      </div>

      <div className="InfoBotBox2  d-flex align-items-center gap-2">
        <img style={{ height: "1.7rem" }} src={medicine} alt="" />
        <span
          style={{
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {/* Montair-LC */}
          {medName}
        </span>
      </div>

      <div className="InfoBotBoxContainer">
        <div className="InfoBotBox3">
          <h6 className="HeadingBox">Details</h6>
          <p className="ParaBox">{mlResponse}</p>
        </div>
        <div className="InfoBotBox3">
          <h6 className="HeadingBox">Usage</h6>
          <p className="ParaBox">
            Paracetamol, commonly known as acetaminophen, is widely used for its
            pain-relieving and fever-reducing properties. It is a go-to
            medication for alleviating mild to moderate discomfort, including
            headaches, muscle aches, and dental pain. It is also frequently
            employed to lower fever in various illnesses. It's advisable to
            consult healthcare professionals before use, especially if there are
            underlying medical conditions or concurrent medication usage.
          </p>
        </div>

        <div className="InfoBotBox3">
          <h6 className="HeadingBox">Side Effects</h6>
          <p className="ParaBox">
            While paracetamol (acetaminophen) is generally considered safe when
            used as directed, it can have side effects if not taken properly.
            The most significant concern is the potential for liver damage when
            exceeding the recommended dosage. Taking too much paracetamol,
            especially over an extended period or in combination with alcohol,
            can strain the liver and lead to serious complications.
            Additionally, a rare but serious side effect is an allergic
            reaction, which might manifest as skin rashes, swelling, or
            difficulty breathing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoBot;
