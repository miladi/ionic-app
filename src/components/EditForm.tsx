import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IonButton, IonIcon } from '@ionic/react';
import {
	cloudDownloadOutline,
	removeCircleOutline,
} from 'ionicons/icons/index';
import { schema } from '../utils/Validation';
import { ItemProps, ItemsContext } from '../itemsContext/ItemsContext';
import './EditForm.css';

interface ItemEditProps {
	item: ItemProps;
	editItem: boolean;
	setEditItem: (bool: boolean) => void;
}

const EditForm: React.FC<ItemEditProps> = ({
	item,
	editItem,
	setEditItem,
}: ItemEditProps) => {
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const { itemsArray, updateItem } = useContext(ItemsContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: { ...item },
	});

	const onSubmit: SubmitHandler<ItemProps> = data => {
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
		updateItem(data);
		setEditItem(false);
	};

	return (
		<>
			{editItem && (
				<>
					<h4>Update Values</h4>
					<form onSubmit={handleSubmit(onSubmit)}>
						<span>Name</span> <input {...register('name')} name='name' />
						<p>{errors.name?.message}</p>
						<span>Price</span>{' '}
						<input {...register('price')} name='price' type='tel' />
						<p>{errors.price?.message}</p>
						<span>Product Type</span>
						<select {...register('type')}>
							<option value='integrated'>Integrated</option>
							<option value='peripheral'>Peripheral</option>
						</select>
						<p>{errors.type?.message}</p>
						{error && <p>{errorMessage}</p>}
						<div className='modalButtons'>
							<IonButton
								color='success'
								type='submit'
								disabled={!!Object.keys(errors).length || false}
							>
								<h2>Save</h2>
								<IonIcon icon={cloudDownloadOutline} />
							</IonButton>
							<IonButton color='medium' onClick={() => setEditItem(false)}>
								<h2>Cancel</h2>
								<IonIcon icon={removeCircleOutline} />
							</IonButton>
						</div>
					</form>
				</>
			)}
		</>
	);
};

export default EditForm;
