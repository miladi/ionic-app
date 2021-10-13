import { createContext, useState } from "react";

export interface ItemProps {
  id: number;
  name: string;
  price: number;
  type: string;
}

interface ItemTypes {
  itemsArray: ItemProps[];
  addItem: (item: ItemProps) => void;
  deleteItem: (item: ItemProps) => void;
  changeItem: (item: ItemProps) => void;
}

const contextDefaultValues: ItemTypes = {
  itemsArray: [],
  addItem: () => {},
  deleteItem: () => {},
  changeItem: () => {},
};

export const ItemsContext = createContext<ItemTypes>(contextDefaultValues);

const ItemsProvider: React.FC = ({ children }) => {
  const [itemsArray, setItemsArray] = useState<ItemProps[]>(
    contextDefaultValues.itemsArray
  );

  const addItem = (newItem: ItemProps) =>
    setItemsArray((item) => [...item, newItem]);

  const deleteItem = (item: ItemProps) =>
    setItemsArray(itemsArray.filter((i) => i !== item));

  const changeItem = (item: ItemProps) => {
    setItemsArray(
      itemsArray.map((i) =>
        i.id === item.id
          ? { ...i, name: item.name, price: item.price, type: item.type }
          : i
      )
    );
  };

  return (
    <ItemsContext.Provider
      value={{
        itemsArray,
        addItem,
        deleteItem,
        changeItem,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsProvider;
