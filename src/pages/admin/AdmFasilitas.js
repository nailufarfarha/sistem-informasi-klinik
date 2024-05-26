import React from "react";
import Sidebar from "../../components/Sidebar";
import Profile from "../../components/Profile";
import Table from "react-bootstrap/Table";

function AdmFasilitas() {
  return (
    <div>
      <Sidebar />
      <Profile />
      <div className="content-fasilitas">
        <button className="btn-add">Tambah Fasilitas</button>
        <div className="content-fasilitas-data">
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AdmFasilitas;
