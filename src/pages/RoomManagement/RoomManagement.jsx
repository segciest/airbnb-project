import { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Popconfirm,
  Space,
  Upload,
  Checkbox,
} from 'antd';
import { quanLyPhong } from '../../services/quanLyPhong';
import { UploadOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const RoomManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [rooms, setRooms] = useState([]); // Danh sách các phòng
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading
  const [editingUser, setEditingUser] = useState(null); // Thông tin người dùng đang chỉnh sửa
  const [imageUrl, setImageUrl] = useState(null); // Đường dẫn hình ảnh tải lên
  const [form] = Form.useForm(); // Form instance

  // Gọi API để lấy danh sách phòng
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await quanLyPhong.layDanhSachPhong();
        setRooms(response.data.content);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  // Hiển thị modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    form.resetFields();
  };

  // Cập nhật người dùng đang chỉnh sửa
  const handleEdit = (room) => {
    setEditingUser(room);
    setIsModalVisible(true);
  };

  // hiển thị thông báo
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };
  const onFinish = (values) => {
    setIsLoading(true);
    if (editingUser) {
      // Update room
      quanLyPhong
        .suaPhong(editingUser.id, values)
        .then((response) => {
          const updatedRooms = rooms.map((room) =>
            room.id === editingUser.id ? response.data.content : room
          );
          setRooms(updatedRooms);
          openNotificationWithIcon(
            'success',
            'Thành công',
            'Phòng đã được cập nhật'
          );
        })
        .finally(() => {
          setIsModalVisible(false);
          setEditingUser(null);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          openNotificationWithIcon('error', 'Lỗi', 'Cập nhật phòng thất bại');
        });
    } else {
      // Add new room
      quanLyPhong
        .themPhong(values)
        .then((response) => {
          setRooms([...rooms, response.data.content]);
          openNotificationWithIcon(
            'success',
            'Thành công',
            'Phòng đã được thêm'
          );
        })
        .finally(() => {
          setIsModalVisible(false);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error:', error);
          openNotificationWithIcon('error', 'Lỗi', 'Thêm phòng thất bại');
        });
    }
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    quanLyPhong
      .xoaPhong(id)
      .then((response) => {
        setRooms(rooms.filter((room) => room.id !== id));
        openNotificationWithIcon('success', 'Thành công', 'Phòng đã được xóa');
      })
      .finally(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
        openNotificationWithIcon('error', 'Lỗi', 'Xóa phòng thất bại');
      });
  };

  const handleUpload = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  const columns = [
    // { title: 'Mã số', dataIndex: 'id', key: 'id', className:
    //     'bg-gray-300', },
    {
      title: 'Tên',
      dataIndex: 'tenPhong',
      key: 'tenPhong',
      className: 'bg-gray-300',
    },
    {
      title: 'Khách',
      dataIndex: 'khach',
      key: 'khach',
      className: 'bg-gray-300',
    },
    {
      title: 'Phòng ngủ',
      dataIndex: 'phongNgu',
      key: 'phongNgu',
      className: 'bg-gray-300',
    },
    {
      title: 'Giường',
      dataIndex: 'giuong',
      key: 'giuong',
      className: 'bg-gray-300',
    },
    {
      title: 'Phòng tắm',
      dataIndex: 'phongTam',
      key: 'phongTam',
      className: 'bg-gray-300',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      key: 'moTa',
      className: 'bg-gray-300 ',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'giaTien',
      key: 'giaTien',
      className: 'bg-gray-300',
    },
    {
      title: 'Mã vị trí',
      dataIndex: 'maViTri',
      key: 'maViTri',
      className: 'bg-gray-300',
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      key: 'hinhAnh',
      render: (text) => <img src={text} alt="Hình ảnh" className="w-16 h-16" />,
      className: 'bg-gray-300',
    },
    {
      title: 'Hành động',
      key: 'action',
      className: 'bg-gray-300',
      render: (text, record) => (
        <Space size="middle">
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
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mx-1">
        Dashboard{' '}
        <i style={{ color: '#F08080' }} className="fa-solid fa-arrow-right"></i>
        <span style={{ color: '#F08080' }}> Quản lý Thông Tin Phòng</span>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <Button
          style={{ backgroundColor: '#F08080', marginTop: '20px' }}
          onClick={showModal}
        >
          <i className="fa-solid fa-restroom"></i>
          Thêm phòng
        </Button>
        <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden w-full lg:w-80 mt-3 lg:mt-0 lg:ml-3">
          <Input.Search
            placeholder="Search..."
            enterButton={<i className="fa-solid fa-magnifying-glass"></i>}
            className="py-1 px-2 leading-tight focus:outline-none w-full"
          />
        </div>
      </div>

      <Modal
        title={editingUser ? 'Chỉnh sửa phòng' : 'Thêm phòng mới'}
        visible={isModalVisible}
        onCancel={handleCancel}
        // footer={null}
      >
        <Form form={form} name="add_room" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Tên phòng"
            name="tenPhong"
            rules={[{ required: true, message: 'Vui lòng nhập tên phòng!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Khách"
            name="khach"
            rules={[
              { required: true, message: 'Vui lòng nhập số lượng khách!' },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Phòng ngủ"
            name="phongNgu"
            rules={[{ required: true, message: 'Vui lòng nhập số phòng ngủ!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Giường"
            name="giuong"
            rules={[{ required: true, message: 'Vui lòng nhập số giường!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Phòng tắm"
            name="phongTam"
            rules={[{ required: true, message: 'Vui lòng nhập số phòng tắm!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="moTa"
            rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            label="Giá tiền"
            name="giaTien"
            rules={[{ required: true, message: 'Vui lòng nhập giá tiền!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="mayGiat" valuePropName="checked">
            <Checkbox>Máy giặt</Checkbox>
          </Form.Item>
          <Form.Item name="banLa" valuePropName="checked">
            <Checkbox>Bàn là</Checkbox>
          </Form.Item>
          <Form.Item name="tivi" valuePropName="checked">
            <Checkbox>TV</Checkbox>
          </Form.Item>
          <Form.Item name="dieuHoa" valuePropName="checked">
            <Checkbox>Điều hòa</Checkbox>
          </Form.Item>
          <Form.Item name="wifi" valuePropName="checked">
            <Checkbox>WiFi</Checkbox>
          </Form.Item>
          <Form.Item name="bep" valuePropName="checked">
            <Checkbox>Bếp</Checkbox>
          </Form.Item>
          <Form.Item name="doXe" valuePropName="checked">
            <Checkbox>Đỗ xe</Checkbox>
          </Form.Item>
          <Form.Item name="hoBoi" valuePropName="checked">
            <Checkbox>Hồ bơi</Checkbox>
          </Form.Item>
          <Form.Item name="banUi" valuePropName="checked">
            <Checkbox>Bàn ủi</Checkbox>
          </Form.Item>
          <Form.Item
            label="Mã vị trí"
            name="maViTri"
            rules={[{ required: true, message: 'Vui lòng nhập mã vị trí!' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Hình ảnh"
            name="hinhAnh"
            valuePropName="fileList"
            getValueFromEvent={handleUpload}
          >
            <Upload
              name="logo"
              listType="picture"
              beforeUpload={() => false}
              onChange={handleUpload}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingUser ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="overflow-x-auto mt-10">
        <Table
          columns={columns}
          dataSource={rooms}
          rowKey="id"
          loading={isLoading}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
};

export default RoomManagement;
