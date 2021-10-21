import React, { useContext, useState } from 'react';
import {
	IonButton,
	IonContent,
	IonIcon,
	IonPage,
	useIonRouter,
} from '@ionic/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	cloudDownloadOutline,
	removeCircleOutline,
} from 'ionicons/icons/index';
import { motion } from 'framer-motion';
import { schema } from '../utils/Validation';
import { ItemProps, ItemsContext } from '../itemsContext/ItemsContext';
import './AddPage.css';

const AddPage: React.FC = () => {
	const { itemsArray, addItem } = useContext(ItemsContext);
	const [error, setError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
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

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ItemProps>({
		resolver: yupResolver(schema),
	});

	const onSubmit: SubmitHandler<ItemProps> = data => {
		setError(false);
		setErrorMessage('');
		const sameItemName = itemsArray.find(item => item.name === data.name);

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
		reset();
		addItem({ ...data, id: Math.floor(Math.random() * 1000) + 1 });
		router.goBack();
	};

	const cancelForm = () => {
		setErrorMessage('');
		reset();
		router.goBack();
	};
	return (
		<IonPage>
			<IonContent>
				<motion.div initial='out' animate='in' variants={pageTransition}>
					<div className='title'>
						<h4>Create New Product</h4>
					</div>
					<form onSubmit={handleSubmit(onSubmit)}>
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
