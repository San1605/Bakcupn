import React from "react";
import { useParams } from "react-router-dom";
import ReportEvaluation from "../userReport/ReportEvaluation";
import "./evaluationReport.css";

function UserEvaluationReport() {
  const params = useParams();
  return <ReportEvaluation id={params.id} flag={"EvalReport"} />;
}

export default UserEvaluationReport;
