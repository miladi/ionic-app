import React, { useContext } from 'react';
import { add } from 'ionicons/icons/index';
import {
	IonApp,
	IonContent,
	IonFab,
	IonFabButton,
	IonIcon,
	IonPage,
	useIonRouter,
} from '@ionic/react';
import Header from '../components/Header';
import Item from '../components/Item';
import { ItemsContext } from '../itemsContext/ItemsContext';
import './Home.css';

const Home: React.FC = () => {
	const { itemsArray } = useContext(ItemsContext);
	const router = useIonRouter();

	return (
		<IonApp style={{ background: 'red' }}>
			<IonPage>
				<Header />

				<IonContent>
					{!itemsArray.length ? (
						<div className='info'>
							<div className='infoText'>
								<h4>
									You do not have any products. Press the plus button below to add a new
									item.
								</h4>
							</div>
						</div>
					) : (
						<>
							{itemsArray.map(item => (
								<Item key={item.id} item={item} />
							))}
						</>
					)}

					<IonFab vertical='bottom' horizontal='end' slot='fixed'>
						<IonFabButton color='success' onClick={() => router.push('/add')}>
							<IonIcon icon={add} />
						</IonFabButton>
					</IonFab>
				</IonContent>
			</IonPage>
		</IonApp>
	);
};

export default Home;
