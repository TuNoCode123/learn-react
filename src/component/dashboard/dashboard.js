import "./db.css";
import { Bar, Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { useEffect, useState } from "react";
import { getOverView } from "../../services";
const Dashboard = () => {
  const [data, setData] = useState();
  const hanldleOverView = async () => {
    const res = await getOverView();
    if (res && res.EC == 0) {
      setData(res.DT);
    }
  };
  useEffect(() => {
    hanldleOverView();
  }, []);
  return (
    <>
      <div className="dashboard-content">
        <div className="l-content">
          <div className="child">
            <span>Total Users</span>
            <span>{data?.users.countUsers}</span>
          </div>
          <div className="child">
            <span>Total Quizzs</span>
            <span>{data?.others.countQuiz}</span>
          </div>
          <div className="child">
            <span>Total Questions</span>
            <span>{data?.others.countQuestions}</span>
          </div>
          <div className="child">
            <span>Total Answers</span>
            <span>{data?.others.countAnswers}</span>
          </div>
        </div>
        <div className="r-content">
          <Bar
            datasetIdKey="id"
            data={{
              labels: ["Users", "Quizzs", "Questions", "Answers"],
              datasets: [
                {
                  id: 1,
                  label: "count",
                  data: [
                    data?.users.countUsers,
                    data?.others.countQuiz,
                    data?.others.countQuestions,
                    data?.others.countAnswers,
                  ],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
    </>
  );
};
export default Dashboard;
