import { Tabs } from 'antd';
import './footer.scss';

const Footer = () => {
  const data = [
    { id: 1, label: 'Canmore', content: 'Nhà gỗ chalet cho thuê' },
    { id: 2, label: 'Benalmadena', content: 'Nhà cho thuê' },
    { id: 3, label: 'Marbella', content: 'Nhà nghỉ thôn dã cho thuê' },
    { id: 4, label: 'Mijas', content: 'Căn hộ cho thuê' },
    {
      id: 5,
      label: 'Prescott',
      content: 'Chỗ ở cho thuê phù hợp với thú cưng',
    },
    { id: 6, label: 'Scottsdale', content: 'Nhà nghỉ dưỡng cho thuê' },
    { id: 7, label: 'Tucson', content: 'Căn hộ cho thuê' },
    { id: 8, label: 'Jasper', content: 'Cabin cho thuê' },
    { id: 9, label: 'Moutain view', content: 'Nhà nghỉ thôn dã cho thuê' },
    { id: 10, label: 'Devonport', content: 'Nhà nghỉ dưỡng cho thuê' },
  ];

  const renderTabContent = (data) => {
    return (
      <div className="footerTabRender py-10">
        {data.map((item, index) => {
          return (
            <button className="px-5" key={index}>
              <div className="tabRenderTitle py-3">{item.label}</div>
              <span className="tabRenderContent ">{item.content}</span>
            </button>
          );
        })}
      </div>
    );
  };
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: '1',
      label: 'Phổ biến',
      children: renderTabContent(data),
    },
    {
      key: '2',
      label: 'Văn hoá và nghệ thuật',
      children: renderTabContent(data),
    },
    {
      key: '3',
      label: 'Ngoài trời',
      children: renderTabContent(data),
    },
    {
      key: '4',
      label: 'Dãy núi',
      children: renderTabContent(data),
    },
    {
      key: '5',
      label: 'Bãi biển',
      children: renderTabContent(data),
    },
    {
      key: '6',
      label: 'Danh mục',
      children: renderTabContent(data),
    },
    {
      key: '7',
      label: 'Những điều nên trải nghiệm',
      children: renderTabContent(data),
    },
  ];

  return (
    <div className="footer">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

      <div className="bottom-footer bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-600">
          <div className="footer-column">
            <h3 className="font-bold text-gray-900 mb-2">Hỗ trợ</h3>
            <ul>
              <li>Trung tâm trợ giúp</li>
              <li>AirCover</li>
              <li>Chống phân biệt đối xử</li>
              <li>Hỗ trợ người khuyết tật</li>
              <li>Các tùy chọn hủy</li>
              <li>Báo cáo lo ngại của khu dân cư</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="font-bold text-gray-900 mb-2">Đón tiếp khách</h3>
            <ul>
              <li>Cho thuê nhà trên Airbnb</li>
              <li>AirCover cho Chủ nhà</li>
              <li>Tài nguyên về đón tiếp khách</li>
              <li>Diễn đàn cộng đồng</li>
              <li>Đón tiếp khách có trách nhiệm</li>
              <li>Tham gia khóa học miễn phí về công việc Đón tiếp khách</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="font-bold text-gray-900 mb-2">Airbnb</h3>
            <ul>
              <li>Trang tin tức</li>
              <li>Tính năng mới</li>
              <li>Cơ hội nghề nghiệp</li>
              <li>Nhà đầu tư</li>
              <li>Chỗ ở khẩn cấp Airbnb.org</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto text-center text-xs text-gray-500 border-t border-gray-200 pt-4 mt-6">
          <div className="flex justify-center space-x-4 mb-4">
            <div>© 2024 Airbnb, Inc.</div>
            <div>·</div>
            <div>Quyền riêng tư</div>
            <div>·</div>
            <div>Điều khoản</div>
            <div>·</div>
            <div>Sơ đồ trang web</div>
          </div>
          <div className="flex justify-center space-x-4">
            <div>Tiếng Việt (VN)</div>
            <div>$ USD</div>
            <div className="flex space-x-2">
              <a href="#">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
