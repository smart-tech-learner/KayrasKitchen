import React, { useContext } from "react";
import add_icon from "../assets/add_icon_green.png";
import remove_icon from "../assets/remove_icon_red.png";
import CartContext from "./CartContext";

const DishCard = (props) => {
  const { state, dispatch } = useContext(CartContext);

  const addItem = (payload) => {
    const findExisting = state.find((item) => item.id === payload._id);

    if (!findExisting) {
      dispatch({ type: "ADD_FOOD", payload: payload });
    } else {
      dispatch({ type: "INCREMENT_FOOD", payload: payload });
    }
  };

  const removeItem = (payload) => {
    const findExisting = state.find((item) => item.id === payload._id);

    if (findExisting) {
      dispatch({ type: "DECREMENT_FOOD", payload: payload });
    }
  };

  const itemCount = (id) => {
    const item = state.filter((item) => item.id === id);

    if (item) {
      return item[0]?.quantity;
    } else {
      return 0;
    }
  };

  return (
    <div className="bg-white rounded-2xl">
      <div className="flex justify-center items-center">
        <img
          className="object-cover w-full rounded-2xl h-96"
          src={props.food.image}
          alt="food"
        />
      </div>
      <div className="flex justify-end -mt-14 mr-3">
        <div className="bg-white flex rounded-2xl p-1">
          {itemCount(props.food._id) > 0 && (
            <div className="mr-2">
              <img
                className="p-1"
                src={remove_icon}
                alt="remove"
                onClick={() => removeItem(props.food)}
              />
            </div>
          )}

          <div className="flex justify-center items-center">
            {itemCount(props.food._id)}
          </div>

          <div className={`${itemCount(props.food._id) === 0 && "ml-2"} p-1`}>
            <img src={add_icon} alt="add" onClick={() => addItem(props.food)} />
          </div>
        </div>
      </div>
      <div className="pt-6 px-5 p-2">
        <div className="flex justify-between">
          <p className="font-bold text-black text-xl">{props.food.name}</p>
          <p className="text-yellow-500 text-2xl">★★★★ </p>
        </div>

        <p className="text-slate-500 h-24">{props.food.description}</p>
        <p className="pt-2 pb-2 font-bold text-xl text-primary">
          &#8377;
          {props.food.price}
        </p>
      </div>
    </div>
  );
};

export default DishCard;
