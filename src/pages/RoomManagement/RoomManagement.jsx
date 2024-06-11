import { useState } from 'react';
import { Button, Modal, Form, Input } from 'antd';

const RoomManagement = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    const onFinish = (values) => {
      console.log('Success:', values);
      // Bạn có thể xử lý logic thêm thành viên ở đây
      setIsModalVisible(false);
    };
  
    return (
      <div>
        <div className='mx-1'>
            Dasboard <i style={{color: '#F08080'}} className="fa-solid fa-arrow-right"></i><span style={{color: '#F08080'}}> Quản lý Thông Tin Phòng</span>
          </div>
      <div className='flex justify-between'>
        <Button style={{backgroundColor:'#F08080', marginTop:'20px'}} onClick={showModal}>
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
              label="Tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập tên thành viên!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }, { type: 'email', message: 'Email không hợp lệ!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thêm
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <div className="overflow-x-auto mt-10">
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="border px-8 py-4">Tên</th>
          <th className="border px-8 py-4">Mã số</th>
          <th className="border px-8 py-4">Hình ảnh</th>
          <th className="border px-8 py-4">Mô tả</th>
          <th className="border px-8 py-4">Chi tiết</th>
        </tr>
      </thead>
      <tbody className='bg-pink-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-yellow-500 transition duration-500 ease-in-out '>
        {/* Repeat this tr for each row in your data */}
        <tr>
          <td className="border px-8 py-4">Tên người dùng</td>
          <td className="border px-8 py-4">12345</td>
          <td className="border px-8 py-4">
            <img src="path-to-image.jpg" alt="Hình ảnh" className="w-16 h-16" />
          </td>
          <td className="border px-8 py-4">Mô tả ngắn gọn</td>
          <td className="border px-8 py-4">Thông tin chi tiết</td>
        </tr>
        {/* End of data row */}
      </tbody>
    </table>
  </div>
  
      </div>
      
    );
}

export default RoomManagement
