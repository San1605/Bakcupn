import React, { createContext, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const globalContext = createContext();

const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [selectedFilesConvert, setSelectedFilesConvert] = useState([]);
  const [adminMetrics, setAdminMetrics] = useState({});
  const [analysisData, setAnalysisData] = useState({});
  const [rightTextValue, setRightTextValue] = useState("");
  const [leftTextValue, setLeftTextValue] = useState("");
  const [downloadUrlArray, setDownloadUrlArray] = useState("");
  const [valueForTesting, setValueForTesting] = useState("");
  const [editorRightBoxValue, setEditorRighttBoxValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const BASE_URL = "https://transpiler-app.azurewebsites.net/";

  // const BASE_URL = "https://86c4-103-137-84-138.ngrok-free.app";
  const abortControllersRef = React.useRef([]);
  const activeRequestsCounterRef = React.useRef(0);


  async function getprojectsData() {
    // Increment the counter for a new request
    activeRequestsCounterRef.current += 1;
    // setAdminMetrics({})
    // Abort all previous requests
    abortControllersRef.current.forEach((controller) => controller.abort());

    // Create a new AbortController and its signal
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Add the new controller to the array
    abortControllersRef.current.push(abortController);

    setLoading(true);
    // Show loading toast only for the first request
    // const loadingToastId =
    //   activeRequestsCounterRef.current === 1
    //     ? toast.loading("Please wait Fetching projects ")
    //     : null;

    try {
      const config = {
        url: `${BASE_URL}/projects`,
        method: "GET",
        headers: {
          // "ngrok-skip-browser-warning": "69420",
        },
        signal: signal, // Assign the signal to the request
      };

      const response = await axios(config);

      if (response.status === 200) {
        const data = response.data;

        if (data) {
          console.log("data", data);
          setProjectData(data);
          // setAdminMetrics(data?.metric);
          // Dismiss the loading toast only for the first request
          // if (loadingToastId) {
          //   toast.dismiss(loadingToastId);
          // }
          // toast.success("Project fetched");
          setLoading(false);
        }
      }
    } catch (error) {
      // Check if the error is due to the request being canceled
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        // Show error toast only for actual errors
        console.log(error);
        // Dismiss the loading toast only for the first request
        // if (loadingToastId) {
        //   toast.dismiss(loadingToastId);
        // }
        // toast.error("Something went wrong");
        setLoading(false);
      }
    } finally {
      // Decrement the counter when a request completes
      activeRequestsCounterRef.current -= 1;

      // Cleanup function to remove the completed request controller
      abortControllersRef.current = abortControllersRef.current.filter(
        (controller) => controller !== abortController
      );
    }
  }

  async function getAdminMetrics() {

    setLoading(true);

    try {
      const config = {
        url: `${BASE_URL}/home`,
        method: "GET",
        headers: {
          // "ngrok-skip-browser-warning": "69420",
        },
      };

      const response = await axios(config);

      if (response.status === 200) {
        const data = response.data;

        if (data?.recent_project && data?.metric) {
          console.log("data", data);
          setProjectData(data?.recent_project);
          setAdminMetrics(data?.metric);
          setLoading(false);
        }
      }
    } catch (error) {

      console.log(error);
      setLoading(false);

    }
  }




  async function getFilesData(projectName) {
    setFileData([])
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // const toastid = toast.loading("Fetching Files from project")
    var raw = JSON.stringify({
      project_name: projectName,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    // fetch(`${BASE_URL}/project_click`, requestOptions)
    //   .then((response) => response.text())
    //   .then((result) => {
    //     console.log(result,'resulttttttttttttt')
    //     setFileData(JSON.parse(result));
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //     setLoading(false);
    //   }); 

    try {
      const response = await fetch(`${BASE_URL}/project_click`, requestOptions);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.text();
      console.log(result, "resulttttttttttttt");
      setFileData(JSON.parse(result));
      // toast.dismiss()
      // toast.success("File Fetched")
      setLoading(false);
    } catch (error) {
      // toast.dismiss()
      // toast.error("Something went wrong")
      console.error("Error fetching files:", error.message);
      setLoading(false);
      throw error; // Propagate the error for higher-level handling if needed
    }

  }

  async function addProjectName(projectName) {

    const toastid = toast.loading("Creating project")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      project_name: projectName,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${BASE_URL}/add_projects`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === "Project already exists.") {
          toast.dismiss(toastid)
          toast.error("Project already exists.")
          setLoading(false)
        }
        else if (result === "Error in adding project.") {
          toast.dismiss(toastid)
          toast.error("Error in adding project")
          setLoading(false)
        }
        else {
          toast.dismiss(toastid)
          toast.success("Project created")

          getprojectsData().then(() => {
          })
            .catch(() => {
              toast.dismiss(toastid)
              toast.error("Failed to fetch projects");
            });

        }
      })
      .catch((error) => {
        toast.dismiss()
        toast.error("Something went wrong")
        console.log("error", error);
        setLoading(false);
      });
  }

  async function deleteproject(filename) {
    const toastid = toast.loading("Deleting project")
    // setLoading(true);
    let data = {
      project_file_name: [filename],
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(`${BASE_URL}/drop_project`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === "Error in project delete.") {
          toast.dismiss(toastid)
          toast.error(result)
          // setLoading(false)
        }
        else {
          toast.dismiss(toastid)
          toast.success("Project Deleted");
          getprojectsData().then(() => {
          })
            .catch(() => {
              toast.dismiss(toastid)
              toast.error("Failed to fetch projects");
            });
        }
      })
      .catch((error) => {
        toast.dismiss()
        toast.error("Something went wrong")
        console.log("error", error);
        // setLoading(false);
      });
  }

  async function deleteFiles(filename, projectName) {
    let toastid = toast.loading("Deleting File")
    // setLoading(true);
    let data = {
      project_file_name: Array.isArray(filename) ? filename : [filename],
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(`${BASE_URL}/drop_project`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result === "Error in file delete.") {
          toast.dismiss(toastid)
          toast.error("Error in file delete.")
          // setLoading(false)
        }
        else {
          toast.dismiss(toastid)
          toast.success("File Deleted")
          getFilesData(projectName).then(() => {
          })
            .catch(() => {
              toast.dismiss(toastid)
              toast.error("Failed to fetch files");
            });
        }


      })
      .catch((error) => {
        toast.dismiss()
        toast.error("Something went wrong")
        console.log("error", error);
        setLoading(false);
      });
  }

  async function uploadFile(files, projectName) {
    const toastid = toast.loading("Uploading File")
    // setLoading(true);
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "multipart/form-data");
    console.log(files);
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    var requestOptions = {
      method: "POST",
      // headers: myHeaders,
      body: formData,
      redirect: "follow",
    };
    try {
      const response = await fetch(`${BASE_URL}/upload_file`, requestOptions);
      const result = await response.text();

      if (result === "Error in uploading.") {
        toast.dismiss(toastid)
        toast.error("Error in uploading.")
        // setLoading(false)
      }
      else {
        toast.dismiss(toastid);
        toast.success("File created");
        getFilesData(projectName)
          .then(() => {
          })
          .catch(() => {
            toast.dismiss(toastid)
            toast.error("Failed to fetch files");
          });
      }
    } catch (error) {
      // setLoading(false);
      toast.dismiss(toastid);
      toast.error("Something went wrong");
      console.log("error", error);
    }
  }

  // async function uploadtext(text, projectName) {
  //   // const toastid=toast.loading("Creating File")
  //   setLoading(true);
  //   console.log(projectName, "prooooooooooooooooooooooooo");
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");
  //   var raw = JSON.stringify({
  //     text: text,
  //     project_name: projectName,
  //   });
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow",
  //   };
  //   fetch(`${BASE_URL}/text`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       toast.dismiss()
  //       getFilesData(projectName).then(() => {
  //         toast.success("File created")
  //       })
  //       .catch(() => {
  //           toast.error("Failed to fetch files");
  //         });
  //     })
  //     .catch((error) => {
  //       toast.dismiss()
  //       toast.error("Something went wrong")
  //       console.log("error", error);
  //       setLoading(false);
  //     });
  // }

  async function uploadtext(text, projectName) {
    const toastid = toast.loading("Creating File")
    // setLoading(true);
    console.log(projectName, "prooooooooooooooooooooooooo");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      text: text,
      project_name: projectName,
    });
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(`${BASE_URL}/text`, requestOptions);
      const result = await response.text();
      if (result === "Error in uploading.") {
        toast.dismiss(toastid)
        toast.error("Error in uploading.")
        // setLoading(false)
      }
      else {
        toast.dismiss(toastid);
        toast.success("File created");
        getFilesData(projectName)
          .then(() => {
          })
          .catch(() => {
            toast.dismiss(toastid);
            toast.error("Failed to fetch files");
          });
      }
    } catch (error) {
      // setLoading(false);
      toast.dismiss();
      toast.error("Something went wrong");
      console.log("error", error);
    }
  }


  async function analyseFiles(selectedFiles, projectName) {
    setLoading(true);
    const filesObj = {};
    if (selectedFiles?.length > 0) {
      selectedFiles?.forEach((element) => {
        filesObj[element?.fileName] = element.fileData;
      });
      filesObj.project_name = projectName;
    }
    console.log(filesObj, "obj");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(filesObj);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    fetch(`${BASE_URL}/code_analyzer`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAnalysisData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }

  async function convertCode(value, fileName, rightLang, leftLang, projectName) {
    setLoading(true);
    let data = { [fileName]: value, lang: rightLang, project_name: projectName };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(`${BASE_URL}/convert`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // setRightTextValue(result);
        setRightTextValue(result?.converted_code);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }

  async function testingApiResults(value, projectName) {
    setLoading(true);
    let data = {
      converted_code: value,
    };
    if (projectName !== undefined) {
      data.project_name = projectName;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(`${BASE_URL}/testing`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setEditorRighttBoxValue(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoading(false);
      });
  }

  async function downloadAnalysis(value) {
    // const toastid=toast.loading("Downloading Files ..")
    // setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("ngrok-skip-browser-warning", "69420");
    var requestOptions = {
      method: "get",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(`${BASE_URL}/download_report`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const pdfUrl = result;
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.target = "_blank"
        a.download = "analysis_report";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // toast.success("File downloaded")
      })
      .catch((error) => {
        // toast.dismiss(toastid)
        // toast.error("Something went wrong")
        console.log("error", error);
        // setLoading(false);
      });
  }

  async function downloadApi(value) {
    // const toastid=toast.loading("Downloading Files ..")
    // setLoading(true);
    let data = {
      project_name: value,
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      redirect: "follow",
    };
    fetch(`${BASE_URL}/download`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result)

        // const arr = [];
        // Object.keys(result)?.forEach((item) => {
        //   arr.push({
        //     fileName: item,
        //     pdfUrl: result[item],
        //   });
        // });
        setDownloadUrlArray(result);

        // toast.dismiss(toastid)
        // toast.success("File downloaded")
        // setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        // toast.dismiss(toastid)
        // toast.error("Something went wrong")
        // setLoading(false);
      });
  }


  const handleLogin = (email, password) => {
    const toastid = toast.loading("Please wait..");
    let data = {
      email: email,
      password: password,
    };
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/login`,
      headers: {
        // "ngrok-skip-browser-warning": "69420",
      },
      data: data,
    };
    axios(config)
      .then((response) => {
        if (response.status === 200) {
          if (response.data.data.Authentication) {
            sessionStorage.setItem("user-email", response.data.data.email);
            sessionStorage.setItem("user-name", response.data.data.username);
            toast.dismiss(toastid);
            toast.success("Login Successful");
            navigate("/home");
          } else {

            if (response.data?.message === "wrong password") {
              toast.dismiss(toastid);
              toast.error("Please Check email Id or Password and try again");
            }
            else {
              toast.dismiss(toastid);
              toast.error("User not registered");
            }

          }
        }
      })
      .catch((error) => {
        toast.dismiss(toastid);
        toast.error("Something went wrong");
        console.log(error);
      });
  };

  const handleSignUp = (userName, email, password) => {
    toast.dismiss();
    const toastid = toast.loading("Please wait");

    let data = {
      email: email,
      password: password,
      username: userName,
    };
    console.log(data, "data")
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/signup`,
      headers: {
        // "ngrok-skip-browser-warning": "69420",
      },
      data: data,
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          toast.dismiss(toastid);
          toast.success("User registered successfully");
          navigate("/");
        }
      })
      .catch((error) => {
        toast.dismiss(toastid);
        toast.error("Something went wrong");
        console.log(error);
      });
  };


  return (
    <globalContext.Provider
      value={{
        projectData: projectData,
        adminMetrics: adminMetrics,
        getprojectsData: getprojectsData,
        deleteproject,
        getFilesData,
        fileData,
        addProjectName,
        uploadFile,
        uploadtext,
        analyseFiles,
        selectedFilesConvert,
        setSelectedFilesConvert,
        analysisData,
        setAnalysisData,
        rightTextValue,
        setRightTextValue,
        leftTextValue,
        setLeftTextValue,
        convertCode,
        setProjectData,
        downloadApi,
        downloadUrlArray,
        valueForTesting,
        setValueForTesting,
        editorRightBoxValue,
        setEditorRighttBoxValue,
        testingApiResults,
        deleteFiles,
        loading,
        setLoading,
        downloadAnalysis,
        isFirstTime,
        setIsFirstTime,
        handleLogin,
        handleSignUp,
        getAdminMetrics
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
export default GlobalProvider;