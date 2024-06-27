import { Button, Form, Input, Modal, Popconfirm, Space, Table, Upload } from "antd";
import { quanLyViTri } from "../../services/quanLyViTri";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
// import { ExclamationCircleOutlined } from '@ant-design/icons';
import { notification } from 'antd';

const LocationManagement = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // state hiển thị modal
  const [positions, setPositions] = useState([]); // State để lưu danh sách vị trí
  const [imageUrl, setImageUrl] = useState(null); // State để lưu đường dẫn hình ảnh upload
  const [editingUser, setEditingUser] = useState(null); // Người dùng đang được chỉnh sửa (nếu có)
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading cho các thao tác


  // Effect để gọi API lấy danh sách vị trí khi component được mount
  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await quanLyViTri.layDanhSachViTri();
        setPositions(response.data.content); // Cập nhật danh sách vị trí vào state
        console.log(response.data.content);
      } catch (error) {
        console.error("Error fetching positions:", error);
      }
    };

    fetchPositions(); // Gọi hàm fetchPositions khi component được mount
  }, []); // Dependency array rỗng để chỉ gọi 1 lần khi component mount

  // Các hàm xử lý modal
  const showModal = () => {
    setIsModalVisible(true);
  };

// xử lí khi bấm ok trên modal
  const handleOk = () => {
    setIsModalVisible(false);
  };

// xử lí khi bấm cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

   // Mở thông báo với icon
  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };
  


    // Xử lý khi hoàn tất form
    const onFinish = (values) => {
      // Sửa vị trí
      if (editingUser) {
        quanLyViTri
          .suaViTri(editingUser.id, values)
          .then((response) => {
            console.log('Position updated:', response);
            // fetchPositions(); // Cập nhật danh sách vị trí
            openNotificationWithIcon('success', 'Thành công', 'Vị trí đã được cập nhật');
          })
          .then(() => {
            setIsModalVisible(false);
            setEditingUser(null);
          })
          .catch((error) => {
            console.error('Error:', error);
            openNotificationWithIcon('error', 'Lỗi', 'Cập nhật vị trí thất bại');
          });
      } else {
        // Thêm vị trí mới
        quanLyViTri
          .themViTri(values)
          .then((response) => {
            console.log('Position added:', response);
            // fetchPositions(); // Cập nhật danh sách vị trí
            openNotificationWithIcon('success', 'Thành công', 'Vị trí đã được thêm');
          })
          .then(() => {
            setIsModalVisible(false);
          })
          .catch((error) => {
            console.error('Error:', error);
            openNotificationWithIcon('error', 'Lỗi', 'Thêm vị trí thất bại');
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
  
    quanLyViTri
      .xoaViTri(id)
      .then((response) => {
        console.log('Position deleted:', response);
        // fetchPositions(); // Cập nhật danh sách vị trí
        openNotificationWithIcon('success', 'Thành công', 'Vị trí đã được xóa');
      })
      .catch((error) => {
        console.error('Error:', error);
        openNotificationWithIcon('error', 'Lỗi', 'Xóa vị trí thất bại');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  
 // Xử lý khi upload hình ảnh
  const handleUpload = (info) => {
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setImageUrl(URL.createObjectURL(info.file.originFileObj));
    }
  };

  
  
  // Các cột của bảng
  const columns = [
    {
      title: "Tên",
      dataIndex: "tenViTri",
      key: "tenViTri",
      className:
      'bg-gray-300',
    },
    {
      title: "Mã số",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
      className:
      'bg-gray-300',
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
      key: "quocGia",
      className:
      'bg-gray-300',
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <img src={text} alt="Hình ảnh" className="w-16 h-16" />,
      className:
      'bg-gray-300',
    },
    {
      title: 'Hành động',
      key: 'action',
      className:
      'bg-gray-300',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" className="hover:bg-blue-700" onClick={() => handleEdit(record)}>
            <i className="fas fa-edit"></i> Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc muốn xóa?"
            onConfirm={() => handleDelete(record.id)}
            okText="Đồng ý"
            cancelText="Hủy"
            disabled={isLoading}
          >
            <Button type="danger" className="bg-red-500 hover:bg-red-700" disabled={isLoading}>
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
        Dasboard{" "}
        <i style={{ color: "#F08080" }} className="fa-solid fa-arrow-right"></i>
        <span style={{ color: "#F08080" }}> Quản lý Thông Tin Vị Trí</span>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <Button
          style={{ backgroundColor: "#F08080", marginTop: "20px" }}
          onClick={showModal}
        >
          <i className="fa-solid fa-map-location"></i>
          Thêm vị trí
        </Button>
        <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden w-full lg:w-80 mt-3 lg:mt-0 lg:ml-3">
          <Input.Search placeholder="Search..." enterButton ={<i className="fa-solid fa-magnifying-glass"></i>} className="ml-3 py-1 px-2 leading-tight focus:outline-none" />
        </div>
      </div>

      <Modal
        title={editingUser ? "Chỉnh sửa vị trí" : "Thêm vị trí mới"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
       
      >
        <Form name="add_member" onFinish={onFinish} layout="vertical">
          {/* <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: "Vui lòng nhập ID!" }]}
            initialValues={editingUser ? editingUser : {}}
          >
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Tên vị trí"
            name="tenViTri"
            rules={[{ required: true, message: "Vui lòng nhập tên vị trí!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tỉnh thành"
            name="tinhThanh"
            rules={[{ required: true, message: "Vui lòng nhập tỉnh thành!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quốc gia"
            name="quocGia"
            rules={[{ required: true, message: "Vui lòng nhập quốc gia!" }]}
          >
            <Input />
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
              {editingUser ? "Cập nhật" : "Thêm"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <div className="overflow-x-auto mt-10">
        <Table
          dataSource={positions}
          imageUrl={imageUrl}
          columns={columns}
          rowKey={(record) => record.hinhAnh}
          loading={isLoading}
          scroll={{ x: 'calc(400px + 20%)' }}
        />
      </div>
    </div>
  );
};

export default LocationManagement;
