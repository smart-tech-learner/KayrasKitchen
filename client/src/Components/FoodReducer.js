export const FoodReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FOOD":
      state = [
        ...state,
        {
          id: action.payload._id,
          name: action.payload.name,
          quantity: 1,
          price: action.payload.price,
          image: action.payload.image,
        },
      ];

      return state;

    case "INCREMENT_FOOD":
      const filteredItem = state.find((item) => item.id === action.payload._id);

      const modifiedItem = {
        ...filteredItem,
        quantity: filteredItem.quantity + 1,
      };

      const items = state.filter((item) => item.id !== action.payload._id);

      state = [...items, modifiedItem];

      return state;

    case "DECREMENT_FOOD":
      const filteredItemDec = state.find(
        (item) => item.id === action.payload._id
      );

      const decItem = {
        ...filteredItemDec,
        quantity: filteredItemDec.quantity - 1,
      };

      if (decItem.quantity === 0) {
        const decItems = state.filter((item) => item.id !== decItem.id);
        state = [...decItems];
        return state;
      }

      const decItems = state.filter((item) => item.id !== action.payload._id);

      state = [...decItems, decItem];

      return state;

    case "REMOVE_FOOD":
      const ItemToRemove = state.filter(
        (item) => item.id !== action.payload._id
      );
      state = [...ItemToRemove];
      return state;
  }
};
