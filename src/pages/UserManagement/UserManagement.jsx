import { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Pagination, Spin, Table, Space, Popconfirm } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { quanLyUser } from '../../services/quanLyUser'; // Giả sử bạn có service này để gọi API

const UserManagement = () => {
  const [userList, setUserList] = useState([]); // Danh sách người dùng hiện tại
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [editingUser, setEditingUser] = useState(null); // Người dùng đang được chỉnh sửa (nếu có)
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading cho các thao tác
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số lượng phần tử trên mỗi trang
  const [totalUsers, setTotalUsers] = useState(0); // Tổng số người dùng
  const [userData, setUserData] = useState(null); // State để lưu trữ dữ liệu từ API
  const [searchKeyword, setSearchKeyword] = useState(''); // Từ khóa tìm kiếm

  // Hiển thị modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Xử lý khi bấm OK trong modal (nút OK)
  const handleOk = () => {
    setIsModalVisible(false);
  };

  // Xử lý khi bấm cancel trong modal (nút Cancel)
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

  // Hàm gọi API để lấy danh sách người dùng theo trang và từ khóa tìm kiếm
  useEffect(() => {
    const fetchUsers = () => {
      setIsLoading(true);
      quanLyUser
        .phanTrang(currentPage, pageSize, searchKeyword) // Thêm searchKeyword vào tham số gọi API
        .then((response) => {
          setUserList(response.data.content); // Giả sử response.data.content chứa danh sách người dùng
          setTotalUsers(response.data.totalElements); // Giả sử response.data.totalElements chứa tổng số người dùng
        })
        .catch((error) => {
          console.error('Error fetching users:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };

    fetchUsers();
  }, [currentPage, pageSize, searchKeyword]);

  // Hàm xử lý khi thay đổi trang
  const onChange = (page) => {
    setCurrentPage(page);
  };

  // Hàm xử lý khi thay đổi kích thước trang
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi pageSize
  };

  // Xử lý khi hoàn tất form
  const onFinish = (values) => {
    // Sửa người dùng
    if (editingUser) {
      quanLyUser
        .suaNguoiDung(editingUser.id, values)
        .then((response) => {
          console.log('User updated:', response);
          setCurrentPage(1); // Reset về trang 1 để lấy dữ liệu mới
        })
        .then(() => {
          setIsModalVisible(false);
          setEditingUser(null);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {

      // Thêm người dùng mới
      quanLyUser
        .themNguoiDung(values)
        .then((response) => {
          console.log('User added:', response);
          setCurrentPage(1); // Reset về trang 1 để lấy dữ liệu mới
        })
        .then(() => {
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  // Xử lý khi bấm nút chỉnh sửa người dùng (hiện modal lên)
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  // Xử lý khi bấm nút xóa người dùng
  const handleDelete = (id) => {
    setIsLoading(true);

    quanLyUser
      .xoaNguoiDung(id)
      .then((response) => {
        console.log('User deleted:', response);
        // setCurrentPage(1); // Reset về trang 1 để lấy dữ liệu mới
        
      })
      .catch((error) => {
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Xử lý tìm kiếm
  const handleSearch = (value) => {
    setSearchKeyword(value);
    setCurrentPage(1); // Reset về trang 1 khi thực hiện tìm kiếm
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await quanLyUser.timNguoiDung(); // Gọi API
        setUserData(response.data.content); // Lưu dữ liệu từ API vào state
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData(); // Gọi hàm fetchUserData khi component được mount
  }, []); // Chỉ gọi lại useEffect khi data thay đổi

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc muốn xóa người dùng này?',
      icon: <ExclamationCircleOutlined />,
      okText: 'Đồng ý',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk() {
        handleDelete(id);
      },
    });
  };

  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      key: 'id',
      className: 'bg-gradient-to-r from-pink-500 to-yellow-500 transition duration-500 ease-in-out',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      className: 'bg-gradient-to-r from-pink-500 to-yellow-500 transition duration-500 ease-in-out',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'bg-gradient-to-r from-pink-500 to-yellow-500 transition duration-500 ease-in-out',
    },
    {
      title: 'Hành động',
      key: 'action',
      className: 'bg-gradient-to-r from-pink-500 to-yellow-500 transition duration-500 ease-in-out',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" className="hover:bg-blue-700" onClick={() => handleEdit(record)}>
            <i className="fas fa-edit"></i> Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => showDeleteConfirm(record.id)}
            okText="Đồng ý"
            cancelText="Hủy"
            disabled={isLoading}
          >
            <Button type="danger" className="hover:bg-red-700" disabled={isLoading} >
              <i className="fas fa-trash-alt"></i> Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mx-1">
        Dashboard{' '}
        <i style={{ color: '#F08080' }} className="fa-solid fa-arrow-right"></i>
        <span style={{ color: '#F08080' }}> Quản lý Người Dùng</span>
      </div>
      <div className="flex justify-between">
        <Button
          style={{ backgroundColor: '#F08080', marginTop: '20px' }}
          onClick={showModal}
        >
          <i className="fa-solid fa-user-plus"></i>
          Thêm thành viên
        </Button>
        <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden w-80">
          <Input.Search
            placeholder="Tìm kiếm..."
            enterButton={<i className="fa-solid fa-magnifying-glass"></i>}
            className="ml-3 py-1 px-2 leading-tight focus:outline-none"
            onSearch={handleSearch} // Cập nhật xử lý khi người dùng tìm kiếm
            // value={searchKeyword} // Sử dụng searchKeyword làm giá trị của input
          />
        </div>
      </div>

      <Modal
        title={editingUser ? "Sửa thông tin thành viên" : "Thêm thành viên mới"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="add_member"
          onFinish={onFinish}
          layout="vertical"
          initialValues={editingUser || {}}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[
              { required: true, message: 'Vui lòng nhập tên thành viên!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
            ]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[
              { required: true, message: 'Vui lòng nhập tài khoản!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại!' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUser ? "Lưu" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="overflow-x-auto mt-10">
        <Table
          dataSource={userList}
          columns={columns}
          pagination={false}
          loading={isLoading}
        />

        <div className="flex justify-center w-full">
          {isLoading ? (
            <Spin tip="Loading..." />
          ) : (
            <Pagination
              showQuickJumper
              current={currentPage}
              total={totalUsers}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
              pageSizeOptions={['5', '10', '20', '50']}
              pageSize={pageSize}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
