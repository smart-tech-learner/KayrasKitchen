import React from "react";

const Menus = (props) => {
  const onSelectMenuOption = (menuOption) => {
    props.selectedMenu(menuOption);
    return;
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <img
          className={`${
            props.menuToHighlight === props.menu.name &&
            "border-4 border-sky-500 rounded-full p-1"
          }`}
          src={props.menu.image}
          alt="menu2"
          onClick={() => onSelectMenuOption(props.menu.name)}
        />
      </div>
      <div className="flex justify-center items-center pt-2 font-semibold text-slate-600">
        <p>{props.menu.name}</p>
      </div>
    </div>
  );
};

export default Menus;
