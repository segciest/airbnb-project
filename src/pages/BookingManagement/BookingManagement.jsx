import { Button, Form, Input, Modal, Popconfirm, Space, Table } from 'antd';
import { useEffect, useState } from 'react';

import { quanLyDatPhong } from '../../services/quanLyDatPhong';
import { notification } from 'antd';

const BookingManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State để quản lý hiển thị modal thêm/sửa đặt phòng
  const [bookings, setBookings] = useState([]); // State để lưu danh sách đặt phòng
  const [editingBooking, setEditingBooking] = useState(null); // State để lưu thông tin đặt phòng đang được chỉnh sửa
  const [isLoading, setIsLoading] = useState(false); // State để theo dõi trạng thái loading khi tương tác với server
  const [searchKeyword, setSearchKeyword] = useState(''); // Từ khóa tìm kiếm
  const [form] = Form.useForm();

  // Hook useEffect để fetch danh sách đặt phòng từ server khi component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await quanLyDatPhong.layDanhSachDatPhong();
        setBookings(response.data.content);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  // Hàm fetch dữ liệu đặt phòng từ server dựa trên từ khóa tìm kiếm
  const fetchUserData = async (keyword = '') => {
    setIsLoading(true);
    try {
      const response = await quanLyDatPhong.timDatPhong(keyword);
      const result = response.data.content.map((item, i) => ({
        ...item,
        key: i,
      }));
      setBookings(result);
      // setTotalUsers(response.data.content.totalRow);
      openNotificationWithIcon('success', 'tìm thấy người dùng');
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect hook to fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Xử lý thay đổi từ khóa tìm kiếm trên ô input
  const handleSearchInputChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  // Xử lý khi người dùng nhấn nút tìm kiếm
  const handleSearch = () => {
    fetchUserData(searchKeyword);
    // setCurrentPage(1); // Reset to first page when searching
  };

  // Hiển thị modal thêm/sửa đặt phòng
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Hủy bỏ modal thêm/sửa đặt phòng
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingBooking(null);
    form.resetFields();
  };

  // Chỉnh sửa thông tin đặt phòng
  const handleEdit = (booking) => {
    setEditingBooking(booking);
    form.setFieldsValue(booking);
    setIsModalVisible(true);
  };

  // Hàm thông báo với biểu tượng (icon)
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  // Xử lý khi submit form (thêm mới hoặc cập nhật đặt phòng)
  const onFinish = (values) => {
    setIsLoading(true);
    if (editingBooking) {
      // Update booking
      quanLyDatPhong
        .suaDatPhong(editingBooking.id, values)
        .then((response) => {
          const updatedBookings = bookings.map((booking) =>
            booking.id === editingBooking.id ? response.data.content : booking
          );
          setBookings(updatedBookings);
          openNotificationWithIcon(
            'success',
            'Thành công',
            'Đặt phòng đã được cập nhật'
          );
        })
        .finally(() => {
          setIsModalVisible(false);
          setEditingBooking(null);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          openNotificationWithIcon(
            'error',
            'Lỗi',
            'Cập nhật đặt phòng thất bại'
          );
        });
    } else {
      // Add new booking
      quanLyDatPhong
        .themDatPhong(values)
        .then((response) => {
          setBookings([...bookings, response.data.content]);
          openNotificationWithIcon(
            'success',
            'Thành công',
            'Đặt phòng đã được thêm'
          );
        })
        .finally(() => {
          setIsModalVisible(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          openNotificationWithIcon('error', 'Lỗi', 'Thêm đặt phòng thất bại');
        });
    }
  };

  // Xử lý khi người dùng xóa đặt phòng
  const handleDelete = (id) => {
    setIsLoading(true);

    quanLyDatPhong
      .xoaDatPhong(id)
      .then((response) => {
        setBookings(bookings.filter((booking) => booking.id !== id));
        openNotificationWithIcon(
          'success',
          'Thành công',
          'Đặt phòng đã được xóa'
        );
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        openNotificationWithIcon('error', 'Lỗi', 'Xóa đặt phòng thất bại');
      });
  };

  // Các cột dữ liệu cho Table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'bg-gray-300',
    },
    {
      title: 'Mã phòng',
      dataIndex: 'maPhong',
      key: 'maPhong',
      className: 'bg-gray-300',
    },
    {
      title: 'Ngày đến',
      dataIndex: 'ngayDen',
      key: 'ngayDen',
      className: 'bg-gray-300',
    },
    {
      title: 'Ngày đi',
      dataIndex: 'ngayDi',
      key: 'ngayDi',
      className: 'bg-gray-300',
    },
    {
      title: 'Số lượng khách',
      dataIndex: 'soLuongKhach',
      key: 'soLuongKhach',
      className: 'bg-gray-300',
    },
    {
      title: 'Mã người dùng',
      dataIndex: 'maNguoiDung',
      key: 'maNguoiDung',
      className: 'bg-gray-300',
    },
    {
      title: 'Hành động',
      key: 'action',
      className: 'bg-gray-300',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
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
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-700"
            >
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
        <span style={{ color: '#F08080' }}> Quản lý Đặt Phòng</span>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <Button
          style={{ backgroundColor: '#F08080', marginTop: '20px' }}
          onClick={showModal}
        >
          <i className="fa-solid fa-plus"></i>
          Thêm đặt phòng
        </Button>
        <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden w-full lg:w-80 mt-3 lg:mt-0 lg:ml-3">
          <Input.Search
            placeholder="Search..."
            enterButton={<i className="fa-solid fa-magnifying-glass"></i>}
            className="ml-3 py-1 px-2 leading-tight focus:outline-none"
            onSearch={handleSearch}
            onChange={handleSearchInputChange}
            value={searchKeyword}
          />
        </div>
      </div>

      <Modal
        title={editingBooking ? 'Chỉnh sửa đặt phòng' : 'Thêm đặt phòng mới'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="add_booking"
          onFinish={onFinish}
          layout="vertical"
        >
          {/* <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: "Vui lòng nhập id!" }]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Mã phòng"
            name="maPhong"
            rules={[{ required: true, message: 'Vui lòng nhập mã phòng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ngày đến"
            name="ngayDen"
            rules={[{ required: true, message: 'Vui lòng nhập ngày đến!' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Ngày đi"
            name="ngayDi"
            rules={[{ required: true, message: 'Vui lòng nhập ngày đi!' }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="số lượng khách"
            name="soLuongKhach"
            rules={[{ required: true, message: 'Vui lòng nhập ngày đi!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Mã người dùng"
            name="maNguoiDung"
            rules={[
              { required: true, message: 'Vui lòng nhập mã người dùng!' },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingBooking ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="overflow-x-auto mt-10">
        <Table
          dataSource={bookings}
          columns={columns}
          rowKey="id"
          loading={isLoading}
        />
      </div>
    </div>
  );
};

export default BookingManagement;
