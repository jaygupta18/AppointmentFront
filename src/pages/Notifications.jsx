import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/notification.css";
import Empty from "../components/Empty";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import Loading from "../components/Loading";
import "../styles/user.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const getAllNotif = async (e) => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/notification/getallnotifs`);
      dispatch(setLoading(false));
      setNotifications(temp);
    } catch (error) {}
  };

  useEffect(() => {
    getAllNotif();
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (    
        <section className="container notif-section">
          <h2 className="page-heading">Your Notifications</h2>

          {notifications.length > 0 ? (
            <div className="notifications">
             <table className="notif-table">
  <thead>
    <tr>
      <th className="notif-th">S.No</th>
      <th className="notif-th">Content</th>
      <th className="notif-th">Date</th>
      <th className="notif-th">Time</th>
    </tr>
  </thead>
  <tbody className="tri"> 
    {notifications?.map((ele, i) => {
      return (
        <tr key={ele?._id}>
          <td className="notif-td">{i + 1}</td>
          <td className="notif-td">{ele?.content}</td>
          <td className="notif-td">{ele?.updatedAt.split("T")[0]}</td>
          <td className="notif-td">{ele?.updatedAt.split("T")[1].split(".")[0]}</td>
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

export default Notifications;
