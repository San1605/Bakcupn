// import * as React from 'react';
// import PropTypes from 'prop-types';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// function createData(name, calories, fat, carbs, protein, price) {
//   return {
//     name,
//     calories,
//     fat,
//     carbs,
//     protein,
//     price,
//     history: [
//       {
//         date: '2020-01-05',
//         customerId: '11091700',
//         amount: 3,
//       },
//       {
//         date: '2020-01-02',
//         customerId: 'Anonymous',
//         amount: 1,
//       },
//     ],
//   };
// }

// function Row(props) {
//   const { row } = props;
//   const [open, setOpen] = React.useState(false);

//   return (
//     <React.Fragment>
//       <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
//         <TableCell>
//           <IconButton
//             aria-label="expand row"
//             size="small"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
//           </IconButton>
//         </TableCell>
//         <TableCell component="th" scope="row">
//           {row.name}
//         </TableCell>
//         <TableCell align="right">{row.calories}</TableCell>
//         <TableCell align="right">{row.fat}</TableCell>
//         <TableCell align="right">{row.carbs}</TableCell>
//         <TableCell align="right">{row.protein}</TableCell>
//       </TableRow>
//       <TableRow>
//         <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
//           <Collapse in={open} timeout="auto" unmountOnExit>
//             <Box sx={{ margin: 1 }}>
//               <Typography variant="h6" gutterBottom component="div">
//                 History
//               </Typography>
//               <Table size="small" aria-label="purchases">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Date</TableCell>
//                     <TableCell>Customer</TableCell>
//                     <TableCell align="right">Amount</TableCell>
//                     <TableCell align="right">Total price ($)</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {row.history.map((historyRow) => (
//                     <TableRow key={historyRow.date}>
//                       <TableCell component="th" scope="row">
//                         {historyRow.date}
//                       </TableCell>
//                       <TableCell>{historyRow.customerId}</TableCell>
//                       <TableCell align="right">{historyRow.amount}</TableCell>
//                       <TableCell align="right">
//                         {Math.round(historyRow.amount * row.price * 100) / 100}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </Box>
//           </Collapse>
//         </TableCell>
//       </TableRow>
//     </React.Fragment>
//   );
// }

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

// export default function CollapsibleTable() {
//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label="collapsible table">
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Dessert (100g serving)</TableCell>
//             <TableCell align="right">Calories</TableCell>
//             <TableCell align="right">Fat&nbsp;(g)</TableCell>
//             <TableCell align="right">Carbs&nbsp;(g)</TableCell>
//             <TableCell align="right">Protein&nbsp;(g)</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.name} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }





import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import downloadIcon from "../assets/icons/downloadIcon.svg";
import deleteIcon from "../assets/icons/deleteIcon.svg";
import folderImg from "../assets/svg/folder.svg";
import { globalContext } from "../context/globalContext";

const TableCollapsible = ({ projectData, height, navigateTo }) => {
    const navigate = useNavigate();
    const { deleteproject, downloadApi, downloadUrlArray, setIsFirstTime } = useContext(globalContext);

    const handleDownload = (filename, pdfUrl) => {
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const downloadFiles = (value) => {
        console.log(value,"valueeeeeeeeeeeeeeeeeeeee")
        if (value?.length > 0) {
            value?.forEach(element => {
                handleDownload(element?.fileName, element?.pdfUrl);
            });
        }


        // downloadApi(value);
    };

    // useEffect(() => {
    //     if (downloadUrlArray?.length > 0) {
    //         downloadUrlArray?.forEach(element => {
    //             handleDownload(element?.fileName, element?.pdfUrl);
    //         });
    //     }
    // }, [downloadUrlArray]);

    return (
        <TableContainer component={Paper} className={`relative overflow-x-auto sm:rounded-sm ${height ? height : "h-[calc(100%_-_40px)]"}`}>
            <Table className="w-full text-sm text-left rtl:text-right font-normal shadow-sm bg-white">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Project Name</TableCell>
                        <TableCell>Size</TableCell>
                        <TableCell>Date Modified</TableCell>
                        {navigateTo === "project" && <TableCell>Action</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectData &&
                        projectData?.length > 0 &&
                        projectData?.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-${index}`} id={`panel-${index}`}>
                                            <div className="flex gap-2.5">
                                                <img src={folderImg} alt="" />
                                                {item?.project_name}
                                            </div>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                {/* Details section, you can customize this part */}
                                                Total Files: {item?.totalFiles}
                                                Files Analyzed: {item?.filesAnalyzed}
                                                Files Converted: {item?.filesConverted}
                                                Files Tested: {item?.filesTested}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </TableCell>
                                <TableCell>{item?.project_size}</TableCell>
                                <TableCell>{item?.project_date_modified}</TableCell>
                                {navigateTo === "project" && (
                                    <TableCell>
                                        <div className="flex flex-row gap-4">
                                            <img
                                                src={downloadIcon}
                                                alt="downloadIcon"
                                                className="cursor-pointer"
                                                onClick={() => downloadFiles(item?.download_link)}
                                            />
                                            <img
                                                src={deleteIcon}
                                                alt="deleteIcon"
                                                className="cursor-pointer"
                                                onClick={() => deleteproject(item?.project_name)}
                                            />
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableCollapsible;
