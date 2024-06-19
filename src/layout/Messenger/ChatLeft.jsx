import { Avatar, Popover } from 'antd';
import './Messenger.scss';
import { useContext, useRef, useState } from 'react';
import moment from 'moment';
import { AlertContext } from '../../App';

export default function ChatLeft({ user, chatLeft }) {
  const [leftPopoverOpen, setLeftPopoverOpen] = useState(false);

  const handleLeftPopoverChange = (newOpen) => {
    setLeftPopoverOpen(newOpen);
  };

  const { handleAlert } = useContext(AlertContext);

  const chatRef = useRef(null);
  const handleCopyMess = () => {
    const chatText = chatRef.current.innerText;
    navigator.clipboard
      .writeText(chatText)
      .then(() => {
        handleAlert('success', 'Copy success!');
        setLeftPopoverOpen(false);
      })
      .catch((err) => {
        console.error('Có lỗi xảy ra khi sao chép:', err);
      });
  };
  return (
    <div className="chat-left mb-0">
      <ul className="list-unstyled mb-0">
        <li>
          <div className="conversation-list message-highlight">
            <div className="chat-avatar flex items-end">
              {user.avatar ? (
                <Avatar size={40} src={user.avatar} />
              ) : (
                <Avatar size={40}>{user.name}</Avatar>
              )}
            </div>
            <div className="user-chat-content ctext-wrap flex-col">
              <div className="ctext-wrap-content">
                <div className="chat-from">
                  <div>
                    <div ref={chatRef}>{chatLeft.content}</div>
                  </div>
                </div>
                <p className="chat-time mb-0">
                  <i className="fa-regular fa-clock align-middle me-1"></i>
                  <span className="align-middle">
                    {moment(chatLeft.date).format('h:mm A')}
                  </span>
                </p>
              </div>

              <div className="conversation-name mt-2">{user.name}</div>
            </div>
            <div className="chat-left-message-dropdown flex items-start">
              <Popover
                zIndexPopup={1200}
                content={
                  <>
                    <ul className="dropdown-menu block">
                      <li>
                        <button
                          className="dropdown-item text-[15px] flex justify-between items-center"
                          onClick={handleCopyMess}
                        >
                          Copy
                          <i className="fa-regular fa-copy"></i>
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item text-[15px] flex justify-between items-center">
                          Save
                          <i className="fa-regular fa-floppy-disk"></i>
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item text-[15px] flex justify-between items-center">
                          Delete
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </li>
                    </ul>
                  </>
                }
                trigger="click"
                open={leftPopoverOpen}
                onOpenChange={handleLeftPopoverChange}
              >
                <button className="relative flex-auto px-2">
                  <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
              </Popover>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
