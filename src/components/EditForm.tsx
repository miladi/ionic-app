import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IonButton, IonIcon } from '@ionic/react';
import {
	cloudDownloadOutline,
	removeCircleOutline,
} from 'ionicons/icons/index';
import useAddItem from '../hooks/UseAddItem';
import schema from '../utils/Validation';
import { ItemProps } from '../itemsContext/ItemsContext';
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
	const { error, errorMessage, onSubmitEdit } = useAddItem();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
		defaultValues: { ...item },
	});

	return (
		<>
			{(editItem || error) && (
				<>
					<h4>Update Values</h4>
					<form
						onSubmit={handleSubmit(data => {
							onSubmitEdit(data);
							setEditItem(false);
						})}
					>
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
