// import { Button, Card } from "@mui/material";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";

// const Dashboard = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [username, setUsername] = useState("");
//   const [role, setRole] = useState(null);
//   const [appliedLoans, setAppliedLoans] = useState([]);
//   const [loanApplications, setLoanApplications] = useState([]);
//   const nav = useNavigate();

//   useEffect(() => {
//     async function fetchUserData() {
//       try {
//         const response = await fetch("http://localhost:8000/api/v1/getUser", {
//           credentials: "include",
//         });
//         const data = await response.json();
//         setUsername(data.data.user.name);
//         setRole(data.data.role);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     }

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (role === "applicant") {
//       async function fetchLoanData() {
//         try {
//           const response = await fetch(
//             "http://localhost:8000/api/v1/applicant/loans",
//             {
//               credentials: "include",
//             }
//           );
//           const data = await response.json();
//           setAppliedLoans(data.loans);
//         } catch (error) {
//           console.error("Error fetching loan data:", error);
//         }
//       }
//       fetchLoanData();
//     } else if (role === "loanOfficer") {
//       async function fetchAllLoans() {
//         try {
//           const response = await fetch(
//             "http://localhost:8000/api/v1/loanOfficer/getAllLoans",
//             {
//               credentials: "include",
//             }
//           );
//           const data = await response.json();
//           setLoanApplications(data.data.loans);
//         } catch (error) {
//           console.error("Error fetching loan applications:", error);
//         }
//       }
//       fetchAllLoans();
//     }
//   }, [role]);

//   const handleApply = () => {
//     nav("/applicationForm");
//   };

//   if (!role)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         Loading...
//       </div>
//     );

//   const handleReviewLoan = (loanId) => {
//     nav(`/loan/${loanId}`, { replace: true });
//   };

//   const LoanCard = ({ loan }) => (
//     <Card className="w-full p-6 mb-4 bg-white shadow-lg rounded-lg">
//       <div className="space-y-4">
//         <div className="flex justify-between items-start">
//           <div>
//             <h3 className="text-xl font-bold text-gray-900">
//               Loan #{loan._id}
//             </h3>
//             <p className="text-sm text-gray-500">
//               Applied on: {new Date(loan.createdAt).toLocaleDateString()}
//             </p>
//           </div>
//           <div
//             className={`px-3 py-1 rounded-full text-sm font-medium
//             ${
//               loan.loan_status === "Approved"
//                 ? "bg-green-100 text-green-800"
//                 : loan.loan_status === "Pending"
//                 ? "bg-yellow-100 text-yellow-800"
//                 : "bg-red-100 text-red-800"
//             }`}
//           >
//             {loan.loan_status}
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <p className="text-sm text-gray-500">Amount Requested</p>
//             <p className="text-lg font-semibold">
//               ₹{loan.loan_amount?.toLocaleString()}
//             </p>
//           </div>

//           <div>
//             <p className="text-sm text-gray-500">Tenure</p>
//             <p className="text-lg font-semibold">{loan.loan_term} months</p>
//           </div>
//         </div>

//         {role === "loanOfficer" && (
//           <div className="flex justify-end space-x-2 mt-4">
//             <Button
//               onClick={() => handleReviewLoan(loan._id)}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Review Application
//             </Button>
//           </div>
//         )}
//       </div>
//     </Card>
//   );

//   return (
//     <>
//       <Navbar login={false} logout={true} signup={false} dashboard={false} />
//       <div className="min-h-screen bg-gradient-to-b from-pink-100 to-white">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <div className="mb-8 text-center">
//             <h1 className="text-3xl font-bold text-gray-900">
//               Welcome, {username || "Loading..."}
//             </h1>
//             {role === "applicant" && (
//               <Button
//                 onClick={handleApply}
//                 className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
//               >
//                 Apply for New Loan
//               </Button>
//             )}
//           </div>

//           <div className="space-y-6">
//             <h2 className="text-2xl font-semibold text-gray-900">
//               {role === "applicant" ? "Your Loans" : "Loan Applications"}
//             </h2>

//             <div className="grid gap-6">
//               {(role === "applicant" ? appliedLoans : loanApplications)
//                 ?.length > 0 ? (
//                 (role === "applicant" ? appliedLoans : loanApplications).map(
//                   (loan, index) => <LoanCard key={index} loan={loan} />
//                 )
//               ) : (
//                 <p className="text-center text-gray-600 py-8">
//                   No {role === "applicant" ? "loans" : "loan applications"}{" "}
//                   found.
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState(null);
  const [appliedLoans, setAppliedLoans] = useState([]);
  const [loanApplications, setLoanApplications] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:8000/api/v1/getUser", {
          credentials: "include",
        });
        const data = await response.json();
        setUsername(data.data.user.name);
        setRole(data.data.role);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

  useEffect(() => {
    if (role === "applicant") {
      async function fetchLoanData() {
        try {
          const response = await fetch(
            "http://localhost:8000/api/v1/applicant/loans",
            {
              credentials: "include",
            }
          );
          const data = await response.json();
          setAppliedLoans(data.loans);
        } catch (error) {
          console.error("Error fetching loan data:", error);
        }
      }
      fetchLoanData();
    } else if (role === "loanOfficer") {
      async function fetchAllLoans() {
        try {
          const response = await fetch(
            "http://localhost:8000/api/v1/loanOfficer/getAllLoans",
            {
              credentials: "include",
            }
          );
          const data = await response.json();
          setLoanApplications(data.data.loans);
        } catch (error) {
          console.error("Error fetching loan applications:", error);
        }
      }
      fetchAllLoans();
    }
  }, [role]);

  const handleApply = () => {
    nav("/applicationForm");
  };

  if (!role)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-xl text-slate-600">Loading...</div>
      </div>
    );

  const handleReviewLoan = (loanId) => {
    nav(`/loan/${loanId}`, { replace: true });
  };

  const LoanCard = ({ loan }) => (
    <div className="w-full p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Loan #{loan._id}
            </h3>
            <p className="text-sm text-slate-600">
              Applied on: {new Date(loan.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-medium
            ${
              loan.loan_status === "Approved"
                ? "bg-green-50 text-green-700"
                : loan.loan_status === "Pending"
                ? "bg-pink-50 text-pink-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {loan.loan_status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-600">Amount Requested</p>
            <p className="text-lg font-semibold text-slate-900">
              ₹{loan.loan_amount?.toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-600">Tenure</p>
            <p className="text-lg font-semibold text-slate-900">{loan.loan_term} months</p>
          </div>
        </div>

        {role === "loanOfficer" && (
          <div className="flex justify-end mt-4">
            <button
              onClick={() => handleReviewLoan(loan._id)}
              className="relative bg-slate-900 text-white px-6 py-2 rounded-lg hover:bg-slate-800 transition"
            >
              Review Application
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Navbar login={false} logout={true} signup={false} dashboard={false} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center space-y-6 mb-16">
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome, {username || "Loading..."}
            </h1>
            {role === "applicant" && (
              <div className="relative group inline-block">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-pink-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition"></div>
                <button
                  onClick={handleApply}
                  className="relative bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition"
                >
                  Apply for New Loan
                </button>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              {role === "applicant" ? "Your Loans" : "Loan Applications"}
            </h2>

            <div className="grid gap-6">
              {(role === "applicant" ? appliedLoans : loanApplications)
                ?.length > 0 ? (
                (role === "applicant" ? appliedLoans : loanApplications).map(
                  (loan, index) => <LoanCard key={index} loan={loan} />
                )
              ) : (
                <div className="text-center py-12">
                  <p className="text-xl text-slate-600">
                    No {role === "applicant" ? "loans" : "loan applications"} found.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;