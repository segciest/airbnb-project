import { Button, Form, Input, Modal, Popconfirm, Space, Table, Upload } from "antd";
import { quanLyViTri } from "../../services/quanLyViTri";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { ExclamationCircleOutlined } from '@ant-design/icons';

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



    // Xử lý khi hoàn tất form
    const onFinish = (values) => {
      // Sửa người dùng
      if (editingUser) {
        quanLyViTri
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
        quanLyViTri
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
  
  // Các cột của bảng
  const columns = [
    {
      title: "Tên",
      dataIndex: "tenViTri",
      key: "tenViTri",
    },
    {
      title: "Mã số",
      dataIndex: "tinhThanh",
      key: "tinhThanh",
    },
    {
      title: "Quốc gia",
      dataIndex: "quocGia",
      key: "quocGia",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <img src={text} alt="Hình ảnh" className="w-16 h-16" />,
      
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
      <div className="mx-1">
        Dasboard{" "}
        <i style={{ color: "#F08080" }} className="fa-solid fa-arrow-right"></i>
        <span style={{ color: "#F08080" }}> Quản lý Thông Tin Vị Trí</span>
      </div>
      <div className="flex justify-between">
        <Button
          style={{ backgroundColor: "#F08080", marginTop: "20px" }}
          onClick={showModal}
        >
          <i className="fa-solid fa-map-location"></i>
          Thêm vị trí
        </Button>
        <div className="flex items-center border-2 border-gray-300 rounded-full overflow-hidden w-80">
          <Input.Search placeholder="Search..." enterButton />
        </div>
      </div>

      <Modal
        title="Thêm vị trí mới"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
       
      >
        <Form name="add_member" onFinish={onFinish} layout="vertical">
          <Form.Item
            label="ID"
            name="id"
            rules={[{ required: true, message: "Vui lòng nhập ID!" }]}
          >
            <Input />
          </Form.Item>
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
              Thêm
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
        />
      </div>
    </div>
  );
};

export default LocationManagement;
