// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import { Drawer, List, Avatar, Badge, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { closeNotif, openNotif } from "../store/uiSlice";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./layout.css";
import "./notifications.css";

import { NOTIFICATIONS, ACTIVITIES, CONTACTS } from "./notifications/data";

const Layout = () => {
  const notifOpen = useSelector((s) => s.ui.notifOpen);
  const dispatch = useDispatch();

  return (
    <div className="app-layout">
      <Sidebar />
      {/* When drawer is open we add a class to adjust right columns responsively */}
      <div className={`main ${notifOpen ? "with-drawer" : ""}`}>
        <Header onOpenNotifications={() => dispatch(openNotif())} />
        <div className="content">
          <Outlet />
        </div>
      </div>

      <Drawer
        placement="right"
        width={360}
        open={notifOpen}
        onClose={() => dispatch(closeNotif())}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>Notifications</span>
            <Badge count={NOTIFICATIONS.length} size="small" />
          </div>
        }
        mask={false}
        rootClassName="custom-notif-drawer"
        styles={{
          header: { borderBottom: `1px solid var(--panel-border)` },
          body: { padding: 0 },
        }}
      >
        <div style={{ padding: 12 }}>
          <h4 style={{ margin: "4px 0 8px 0", color: "var(--text)" }}>
            Notifications
          </h4>
          <List
            itemLayout="horizontal"
            dataSource={NOTIFICATIONS}
            renderItem={(item) => (
              <List.Item
                style={{ paddingInline: 4, background: "var(--panel)" }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={28}
                      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${item.id}`}
                    />
                  }
                  title={
                    <span style={{ fontWeight: 500, color: "var(--text)" }}>
                      {item.title}
                    </span>
                  }
                  description={
                    <span style={{ color: "var(--muted-2)" }}>{item.time}</span>
                  }
                />
              </List.Item>
            )}
          />

          <h4 style={{ margin: "4px 0 8px 0", color: "var(--text)" }}>
            Activities
          </h4>
          <List
            itemLayout="horizontal"
            dataSource={ACTIVITIES}
            renderItem={(item) => (
              <List.Item
                style={{ paddingInline: 4, background: "var(--panel)" }}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={28}
                      src={`https://api.dicebear.com/7.x/identicon/svg?seed=${item.id}`}
                    />
                  }
                  title={
                    <span style={{ fontWeight: 500, color: "var(--text)" }}>
                      {item.title}
                    </span>
                  }
                  description={
                    <span style={{ color: "var(--muted-2)" }}>{item.time}</span>
                  }
                />
              </List.Item>
            )}
          />

          <Divider style={{ borderColor: "var(--panel-border)" }} />

          <h4 style={{ margin: "0 0 8px 0", color: "var(--text)" }}>
            Contacts
          </h4>
          <List
            itemLayout="horizontal"
            dataSource={CONTACTS}
            renderItem={(c) => (
              <List.Item style={{ paddingInline: 4 }}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      size={28}
                      src={`https://api.dicebear.com/7.x/fun-emoji/svg?seed=${c.id}`}
                    />
                  }
                  title={<span style={{ color: "var(--text)" }}>{c.name}</span>}
                />
              </List.Item>
            )}
          />
        </div>
      </Drawer>
    </div>
  );
};

export default Layout;
