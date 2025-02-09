// import React, { useState, useRef, useCallback } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const LoanApplication = () => {
//   const { register, handleSubmit, reset, setValue } = useForm();
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [showWebcam, setShowWebcam] = useState(false);
//   const [videoFile, setVideoFile] = useState(null);
//   const webcamRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const recordedChunks = useRef([]);
//   const nav = useNavigate();

//   // const startRecording = useCallback(() => {
//   //   setShowWebcam(true);
//   //   recordedChunks.current = [];

//   //   if (webcamRef.current) {
//   //     const stream = webcamRef.current.video.srcObject;
//   //     mediaRecorderRef.current = new MediaRecorder(stream, {
//   //       mimeType: "video/webm",
//   //     });

//   //     mediaRecorderRef.current.ondataavailable = (event) => {
//   //       if (event.data.size > 0) {
//   //         recordedChunks.current.push(event.data);
//   //       }
//   //     };

//   //     mediaRecorderRef.current.onstop = () => {
//   //       const videoBlob = new Blob(recordedChunks.current, {
//   //         type: "video/webm",
//   //       });
//   //       const file = new File([videoBlob], "videokyc.webm", {
//   //         type: "video/webm",
//   //       });

//   //       setVideoFile(file);
//   //       setValue("videokyc", file); // Register video file in react-hook-form
//   //     };

//   //     mediaRecorderRef.current.start();
//   //     setTimeout(() => stopRecording(), 10000); // Stop recording after 10 seconds
//   //   }
//   // }, [setValue]);

//   // const stopRecording = useCallback(() => {
//   //   // if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
//   //   //   mediaRecorderRef.current.stop();
//   //   //   setShowWebcam(false);
//   //   // }

//   //   if (webcamRef.current) {
//   //     webcamRef.current.getScreenshot(); // Just to trigger frame capture
//   //     setShowWebcam(false);
//   //   }
//   // }, []);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     setMessage("");
//     // console.log(data);

//     // const formData = new FormData();
//     // Object.keys(data).forEach((key) => {
//     //   if (key !== "videokyc") {
//     //     formData.append(key, data[key]);
//     //   }
//     // });

//     // if (videoFile) {
//     //   formData.append("videokyc", videoFile);
//     // } else {
//     //   setLoading(false);

//     // }
//     console.log(data);

//     try {
//       await axios.post("http://localhost:8000/api/v1/register", data);

//       setMessage("Application submitted successfully!");
//       reset();
//       nav("/login");
//     } catch (error) {
//       setMessage("Error submitting application.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <Navbar login={true} logout={false} signup={true} dashboard={false} />
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
//         <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
//           <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
//             Signup
//           </h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 {...register("name")}
//                 required
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 {...register("email")}
//                 required
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 {...register("password")}
//                 required
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Role
//               </label>
//               <select
//                 {...register("role")}
//                 required
//                 className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//               >
//                 <option value="applicant">Applicant</option>
//                 <option value="loanOfficer">Loan Officer</option>
//               </select>
//             </div>

//             {/* Video KYC */}
//             {/* <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Video KYC
//               </label>
//               <input type="file"  className="hidden" />
//               {showWebcam ? (
//                 <div className="relative">
//                   <Webcam ref={webcamRef} audio={true} />
//                   <button
//                     type="button"
//                     onClick={stopRecording}
//                     className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-1 px-3 rounded-md"
//                   >
//                     Stop Recording
//                   </button>
//                 </div>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={startRecording}
//                   className="w-full bg-blue-600 text-white py-2 rounded-md"
//                 >
//                   Start KYC
//                 </button>
//               )}
//             </div> */}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-2 rounded-md"
//             >
//               {loading ? "Submitting..." : "Apply"}
//             </button>
//           </form>

//           {message && (
//             <p
//               className={`mt-4 text-center text-sm ${
//                 message.includes("Error") ? "text-red-500" : "text-green-600"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoanApplication;


import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const LoanApplication = () => {
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const nav = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    console.log(data);

    try {
      await axios.post("http://localhost:8000/api/v1/register", data);
      setMessage("Application submitted successfully!");
      reset();
      nav("/login");
    } catch (error) {
      setMessage("Error submitting application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar login={true} logout={false} signup={true} dashboard={false} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">
              Join <span className="bg-gradient-to-r from-pink-600 to-pink-500 bg-clip-text text-transparent">rinflow</span>
            </h2>
            <p className="mt-2 text-slate-600">Create your account to get started</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md shadow-sm rounded-xl p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  {...register("name")}
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  {...register("email")}
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role
                </label>
                <select
                  {...register("role")}
                  required
                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                >
                  <option value="applicant">Applicant</option>
                  <option value="loanOfficer">Loan Officer</option>
                </select>
              </div>

              <div className="relative group pt-4">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-pink-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition h-0"></div>
                <button
                  type="submit"
                  disabled={loading}
                  className="relative w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-800 transition font-medium"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </div>
            </form>

            {message && (
              <div className={`mt-4 text-center text-sm ${
                message.includes("Error") 
                  ? "text-pink-600" 
                  : "text-green-600"
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanApplication;