import React, { useContext, useState, useEffect } from 'react'
import "./DownloadExcelFilterModal.css"
import Modal from 'react-bootstrap/Modal';
import { GlobalContext } from '../../../../context/GlobalState';
import { Bars } from 'react-loader-spinner'
import ExcelJS from 'exceljs';

const DownloadExcelFilterModal = (props) => {
    const {
        downreportfordephead,
        downrepoindephead,
        downrepoforadminemp,
        dispatch,
        downloadreportalldata,
        downloadrepoforhrsimple
    }
        = useContext(GlobalContext)

    const [showDownloadFilterLoading, setDownlaodingFilterLoading] = useState(false)
    const [headers, setHeaders] = useState([]);
    const [headersSelected, setHeadersSelected] = useState([]);

    console.log(headersSelected, "selectedHeaders")
    const handleExport = (data, headers) => {

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employee Data');
        worksheet.columns = headers.map((item) => ({
            header: item,
            key: item,
            width: 30,
        }));

        const multiValueColumns = [];

        data?.forEach((item, index) => {
            Object.keys(item)?.forEach((ctr, index) => {

                if (
                    headers.includes(ctr) &&
                    item[ctr] !== null &&
                    item[ctr].includes(",") &&
                    multiValueColumns.find((obj) => obj === ctr) === undefined &&
                    // custom or static 
                    ctr !== "Overall Skills") {
                    multiValueColumns.push(ctr);
                }

            })
        })


        const headerRow = worksheet.getRow(1);
        headerRow.eachCell((cell) => {
            cell.font = { color: { argb: 'FFFFFF' } };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: '000000' },
            };
        });

        // Add data rows to the worksheet
        data.forEach((rowData) => {
            let maxRowCount = Math.max(
                ...multiValueColumns.map((column) => rowData[column]?.split(',').length)
            );

            if (maxRowCount === Number.NEGATIVE_INFINITY) {
                maxRowCount = 1;
            }

            for (let rowIndex = 0; rowIndex < maxRowCount; rowIndex++) {
                const row = {};
                headers.forEach((header) => {
                    const columnName = header;
                    if (multiValueColumns.includes(columnName)) {
                        const values = rowData[columnName].split(',');
                        row[columnName] = rowIndex < values.length ? values[rowIndex].trim() : '';
                    }
                    else {
                        row[columnName] = rowData[columnName] || '';
                    }
                });
                worksheet.addRow(row);
            }
        });

        workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'employee_data.xlsx';
            a.click();
            URL.revokeObjectURL(url);
        });
    };

    const checker = [
        undefined, null
    ]


    const toggleChange = (item) => {
        if (headersSelected.length > 0 && headersSelected?.includes(item)) {
            setHeadersSelected((prev) => prev.filter((data) => data !== item))
            if (item === "Project") {
                const Remove = headers?.slice(props.modalKey === "menteeList" ? 6 : 6, props.modalKey === "menteeList" ? 12 : 12)
                setHeadersSelected((prev) => prev.filter((data) => !Remove?.includes(data)))
            }
            else if (item == 'Interview ID') {
                const Remove = headers?.slice(16)
                setHeadersSelected((prev) => prev.filter((data) => !Remove?.includes(data)))
            }
        }
        else {
            if (item === "Project") {
                setHeadersSelected((prev) => [...prev, ...headers?.slice(props.modalKey === "menteeList" ? 6 : 6, props.modalKey === "menteeList" ? 12 : 12)])
            }
            else if (item === "Interview ID") {
                setHeadersSelected((prev) => [...prev, ...headers?.slice(16)])
            }
            else {
                setHeadersSelected((prev) => [...prev, item])
            }
        }
    }

    useEffect(() => {
        if (headers?.length > 0) {
            setHeadersSelected(headers?.slice(0, 4));
        }
    }, [headers]);

    const handleAll = () => {
        if (headers?.length === headersSelected?.length) {
            setHeadersSelected(headers?.slice(0, 4));
        }
        else {
            setHeadersSelected(headers)
        }
    }

    useEffect(() => {
        if (props.modalKey === 'departmentResources') {
            if (!checker.includes(downrepoindephead) && downrepoindephead?.length > 0) {
                setDownlaodingFilterLoading(false)
                setHeaders(Object.keys(downrepoindephead[0]));
            }
            else {
                setDownlaodingFilterLoading(true)
            }
        }
        else if (props.modalKey === 'adminEmployeeList') {
            if (!checker.includes(downrepoforadminemp) && downrepoforadminemp?.length > 0) {
                setDownlaodingFilterLoading(false)
                setHeaders(Object.keys(downrepoforadminemp[0]));
            }
            else {
                setDownlaodingFilterLoading(true)
            }
        }
        else if (props.modalKey === 'buddyList') {
            if (!checker.includes(downloadrepoforhrsimple) && downloadrepoforhrsimple?.length > 0) {
                setDownlaodingFilterLoading(false)
                setHeaders(Object.keys(downloadrepoforhrsimple[0]));
            }
            else {
                setDownlaodingFilterLoading(true)
            }
        }

        else if (props.modalKey === 'menteeList') {
            if (downloadreportalldata.alist.length > 0) {
                setDownlaodingFilterLoading(false)
                if (props.reporteeView === 1) {
                    setHeaders(Object.keys(downloadreportalldata.alist[0]));
                }
                else {
                    setHeaders(Object.keys(downloadreportalldata.blist[0]));
                }
            }
            else {
                setDownlaodingFilterLoading(true)
            }
        }
    }, [downrepoindephead, downrepoforadminemp, downloadreportalldata, downloadrepoforhrsimple])

    const downloadexcel = () => {
        if (props.modalKey === "menteeList") {
            if (!checker.includes(downloadreportalldata) && downloadreportalldata.alist.length > 0) {
                handleExport(props.reporteeView === 1 ? downloadreportalldata?.alist : downloadreportalldata?.blist, headersSelected);
            }
        }
        else if (props.modalKey === 'adminEmployeeList') {
            if (!checker.includes(downrepoforadminemp) && downrepoforadminemp?.length > 0) {
                handleExport(downrepoforadminemp, headersSelected);
                dispatch({
                    type: "REPORTDATA_ADMIN_EMP",
                    payload: [],
                });
            }
        }
        else if (props.modalKey === 'departmentResources') {
            if (!checker.includes(downrepoindephead) && downrepoindephead?.length > 0) {
                handleExport(downrepoindephead, headersSelected);
                dispatch({
                    type: "REPORTDATA_DEP_HEAD",
                    payload: [],
                });
            }
        }
        else if (props.modalKey === "buddyList") {
            if (!checker.includes(downloadrepoforhrsimple) && downloadrepoforhrsimple?.length > 0) {
                handleExport(downloadrepoforhrsimple, headersSelected);
                dispatch({
                    type: "MUL_HR",
                    payload: [],
                });
            }
        }
    };

    useEffect(()=>{
        if (headers?.length > 0) {
            if (props.show) {
                setHeadersSelected(headers?.slice(0, 4));
            }
        }
    },[headers,props.show])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className='DownloadExcelFilterModalClass'
        >
            <Modal.Header closeButton>
                <div className='DownloadFilterHeader'>
                    <div>Download Filter</div>
                    <span>Please select the coloums you want to download</span>
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className='filterPopover'>

                    {
                        showDownloadFilterLoading ? (
                            <div className="page-loader-downloadFilter">
                                <Bars
                                    height="50"
                                    width="50"
                                    color="#4F52B2"
                                    ariaLabel="bars-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="page-loader"
                                    visible={true}
                                />
                            </div>
                        ) : (
                            <>
                                <div className='selectAllBox'>
                                    <input type="checkbox"
                                        checked={headers?.length === headersSelected?.length}
                                        onChange={handleAll} />
                                    <label className='selectAllLabel' htmlFor="">Select All</label>
                                </div>

                                <div className="optionBox overflow-y-scroll">
                                    {
                                        headers?.length > 0 && (headers?.slice(4, props.modalKey === 'menteeList' ? 7 : 7).concat(headers?.slice(props.modaKey === "menteeList" ? 16 : 12, props.modalKey === "menteeList" ? 17 : headers?.length)))?.map((item, index) => {
                                            return (
                                                <div key={index}>
                                                    <input type="checkbox"
                                                        value={item}
                                                        checked={headersSelected?.includes(item)}
                                                        onChange={() => toggleChange(item)}
                                                        className='downloadFilterInput'
                                                    />
                                                    <span className='downloadFilterSpan'>
                                                        {
                                                            (item === "Project") ? ("Project Details") : item === "Interview ID" ? ("Interview Details") : (item)
                                                        }
                                                    </span>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                                <div className="downloadFilterButton">
                                    <button className='downloadFilterButtonCancel'
                                        onClick={() => props.onHide()}>Cancel</button>
                                    <button
                                        onClick={() => {
                                            props.onHide()
                                            downloadexcel()
                                        }}
                                        className='downloadFilterButtonExport' >Download</button>
                                </div>
                            </>
                        )
                    }
                </div>
            </Modal.Body>
        </Modal>
    )
}
export default DownloadExcelFilterModal