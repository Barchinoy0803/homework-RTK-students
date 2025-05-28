import { useDeleteUserMutation, useGetUsersQuery } from "../redux/api/user.api";
import { Button, Popconfirm, Skeleton, Table } from "antd";
import type { TableProps } from "antd";
import { useCallback, useState } from "react";
import ModalWrapper from "../components/model/Modal";
import { IoTrashOutline } from "react-icons/io5";
import { FiEdit3 } from "react-icons/fi";

export interface DataType {
  id: string;
  name: string;
  age: string;
  createdAt: string;
  phone: string
}


const Home = () => {
  const [updateUser, setUpdateUser] = useState<DataType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetUsersQuery({});
  const [deleteUser, { }] = useDeleteUserMutation()

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
    setUpdateUser(null)
  }, []);

  const handleUpdateUser = (user: DataType) => {
    setUpdateUser(user)
    showModal()
  }

  const handleDelete = async (id: string) => {
    await deleteUser(id).unwrap()
  }

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Action",
      key: "action",
      render: (user) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Deelet this user"
            description="Are you sure?"
            onConfirm={() => handleDelete(user.id)}
            okText="Delete"
            cancelText="Cancel"
          >
            <Button><IoTrashOutline /></Button>
          </Popconfirm>
          <Button onClick={() => handleUpdateUser(user)}><FiEdit3 /></Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="container mx-auto">
        <div className="flex justify-between items-center my-6">
          <h2>Students</h2>
          <Button onClick={showModal}>Add Student</Button>
        </div>
        {isLoading ? (
          <Skeleton active />
        ) : (
          <Table<DataType> rowKey={"id"} columns={columns} dataSource={data} />
        )}
      </div>

      {isModalOpen && (
        <ModalWrapper isModalOpen={isModalOpen} handleCancel={handleCancel} updateUser={updateUser} />
      )}
    </div>
  );
};

export default Home;
