import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Table, Popconfirm, Space, Upload, Checkbox } from 'antd';
// Make sure to import your http instance
import { quanLyPhong } from '../../services/quanLyPhong';
// import { UploadOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UploadOutlined } from "@ant-design/icons";
const RoomManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading cho các thao tác
    const [editingUser, setEditingUser] = useState(null); // Người dùng đang được chỉnh sửa (nếu có)
    const [imageUrl, setImageUrl] = useState(null); // State để lưu đường dẫn hình ảnh upload
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await quanLyPhong.layDanhSachPhong();
                setRooms(response.data.content);
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

  

          // Xử lý khi bấm nút chỉnh sửa người dùng (hiện modal lên)
  const handleEdit = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

   // Xử lý khi hoàn tất form
   const onFinish = (values) => {
    // Sửa người dùng
    if (editingUser) {
      quanLyPhong
        .suaViTri(editingUser.id, values)
        .then((response) => {
          console.log('User updated:', response);
          // fetchUsers(currentPage, pageSize); // Cập nhật danh sách người dùng
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
      quanLyPhong
        .themViTri(values)
        .then((response) => {
          console.log('User added:', response);
          // fetchUsers(currentPage, pageSize); // Cập nhật danh sách người dùng
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



// Xử lý khi bấm nút xóa người dùng
const handleDelete = (id) => {
  setIsLoading(true);

  quanLyPhong
    .xoaViTri(id)
    .then((response) => {

    console.log('User deleted:', response);
      // fetchUsers(currentPage, pageSize); // Cập nhật danh sách người dùng
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      setIsLoading(false);
    });
};
  
const handleUpload = (info) => {
  if (info.file.status === "done") {
    // Get this url from response in real world.
    setImageUrl(URL.createObjectURL(info.file.originFileObj));
  }
};
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
        { title: 'Mã số', dataIndex: 'id', key: 'id' },
        { title: 'Tên', dataIndex: 'tenPhong', key: 'tenPhong' },
        { title: 'Khách', dataIndex: 'khach', key: 'khach' },
        { title: 'Phòng ngủ', dataIndex: 'phongNgu', key: 'phongNgu' },
        { title: 'Giường', dataIndex: 'giuong', key: 'giuong' },
        { title: 'Phòng tắm', dataIndex: 'phongTam', key: 'phongTam' },
        { title: 'Mô tả', dataIndex: 'moTa', key: 'moTa' },
        { title: 'Giá tiền', dataIndex: 'giaTien', key: 'giaTien' },
        // { title: 'Máy giặt', dataIndex: 'mayGiat', key: 'mayGiat' },
        // { title: 'Bàn là', dataIndex: 'banLa', key: 'banLa' },
        // { title: 'TiVi', dataIndex: 'tiVi', key: 'tiVi' },
        // { title: 'Điều hòa', dataIndex: 'dieuHoa', key: 'dieuHoa' },
        // { title: 'Wifi', dataIndex: 'wifi', key: 'wifi' },
        // { title: 'Bếp', dataIndex: 'bep', key: 'bep' },
        // { title: 'Đỗ xe', dataIndex: 'doXe', key: 'doXe' },
        // { title: 'Hồ bơi', dataIndex: 'hoBoi', key: 'hoBoi' },
        // { title: 'Bàn ủi', dataIndex: 'banUi', key: 'banUi' },
        { title: 'Mã vị trí', dataIndex: 'maViTri', key: 'maViTri' },
        { 
            title: 'Hình ảnh', 
            dataIndex: 'hinhAnh', 
            key: 'hinhAnh',
            render: (text) => <img src={text} alt="Hình ảnh" className="w-16 h-16" />
        },
        {
          title: 'Hành động',
          key: 'action',
          className: 'bg-gradient-to-r from-pink-500 to-yellow-500 transition duration-500 ease-in-outt',
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
                <Button type="danger" className="hover:bg-red-700" disabled={isLoading}>
                  <i className="fas fa-trash-alt"></i> Xóa
                </Button>
              </Popconfirm>
            </Space>
          ),
        },
    ];

    return (
        <div>
            <div className='mx-1'>
                Dashboard <i style={{ color: '#F08080' }} className="fa-solid fa-arrow-right"></i><span style={{ color: '#F08080' }}> Quản lý Thông Tin Phòng</span>
            </div>
            <div className='flex justify-between'>
                <Button style={{ backgroundColor: '#F08080', marginTop: '20px' }} onClick={showModal}>
                    <i className="fa-solid fa-restroom"></i>
                    Thêm phòng
                </Button>
                <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden w-80">
                    <input
                        className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        placeholder="Search..."
                        aria-label="Full name"
                    />
                    <button className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </div>

            <Modal title="Thêm thành viên mới" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    name="add_member"
                    onFinish={onFinish}
                    layout="vertical"
                >
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
            rules={[{ required: true, message: 'Vui lòng nhập số lượng khách!' }]}
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
          <Form.Item
            name="mayGiat"
            valuePropName="checked"
          >
          
            <Checkbox>Máy giặt</Checkbox>
          </Form.Item>
          <Form.Item
            name="banLa"
            valuePropName="checked"
          >
            <Checkbox>Bàn là</Checkbox>
          </Form.Item>
          <Form.Item
            name="tivi"
            valuePropName="checked"
          >
            <Checkbox>TV</Checkbox>
          </Form.Item>
          <Form.Item
            name="dieuHoa"
            valuePropName="checked"
          >
            <Checkbox>Điều hòa</Checkbox>
          </Form.Item>
          <Form.Item
            name="wifi"
            valuePropName="checked"
          >
            <Checkbox>WiFi</Checkbox>
          </Form.Item>
          <Form.Item
            name="bep"
            valuePropName="checked"
          >
            <Checkbox>Bếp</Checkbox>
          </Form.Item>
          <Form.Item
            name="doXe"
            valuePropName="checked"
          >
            <Checkbox>Đỗ xe</Checkbox>
          </Form.Item>
          <Form.Item
            name="hoBoi"
            valuePropName="checked"
          >
            <Checkbox>Hồ bơi</Checkbox>
            
          </Form.Item>
          
          <Form.Item
            name="banUi"
            valuePropName="checked"
          >
            <Checkbox>Bàn ủi</Checkbox>
          </Form.Item>
          
          <Form.Item
            label="Mã vị trí"
            name="maViTri"
            rules={[{ required: true, message: 'Vui lòng nhập mã vị trí!' }]}
          />
            <Input type="number" />

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
                            Thêm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <div className="overflow-x-auto mt-10">
                <Table columns={columns} dataSource={rooms} rowKey="id" loading={isLoading} />
            </div>
        </div>
    );
};

export default RoomManagement;
