import React from "react";
import AdminTabList from "./AdminTabList";
import add from "../../../src/assets/add.png";
import list from "../../../src/assets/list.png";
import order from "../../../src/assets/order.png";
import back from "../../assets/back.png";
import logout from "../../assets/logout.png";

const AdminTabs = (props) => {
  const selectedTab = (tabId) => {
    props.selectedTab(tabId);
  };

  const tabs = [
    { id: "addItem", name: "Add Item", icon: add },
    { id: "listItems", name: "List Items", icon: list },
    { id: "orders", name: "Orders", icon: order },
    { id: "back", name: "Back to App", icon: back },
    { id: "logout", name: "Logout", icon: logout },
  ];
  return (
    <div>
      {tabs.map((tab) => {
        return (
          <AdminTabList key={tab.id} tab={tab} selectedTab={selectedTab} />
        );
      })}
    </div>
  );
};

export default AdminTabs;
