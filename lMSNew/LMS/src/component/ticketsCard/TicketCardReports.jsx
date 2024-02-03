import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { useContext } from "react";
import { ticketschartdata } from "../../utils/ticketchartcarddetails/data";
import { useEffect } from "react";
import { GlobalContext } from "../../context/GlobalState";
import noSamplerImg from "../../assets/svg/dashboard/samplers/nosamplerfound.svg";
import "./ticket.css";
import { useParams } from "react-router-dom";
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center",
  width: "100%",
  height: "220px",
};
function TicketCardReports() {
  const reportticket = useParams();
  const { ticketformenteereport, ticketStatusInfo } = useContext(GlobalContext);
  useEffect(() => {
    if(reportticket)
    {
      ticketformenteereport(reportticket.id);
    }
  }, []);

  const chartdata = ticketschartdata.filter((item) => item.display === true).map((elem) => {
    if (elem.id === "resolved") {
      return { ...elem, value: ticketStatusInfo.resolved };
    } else if (elem.id === "rejected") {
      return { ...elem, value: ticketStatusInfo.rejected };
    } else {
      return { ...elem, value: ticketStatusInfo.pending };
    }
});
  return Object.values(ticketStatusInfo).length !== 0 &&
    ticketStatusInfo.raised != 0 ? (
    <>
      <div className="tickets-pie-height" style={styles}>
        <ResponsivePie
          className="tickets-pie-chart-height"
          colors={chartdata.map((el) => el.color)}
          data={chartdata}
          enableArcLabels={false}
          arcLinkLabel={"value"}
          margin={{
            top: 10,
            right: 60,
            bottom: 0,
            left: 60,
          }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colorBy="id"
          borderColor="inherit:darker(0.6)"
          radialLabelsSkipAngle={10}
          radialLabelsTextXOffset={6}
          radialLabelsTextColor="#333333"
          radialLabelsLinkOffset={0}
          radialLabelsLinkDiagonalLength={16}
          radialLabelsLinkHorizontalLength={24}
          radialLabelsLinkStrokeWidth={1}
          radialLabelsLinkColor="inherit"
          slicesLabelsSkipAngle={10}
          slicesLabelsTextColor="#333333"
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          theme={{
            tooltip: {
              container: {
                fontSize: "13px",
              },
            },
            labels: {
              text: { color: "#555" },
            },
          }}
        />
      </div>
      <div className="tickets-pie-legend-container row align-items-center mt-1">
        {ticketschartdata.map((val) => {
          return (
            <div className="d-flex col-6 align-items-center justify-content-center">
              <div
                className="legedTile col-3"
                style={{
                  width: "16px",
                  height: "8px",
                  borderRadius: "4px",
                  overflow: "hidden",
                  backgroundColor: `${val.color}`,
                }}
              ></div>
              <div
                className="legendName col-5 offset-1 text-start"
                style={{ fontSize: "12px", color: "#424242" }}
              >
                {`${val.label} ${ticketStatusInfo[val.id]}`}
              </div>
            </div>
          );
        })}
      </div>
    </>
  ) : (
    <div className="NoSamplerCard">
      <img src={noSamplerImg} alt="noSamplerImg" className="noSamplerImg" />
      <p className="nosamplertext mt-3">No Tickets Found</p>
    </div>
  );
}

export default TicketCardReports;