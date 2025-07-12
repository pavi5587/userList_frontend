import React, { useEffect, useState } from "react";
import {
  Layout,
  Button,
  Tooltip,
  Table,
  Pagination,
  Card,
  Row,
  Col,
  Typography,
  Input,
  Tabs,
  Modal,
  Form,
  Space,
  Popconfirm,
} from "antd";
import {
  LogoutOutlined,
  TableOutlined,
  UnorderedListOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import "../../css/user.css";
import UserForm from "../../components/userForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  searchUser,
  deleteUser,
} from "../../redux/actions/userActions";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const token = localStorage.getItem("token");

const { Search } = Input;

const { TabPane } = Tabs;

const { Title, Text } = Typography;
const { Header, Content } = Layout;

const pageSize = 10;

const UserList = () => {
  const dispatch = useDispatch();
  const { users, totalUsers } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [editData, setEditData] = useState([]);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const showModalCreateUser = () => setIsCreateUserModalOpen(true);
  const handleCancelCreateUser = () => setIsCreateUserModalOpen(false);

  const showModalEditUser = () => setIsEditUserModalOpen(true);
  const handleCancelEditUser = () => setIsEditUserModalOpen(false);

  console.log("currentPage:", currentPage);
  console.log("pageSize:", pageSize);
  console.log(
    "slice indexes:",
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const paginatedData = users.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  console.log("paginatedData", paginatedData);

  const handlePageChange = (page) => {
    console.log("page", page);

    setCurrentPage(page);
  };

  const onSearch = (value) => {
    if (value.trim() === "") {
      dispatch(getAllUsers(currentPage, pageSize));
    } else {
      dispatch(searchUser(value));
    }
  };

  const handleDelete = async (key) => {
    console.log("key", key);
    dispatch(
      deleteUser(key._id, toast, () =>
        dispatch(getAllUsers(currentPage, pageSize))
      )
    );
  };

  const columns = [
    {
      title: "",
      dataIndex: "images",
      key: "images",
      render: (images) => {
        return images ? (
          <img src={images} alt="Profile" className="table-image" />
        ) : (
          <span>No Image</span>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setEditData(record);
              showModalEditUser();
            }}
          >
            Edit
          </Button>

          <Button
            type="primary"
            className="cancel-button"
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const getUserData = () => dispatch(getAllUsers(currentPage, pageSize));

  useEffect(() => {
    getUserData();
  }, [currentPage]);

  return (
    <div>
      <Layout>
        <Header>
          <div className="header">
            {localStorage.getItem("user")}
            <Tooltip title="Logout">
              <Button
                type="text"
                icon={<LogoutOutlined className="logout-button" />}
                onClick={() => {
                  navigate("/login");
                }}
              />
            </Tooltip>
          </div>
        </Header>

        <Content className="content">
          <Card className="card">
            <Row gutter={5}>
              <Col span={15}>
                <Title level={4} style={{ margin: 0 }}>
                  Users
                </Title>
              </Col>
              <Col span={9}>
                <Search
                  placeholder="Search name"
                  onSearch={onSearch}
                  allowClear
                  enterButton={
                    <Button
                      type="primary"
                      icon={<SearchOutlined />}
                      className="search-button"
                    />
                  }
                  className="search"
                />
                <Button
                  type="primary"
                  className="create-user"
                  onClick={showModalCreateUser}
                >
                  Create User
                </Button>
                <Modal
                  title="Create New User"
                  open={isCreateUserModalOpen}
                  footer={null}
                  onCancel={handleCancelCreateUser}
                >
                  <UserForm
                    type="add"
                    handleCancelUser={handleCancelCreateUser}
                    getUserData={getUserData}
                  />
                </Modal>
              </Col>
            </Row>
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <TableOutlined />
                    &nbsp;Table
                  </span>
                }
                key="1"
              >
                <Table
                  columns={columns}
                  dataSource={users}
                  pagination={false}
                  size="small"
                  scroll={{ y: 240 }}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <UnorderedListOutlined />
                    &nbsp;Card
                  </span>
                }
                key="2"
              >
                <div className="scroll-row-wrapper">
                  <Row gutter={16} className="user-card">
                    {users?.map((val) => {
                      return (
                        <Col span={8}>
                          <Card className="card-body-style hover-card">
                            <div className="card-user">
                              <img
                                src={val?.images}
                                alt="Profile"
                                className="card-image"
                              />
                              <Title level={4} className="user-title">
                                {val?.firstName}
                              </Title>
                              <Text className="user-title">{val?.email}</Text>
                            </div>
                            <div className="hover-overlay">
                              <div className="icon-wrapper card-hover-icons">
                                <EditOutlined
                                  className="overlay-icon icon-edit"
                                  onClick={() => {
                                    setEditData(val);
                                    showModalEditUser();
                                  }}
                                />
                                <DeleteOutlined
                                  className="overlay-icon icon-delete"
                                  onClick={() => handleDelete(val)}
                                />
                              </div>
                            </div>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Content>
        <div className="pagination">
          {users?.length > 0 && (
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalUsers}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          )}
        </div>
      </Layout>
      <Modal
        title="Edit User"
        open={isEditUserModalOpen}
        footer={null}
        onCancel={handleCancelEditUser}
      >
        <UserForm
          type={"edit"}
          editData={editData}
          handleCancelUser={handleCancelEditUser}
          getUserData={getUserData}
        />
      </Modal>
    </div>
  );
};

export default UserList;
