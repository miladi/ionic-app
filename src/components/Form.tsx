import React from 'react';
import { useForm } from 'react-hook-form';
import { IonButton, IonIcon } from '@ionic/react';
import {
	cloudDownloadOutline,
	removeCircleOutline,
} from 'ionicons/icons/index';
import { yupResolver } from '@hookform/resolvers/yup';
import { ItemProps } from '../itemsContext/ItemsContext';
import schema from '../utils/Validation';

interface ItemEditProp {
	submit: (data: ItemProps) => void;
	error: boolean;
	errorMessage: string;
	cancel: (bool?: boolean) => void;
    item?: ItemProps;
}

const Form: React.FC<ItemEditProp> = ({
	submit,
	error,
	errorMessage,
	cancel,
    item,
}: ItemEditProp) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ItemProps>({
		resolver: yupResolver(schema),
		defaultValues: { ...item },
	});
	return (
		<>
			<form onSubmit={handleSubmit(data => submit(data))}>
				<input placeholder='Name' {...register('name')} />
				<p>{errors.name?.message}</p>

				<input placeholder='Price' type='tel' {...register('price')} />
				<p>{errors.price?.message}</p>
				{error && <p>{errorMessage}</p>}

				<div className='selection'>
					<span className='ptype'>Product Type:</span>
					<select {...register('type')}>
						<option value=''>Choose</option>
						<option value='integrated'>Integrated</option>
						<option value='peripheral'>Peripheral</option>
					</select>
				</div>
				<p>{errors.type?.message}</p>

				<div className='modalButtons'>
					<IonButton
						color='success'
						type='submit'
						disabled={!!Object.keys(errors).length || false}
					>
						<h2>Save</h2>
						<IonIcon icon={cloudDownloadOutline} />
					</IonButton>
					<IonButton color='medium' onClick={() => cancel()}>
						<h2>Cancel</h2>
						<IonIcon icon={removeCircleOutline} />
					</IonButton>
				</div>
			</form>
		</>
	);
};

export default Form;
