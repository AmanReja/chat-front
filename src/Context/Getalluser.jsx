import React, { useState, useEffect } from "react";
import cookies from "js-cookie";
import axios from "axios";

function Getalluser() {
  const [alluser, setAlluser] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const getallusers = async () => {
      try {
        setLoad(true);
        const token = cookies.get("jwt");
        const response = await axios.get(`/api/user/getuserprofile`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAlluser(response.data);
        setLoad(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoad(false);
      }
    };
    getallusers();
  }, []);

  return [alluser, load];
}

export default Getalluser;
