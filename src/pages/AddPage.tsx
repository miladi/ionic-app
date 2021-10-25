import React from 'react';
import { IonButton, IonContent, IonIcon, IonPage } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	cloudDownloadOutline,
	removeCircleOutline,
} from 'ionicons/icons/index';
import { motion } from 'framer-motion';
import useAddPage from '../hooks/UseAddItem';
import schema from '../utils/Validation';
import { ItemProps } from '../itemsContext/ItemsContext';
import './AddPage.css';

const AddPage: React.FC = () => {
	const { error, errorMessage, pageTransition, onSubmit, cancelForm } =
		useAddPage();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ItemProps>({
		resolver: yupResolver(schema),
	});

	return (
		<IonPage>
			<IonContent>
				<motion.div initial='out' animate='in' variants={pageTransition}>
					<div className='title'>
						<h4>Create New Product</h4>
					</div>
					<form onSubmit={handleSubmit(data => onSubmit(data))}>
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
							<IonButton color='medium' onClick={() => cancelForm()}>
								<h2>Cancel</h2>
								<IonIcon icon={removeCircleOutline} />
							</IonButton>
						</div>
					</form>
				</motion.div>
			</IonContent>
		</IonPage>
	);
};

export default AddPage;
