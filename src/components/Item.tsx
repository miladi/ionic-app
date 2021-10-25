import React, { useContext, useEffect } from 'react';
import {
	IonIcon,
	IonItem,
	IonItemOption,
	IonItemOptions,
	IonItemSliding,
	IonLabel,
} from '@ionic/react';
import { createOutline, trashOutline } from 'ionicons/icons/index';
import useItem from '../hooks/UseItem';
import { ItemProps, ItemsContext } from '../itemsContext/ItemsContext';
import EditForm from './EditForm';
import './Item.css';

interface ItemEditProp {
	item: ItemProps;
}

const Item: React.FC<ItemEditProp> = ({ item }) => {
	const { itemsArray, deleteItem } = useContext(ItemsContext);
	const { editItem, setEditItem, ref } = useItem();

	useEffect(() => {
		ref.current?.close();
	}, [editItem, itemsArray]);

	return (
		<>
			<div className='container'>
				<IonItemSliding ref={ref}>
					<IonItem color='light'>
						<IonLabel>
							<h3>{item.name}</h3>
						</IonLabel>
						<IonLabel>
							<h3>{item.type}</h3>
						</IonLabel>
						<IonLabel>
							<h3>${item.price}</h3>
						</IonLabel>
					</IonItem>

					<IonItemOptions side='end'>
						<IonItemOption>
							<IonIcon
								slot='icon-only'
								icon={createOutline}
								onClick={() => setEditItem(true)}
							/>
						</IonItemOption>

						<IonItemOption color='danger'>
							<IonIcon
								slot='icon-only'
								icon={trashOutline}
								onClick={() => deleteItem(item)}
							/>
						</IonItemOption>
					</IonItemOptions>
				</IonItemSliding>
			</div>

			<EditForm item={item} editItem={editItem} setEditItem={setEditItem} />
		</>
	);
};

export default Item;
