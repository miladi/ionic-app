import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { motion } from 'framer-motion';
import useAddPage from '../hooks/UseAddItem';
import Form from '../components/Form';
import './AddPage.css';

const AddPage: React.FC = () => {
	const { error, errorMessage, pageTransition, onSubmit, cancelForm } =
		useAddPage();

	return (
		<IonPage>
			<IonContent>
				<motion.div initial='out' animate='in' variants={pageTransition}>
					<div className='title'>
						<h4>Create New Product</h4>
					</div>
					<Form
						submit={onSubmit}
						error={error}
						errorMessage={errorMessage}
						cancel={cancelForm}
					/>
				</motion.div>
			</IonContent>
		</IonPage>
	);
};

export default AddPage;
