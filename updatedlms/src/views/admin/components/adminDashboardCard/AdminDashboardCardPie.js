import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./adminDashboardCard.css";

Chart.register(ArcElement);

const AdminDashboardCardHalfPie = (props) => {
  const data = {
    datasets: [
      {
        data: props.data,
        backgroundColor: ["#4E4CAC", "#B8C2EB", "#AFCAFF"],
        display: true,
      },
    ],
  };
  console.log(data,"resource data")
  return (
    <div className="adminCardPie">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: true,
            },
          },
          rotation: -90,
          circumference: 180,
          cutout: "60%",
          maintainAspectRatio: false,
          responsive: true,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "55%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      ></div>
    </div>
  );
};

export default AdminDashboardCardHalfPie;
