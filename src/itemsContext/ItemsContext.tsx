import React, { createContext, useEffect, useState } from 'react';

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
	updateItem: (item: ItemProps) => void;
}

const contextDefaultValues: ItemTypes = {
	itemsArray: [],
	addItem: () => {},
	deleteItem: () => {},
	updateItem: () => {},
};

export const ItemsContext = createContext<ItemTypes>(contextDefaultValues);

const ItemsProvider: React.FC = ({ children }) => {
	const [itemsArray, setItemsArray] = useState<ItemProps[]>(
		contextDefaultValues.itemsArray
	);

	useEffect(() => {
		const data = localStorage.getItem('item');
		if (data) {
			setItemsArray(JSON.parse(data));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem('item', JSON.stringify(itemsArray));
	}, [itemsArray]);

	const addItem = (newItem: ItemProps) =>
		setItemsArray(item => [...item, newItem]);

	const deleteItem = (item: ItemProps) =>
		setItemsArray(itemsArray.filter(i => i !== item));

	const updateItem = (item: ItemProps) => {
		setItemsArray(itemsArray.map(i => (i.id === item.id ? item : i)));
	};

	return (
		<ItemsContext.Provider
			value={{
				itemsArray,
				addItem,
				deleteItem,
				updateItem,
			}}
		>
			{children}
		</ItemsContext.Provider>
	);
};

export default ItemsProvider;
