import React from "react";

const AdminTabList = (props) => {
  const onClickListItem = (tabId) => {
    props.selectedTab(tabId);
  };

  return (
    <div
      className="p-5 flex justify-center items-center bg-slate-500 mb-1 rounded-md hover:bg-primary text-white font-bold"
      onClick={() => onClickListItem(props.tab.id)}
    >
      <img className="mr-2 " src={props.tab.icon} alt="icon" />
      {props.tab.name}
    </div>
  );
};

export default AdminTabList;
