import { Avatar, Badge, Collapse, Popover, Tooltip } from 'antd';
import React from 'react';
import './ProfileChat.scss';

const ProfileChat = ({ userLoggedIn }) => {
  return (
    <div className="chat-side-bar">
      <div className="tab-content">
        <div className="px-6 pt-6 flex justify-between items-center">
          <h4 className="mb-0 font-bold text-2xl">My profile</h4>
          <Popover
            zIndexPopup={1200}
            content={
              <>
                <ul className="dropdown-menu block">
                  <li>
                    <button className="dropdown-item text-[15px] flex justify-between items-center">
                      Edit
                    </button>
                  </li>
                  <li>
                    <button className="dropdown-item text-[15px] flex justify-between items-center">
                      Action
                    </button>
                  </li>
                  <li class="my-2">
                    <hr />
                  </li>
                  <li>
                    <button className="dropdown-item text-[15px] flex justify-between items-center">
                      Another action
                    </button>
                  </li>
                </ul>
              </>
            }
            trigger="click"
          >
            <button className="relative  px-2">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </Popover>
        </div>
        <div className="profile-avatar text-center p-6 border-b">
          <div className="profile-user mb-6">
            {userLoggedIn.avatar ? (
              <Avatar size={96} src={userLoggedIn.avatar} />
            ) : (
              <Avatar size={96}>{userLoggedIn.name}</Avatar>
            )}
            <button className="avatar-xs profile-photo-edit rounded-full text-white">
              <i className="fa-solid fa-pen"></i>
            </button>
          </div>
          <h3 className="text-xl font-bold mb-1">{userLoggedIn.name}</h3>
          <p className="text-muted font-medium">
            <Badge status="success" className="me-2" />
            Active
          </p>
        </div>
        <div className="p-6 user-profile-desc overflow-y-auto h-[390px]">
          <Collapse
            size="large"
            items={[
              {
                label: 'About',
                children: (
                  <>
                    <div className="card-body">
                      <div>
                        <p className="text-muted mb-1">Name</p>
                        <h5 className="font-semibold">{userLoggedIn.name}</h5>
                      </div>
                      <div className="mt-4">
                        <p className="text-muted mb-1">Email</p>
                        <h5 className="font-semibold">{userLoggedIn.email}</h5>
                      </div>
                      <div className="mt-4">
                        <p className="text-muted mb-1">Phone</p>
                        <h5 className="font-semibold">{userLoggedIn.phone}</h5>
                      </div>
                      <div className="mt-4">
                        <p className="text-muted mb-1">Role</p>
                        <h5 className="font-semibold">{userLoggedIn.role}</h5>
                      </div>
                    </div>
                  </>
                ),
              },
            ]}
          />
          <Collapse
            className="mt-4"
            size="large"
            items={[
              {
                label: 'Attached Files',
                children: (
                  <>
                    <div className="card-body">
                      <div className="card p-2 border mb-2">
                        <div className="flex items-center">
                          <div className="avatar-sm me-3 ms-0">
                            <div className="avatar-title rounded text-xl">
                              <i className="fa-solid fa-file-lines"></i>
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="text-left">
                              <h5 className="font-medium text-[14px]">
                                Admin-A.zip
                              </h5>
                              <p className="text-muted text-[13px] mb-0">
                                12.5 MB
                              </p>
                            </div>
                          </div>
                          <div className="ms-4 me-0">
                            <ul className="mb-0 text-[18px] pl-0">
                              <Tooltip title="Download">
                                <li className="text-muted hover:text-[#ff5a5f] cursor-pointer">
                                  <i className="fa-solid fa-download"></i>
                                </li>
                              </Tooltip>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card p-2 border mb-2">
                        <div className="flex items-center">
                          <div className="avatar-sm me-3 ms-0">
                            <div className="avatar-title rounded text-xl">
                              <i className="fa-solid fa-image"></i>
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="text-left">
                              <h5 className="font-medium text-[14px]">
                                images_1.png
                              </h5>
                              <p className="text-muted text-[13px] mb-0">
                                12.5 MB
                              </p>
                            </div>
                          </div>
                          <div className="ms-4 me-0">
                            <ul className="mb-0 text-[18px] pl-0">
                              <Tooltip title="Download">
                                <li className="text-muted hover:text-[#ff5a5f] cursor-pointer">
                                  <i className="fa-solid fa-download"></i>
                                </li>
                              </Tooltip>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="card p-2 border mb-2">
                        <div className="flex items-center">
                          <div className="avatar-sm me-3 ms-0">
                            <div className="avatar-title rounded text-xl">
                              <i className="fa-solid fa-file-word"></i>
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="text-left">
                              <h5 className="font-medium text-[14px]">
                                demo.docx
                              </h5>
                              <p className="text-muted text-[13px] mb-0">
                                12.5 MB
                              </p>
                            </div>
                          </div>
                          <div className="ms-4 me-0">
                            <ul className="mb-0 text-[18px] pl-0">
                              <Tooltip title="Download">
                                <li className="text-muted hover:text-[#ff5a5f] cursor-pointer">
                                  <i className="fa-solid fa-download"></i>
                                </li>
                              </Tooltip>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileChat;
