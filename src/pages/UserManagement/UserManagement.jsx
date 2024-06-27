import { useEffect, useState } from 'react';
import './userManager.scss';
import {
  Button,
  Modal,
  Form,
  Input,
  Pagination,
  Spin,
  Table,
  Space,
  Popconfirm,
} from 'antd';
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import { quanLyUser } from '../../services/quanLyUser'; // Giả sử bạn có service này để gọi API
import { notification } from 'antd';

const UserManagement = () => {
  const [userList, setUserList] = useState([]); // Danh sách người dùng hiện tại
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [editingUser, setEditingUser] = useState(null); // Người dùng đang được chỉnh sửa (nếu có)
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading cho các thao tác
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Số lượng phần tử trên mỗi trang
  const [totalUsers, setTotalUsers] = useState(0); // Tổng số người dùng
  // const [userData, setUserData] = useState(null); // State để lưu trữ dữ liệu từ API
  const [searchKeyword, setSearchKeyword] = useState(''); // Từ khóa tìm kiếm
  // console.log(userData);
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

  // Hàm hiển thị thông báo
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  // Hàm lấy dữ liệu người dùng từ API
  const fetchUserData = async (keyword = '') => {
    setIsLoading(true);
    try {
      const response = await quanLyUser.timNguoiDung(keyword);
      const result = response.data.content.map((item, i) => ({
        ...item,
        key: i,
      }));
      setUserList(result);
      setTotalUsers(response.data.content.totalRow);
      openNotificationWithIcon('success', 'tìm thấy người dùng');
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Lấy dữ liệu người dùng khi component được mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Hàm xử lý thay đổi input tìm kiếm
  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearch = () => {
    fetchUserData(searchKeyword);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  };

  // Hàm gọi API để lấy danh sách người dùng theo trang và từ khóa tìm kiếm
  useEffect(() => {
    const fetchUsers = () => {
      setIsLoading(true);
      quanLyUser
        .phanTrang(currentPage, pageSize, searchKeyword) // Thêm searchKeyword vào tham số gọi API
        .then((response) => {
          const result = response.data.content.data.map((item, i) => {
            return {
              ...item,
              key: i,
            };
          });
          setUserList(result); // Giả sử response.data.content chứa danh sách người dùng
          setTotalUsers(response.data.content.totalRow); // Giả sử response.data.totalElements chứa tổng số người dùng
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
  const onChange = (page, pageSize) => {
    setPageSize(pageSize);
    setCurrentPage(page);
  };

  // Hàm xử lý khi thay đổi kích thước trang
  const onShowSizeChange = (current, size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi pageSize
  };

  // Xử lý khi gửi form thêm/chỉnh sửa người dùng
  const onFinish = (values) => {
    // Sửa người dùng
    if (editingUser) {
      quanLyUser
        .suaNguoiDung(editingUser.id, values)
        .then((response) => {
          console.log('User updated:', response);
          setCurrentPage(1); // Reset về trang 1 để lấy dữ liệu mới
          openNotificationWithIcon(
            'success',
            'Thành công',
            'Người dùng đã được cập nhật'
          );
        })
        .then(() => {
          setIsModalVisible(false);
          setEditingUser(null);
        })
        .catch((error) => {
          console.error('Error:', error);
          openNotificationWithIcon(
            'error',
            'Lỗi',
            'Cập nhật người dùng thất bại'
          );
        });
    } else {
      // Thêm người dùng mới
      quanLyUser
        .themNguoiDung(values)
        .then((response) => {
          console.log('User added:', response);
          setCurrentPage(1); // Reset về trang 1 để lấy dữ liệu mới
          openNotificationWithIcon(
            'success',
            'Thành công',
            'Người dùng đã được thêm'
          );
        })
        .then(() => {
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          openNotificationWithIcon('error', 'Lỗi', 'Thêm người dùng thất bại');
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
        openNotificationWithIcon(
          'success',
          'Thành công',
          'Người dùng đã được xóa'
        );
        setCurrentPage(1); // Reset về trang 1 để lấy dữ liệu mới
      })
      .catch((error) => {
        console.error('Error:', error);
        openNotificationWithIcon('error', 'Lỗi', 'Xóa người dùng thất bại');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Định nghĩa các cột của bảng
  const columns = [
    {
      title: 'Mã số',
      dataIndex: 'id',
      key: 'id',
      className: 'bg-gray-300',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      className: 'bg-gray-300',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      className: 'bg-gray-300',
    },
    {
      title: 'Hành động',
      key: 'action',
      className: 'bg-gray-300 sm:w-16',
     
    
      render: (text, record) => (
        <Space size="middle" className="text-center">
        <div className="flex justify-center items-center space-x-2">
          <Button
            type="primary"
            className="hover:bg-blue-700"
            onClick={() => handleEdit(record)}
          >
            <i className="fas fa-edit"></i> Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Đồng ý"
            cancelText="Hủy"
            disabled={isLoading}
          >
            <Button
              type="danger"
              className="bg-red-500 hover:bg-red-700"
              disabled={isLoading}
            >
              <i className="fas fa-trash-alt"></i> Xóa
            </Button>
          </Popconfirm>
        </div>
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
    <div className="flex flex-col lg:flex-row lg:justify-between">
  <Button
    style={{ backgroundColor: '#F08080', marginTop: '20px' }}
    onClick={showModal}
    // className="flex items-center px-3 py-2 rounded-lg text-black lg:mt-0"
  >
    <i className="fas fa-user-plus mr-2"></i>
    Thêm thành viên
  </Button>
  <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden w-full lg:w-80 mt-3 lg:mt-0 lg:ml-3">
    <Input.Search
      placeholder="Tìm kiếm..."
      enterButton={<i className="fas fa-search"></i>}
      className="py-1 px-2 leading-tight focus:outline-none w-full"
      onSearch={handleSearch}
      onChange={handleSearchInputChange}
      value={searchKeyword}
    />
  </div>
</div>


      <Modal
        title={editingUser ? 'Sửa thông tin thành viên' : 'Thêm thành viên mới'}
        open={isModalVisible}
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
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="Tài khoản"
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]}
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
              {editingUser ? 'Lưu' : 'Thêm'}
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
            <>
              {/* <Spin tip="Loading..." /> */}
              <Spin />
            </>
          ) : (
            <Pagination
              current={currentPage}
              total={totalUsers}
              onChange={onChange}
              onShowSizeChange={onShowSizeChange}
              showTotal={(total, range) =>
                `${range[0]}-${range[1]} of ${total} items`
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
