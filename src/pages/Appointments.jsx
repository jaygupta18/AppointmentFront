import React, { useEffect, useState } from "react";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast"; 
import "../styles/user.css"; 

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));

  const getAllAppoint = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(
        `/appointment/getallappointments?search=${userId}`
      );
      console.log(temp);
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: ele?._id,
            doctorId: ele?.doctorId?._id,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };
     
  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="container notif-section">
          <h2 className="page-heading">Your Appointments</h2>

          {appointments.length > 0 ? (
            <div className="appointments"> 
<table className="appointments-table" style={{ backgroundColor: 'white', color: 'white' }}>
  <thead> 
    <tr className ="row" style={{border:"1px solid white"}}>
      <th className="appointments-th" style={{ backgroundColor: 'black', color: 'white', }}>S.No</th>
      <th className="appointments-th" style={{ backgroundColor: 'black', color: 'white' }}>Doctor</th>
      <th className="appointments-th" style={{ backgroundColor: 'black', color: 'white' }}>Patient</th>
      <th className="appointments-th" style={{ backgroundColor: 'black', color: 'white' }}>Appointment Date</th>
      <th className="appointments-th" style={{ backgroundColor: 'black', color: 'white' }}>Appointment Time</th>
      <th className="appointments-th" style={{ backgroundColor: 'black', color: 'white' }}>Booking Date</th>
      <th className="appointments-th" style={{ backgroundColor: 'black', color: 'white' }}>Booking Time</th>
      <th className="appointments-th" style={{ backgroundColor: 'black', color: 'white' }}>Status</th>
      {userId === appointments[0].doctorId?._id ? (
        <th className="appointments-th" style={{ backgroundColor: 'black', color: 'white' }}>Action</th>
      ) : ( 
        <></>
      )}
    </tr>
  </thead>  
  <tbody> 
    {appointments?.map((ele, i) => {
      return (
        <tr key={ele?._id}>
          <td className="appointments-td" style={{ backgroundColor: 'black', color: 'white' }}>{i + 1}</td>
          <td className="appointments-td" style={{ backgroundColor: 'black', color: 'white' }}>
            {ele?.doctorId?.firstname + " " + ele?.doctorId?.lastname}
          </td> 
          <td className="appointments-td" style={{ backgroundColor: 'black', color: 'white' }}>
            {ele?.userId?.firstname + " " + ele?.userId?.lastname}
          </td> 
          <td className="appointments-td" style={{ backgroundColor: 'black', color: 'white' }}>{ele?.date}</td>
          <td className="appointments-td" style={{ backgroundColor: 'black', color: 'white' }}>{ele?.time}</td>
          <td className="appointments-td" style={{ backgroundColor: 'black', color: 'white' }}>{ele?.createdAt.split("T")[0]}</td>
          <td className="appointments-td" style={{ backgroundColor: 'black', color: 'white' }}>{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
          <td className="appointments-td" style={{ backgroundColor: 'black', color: 'white' }}>{ele?.status}</td>
          {userId === ele?.doctorId?._id ? ( 
            <td className="appointments-td" style={{ backgroundColor: 'black', color: 'white' }}>
              <button
                className={`btn user-btn accept-btn ${
                  ele?.status === "Completed" ? "disable-btn" : ""
                }`}
                disabled={ele?.status === "Completed"}
                onClick={() => complete(ele)}
              >
                Complete 
              </button>
            </td>
          ) : ( 
            <></>
          )}
        </tr>
      ); 
    })}
   </tbody>
  </table>
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
      <Footer />
    </>
  );
}; 
export default Appointments; 
  