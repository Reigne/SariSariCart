import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { message, Button, Image } from "antd";

export default function CategoryList({ categories }) {
  //   const [categories, setCategories] = useState([]);

  const imageBodyTemplate = (rowData) => {
    return (
      <Image
        src={rowData?.image?.url}
        alt={rowData.name}
        className="rounded"
        style={{ width: "50px", height: "auto" }}
      />
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex flex-row gap-2">
        <Button
          type="primary"
          // onClick={() => toggleUpdate(rowData._id)}
        >
          Edit
        </Button>
        <Button
          danger
          // onClick={() => deleteHandler(rowData._id)}
        >
          Delete
        </Button>
      </div>
    );
  };

  return (
    <div className="bg-white rounded p-4">
      <div className="card">
        <DataTable
          value={categories}
          tableStyle={{ minWidth: "50rem" }}
          className="p-datatable-striped"
          stripedRows
          paginator
          rows={8}
          rowsPerPageOptions={[8, 25, 50]}
          emptyMessage="No categories found."
        >
          {/* <Column field="_id" header="I.D"></Column> */}
          <Column
            field="name"
            header="Name"
            style={{ minWidth: "30rem" }}
          ></Column>
          {/* <Column field="createdAt" header="Created At"></Column> */}
          <Column
            field="image"
            header="Image"
            body={imageBodyTemplate}
            style={{ minWidth: "10rem" }}
          ></Column>
          <Column
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "10rem" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
