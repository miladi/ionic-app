import { useContext, useState } from 'react';
import { useIonRouter } from '@ionic/react';
import { SubmitHandler } from 'react-hook-form';
import { ItemProps, ItemsContext } from '../itemsContext/ItemsContext';

const useAddItem = () => {
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const { itemsArray, addItem, updateItem } = useContext(ItemsContext);
	const router = useIonRouter();
	const pageTransition = {
		in: {
			opacity: 1,
			y: 0,
		},
		out: {
			opacity: 0,
			y: '-100%',
		},
	};

	const validateForm = (data: ItemProps, callBack: Function) => {
		setError(false);
		setErrorMessage('');

		const sameItemName = itemsArray.find(i => {
			if (i.id === data.id) {
				return false;
			}
			return i.name === data.name;
		});
		if (sameItemName) {
			setError(true);
			setErrorMessage('You can not use the same product name');
			return;
		}

		if (data.type === 'integrated' && (data.price < 1000 || data.price > 2600)) {
			setError(true);
			setErrorMessage('Choose a price between 1000 & 2600');
			return;
		}
		callBack();
	};

	const onSubmit: SubmitHandler<ItemProps> = data => {
		validateForm(data, () => {
			addItem({ ...data, id: Math.floor(Math.random() * 1000) + 1 });
			router.goBack();
		});
	};

	const onSubmitEdit: SubmitHandler<ItemProps> = data => {
		validateForm(data, () => updateItem(data));
	};

	const cancelForm = () => {
		setErrorMessage('');
		router.goBack();
	};

	return {
		error,
		errorMessage,
		pageTransition,
		onSubmit,
		onSubmitEdit,
		cancelForm,
	};
};

export default useAddItem;
