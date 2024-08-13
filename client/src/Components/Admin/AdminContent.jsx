import React from "react";
import Orders from "./Orders";
import ListItems from "./ListItems";
import { AddItem } from "./AddItem";
import admin_home from "../../../src/assets/admin_home.png";

const AdminContent = (props) => {
  return (
    <div>
      <div className="bg-white ml-1 rounded-md h-full max-h-full">
        {props.tabDetailsToLoad === "addItem" ? (
          <AddItem
            resetTabs={props.resetTabs}
            loadListItemsTab={props.loadListItemsTab}
          />
        ) : props.tabDetailsToLoad === "listItems" ? (
          <ListItems />
        ) : props.tabDetailsToLoad === "orders" ? (
          <Orders />
        ) : (
          <div className="flex justify-center items-center">
            <img src={admin_home} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContent;
