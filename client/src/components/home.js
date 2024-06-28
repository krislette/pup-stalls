import React, { useEffect, useState } from "react";
import Axios from "axios";

function Home() {
  const [adminCount, setAdminCount] = useState();
  const [itemCount, setItemCount] = useState();
  const [salary, setSalary] = useState();

  useEffect(() => {
    const ownerID = localStorage.getItem("ownerID");

    // Axios.get("http://localhost:3001/adminCount")
    //   .then(res => {
    //       setAdminCount(res.data[0].admin);
    //   }).catch(error => console.log(error));

    // ! Edit the code to make count 0 if db has no count
    Axios
      .get(`http://localhost:3001/items/count/${ownerID}`)
      .then(res => {
        const count = res.data.count || 0; // Use 0 if count is undefined or null
        setItemCount(count);
      }).catch(error => console.log(error));

    // Axios.get('http://localhost:3001/salary')
    //   .then(res => {
    //       setSalary(res.data[0].sumOfSalary);
    //   }).catch(error => console.log(error));

  }, []);

  return (
    <div>
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Admin</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {adminCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Items</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {itemCount}</h5>
          </div>
        </div>
        <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Salary</h4>
          </div>
          <hr />
          <div>
            <h5>Total: {salary}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;