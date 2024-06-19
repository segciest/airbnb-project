import { Tabs } from 'antd';
import './footer.scss';

const Footer = () => {
  const data = [
    { id: 1, label: 'Canmore', content: 'Wooden chalet for rent' },
    { id: 2, label: 'Benalmadena', content: 'House for rent' },
    { id: 3, label: 'Marbella', content: 'Country house for rent' },
    { id: 4, label: 'Mijas', content: 'Apartment for rent' },
    {
      id: 5,
      label: 'Prescott',
      content: 'Pet-friendly rental accommodation',
    },
    { id: 6, label: 'Scottsdale', content: 'Vacation home for rent' },
    { id: 7, label: 'Tucson', content: 'Apartment for rent' },
    { id: 8, label: 'Jasper', content: 'Cabins for rent' },
    { id: 9, label: 'Moutain view', content: 'Country house for rent' },
    { id: 10, label: 'Devonport', content: 'Vacation home for rent' },
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
      label: 'Popular',
      children: renderTabContent(data),
    },
    {
      key: '2',
      label: 'Culture and arts',
      children: renderTabContent(data),
    },
    {
      key: '3',
      label: 'Out side',
      children: renderTabContent(data),
    },
    {
      key: '4',
      label: 'Mountains',
      children: renderTabContent(data),
    },
    {
      key: '5',
      label: 'Beach',
      children: renderTabContent(data),
    },
    {
      key: '6',
      label: 'Category',
      children: renderTabContent(data),
    },
    {
      key: '7',
      label: 'Things to experience',
      children: renderTabContent(data),
    },
  ];

  return (
    <div className="footer">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />

      <div className="bottom-footer bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm text-gray-600">
          <div className="footer-column">
            <h3 className="font-bold text-gray-900 mb-2">Support</h3>
            <ul>
              <li>Help Center</li>
              <li>AirCover</li>
              <li>Anti-discrimination</li>
              <li>Support people with disabilities</li>
              <li>Cancellation options</li>
              <li>Report neighborhood concerns</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="font-bold text-gray-900 mb-2">Welcome guests</h3>
            <ul>
              <li>Rent a house on Airbnb</li>
              <li>AirCover for Homeowners</li>
              <li>Resources for welcoming guests</li>
              <li>Community forum</li>
              <li>Welcoming guests responsibly</li>
              <li>Take a free course on Welcoming Guests</li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="font-bold text-gray-900 mb-2">Airbnb</h3>
            <ul>
              <li>News sites</li>
              <li>New feature</li>
              <li>Career opportunities</li>
              <li>Investors</li>
              <li>Airbnb.org emergency accommodation</li>
            </ul>
          </div>
        </div>
        <div className="bottomFooter container mx-auto text-center text-xs text-gray-500 border-t border-gray-200 pt-4 mt-6">
          <div className="flex justify-center space-x-4 mb-4">
            <div>© 2024 Airbnb, Inc.</div>
            <div>·</div>
            <div>Privacy</div>
            <div>·</div>
            <div>Rules</div>
            <div>·</div>
            <div>Sitemap</div>
          </div>
          <div className="flex justify-center space-x-4">
            <div>English (US)</div>
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
