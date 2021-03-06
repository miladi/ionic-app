import React from 'react';
import {
	IonIcon,
	IonItem,
	IonLabel,
	IonRouterOutlet,
	IonToggle,
} from '@ionic/react';
import { moon } from 'ionicons/icons/index';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Switch } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import AddPage from './pages/AddPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import ItemsProvider from './itemsContext/ItemsContext';
import useTheme from './hooks/UseTheme';
/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
	const { checked, toggleDarkModeHandler } = useTheme();

	return (
		<>
			<IonItem lines='none'>
				<IonIcon slot='start' icon={moon} />
				<IonLabel>Dark Mode</IonLabel>
				<IonToggle
					checked={checked}
					slot='end'
					name='darkMode'
					onIonChange={e => toggleDarkModeHandler(e)}
				/>
			</IonItem>

			<ItemsProvider>
				<IonReactRouter>
					<IonRouterOutlet>
						<AnimatePresence>
							<Switch>
								<Route exact path='/add' component={AddPage} />
								<Route exact path='/' component={Home} />
							</Switch>
						</AnimatePresence>
					</IonRouterOutlet>
				</IonReactRouter>
			</ItemsProvider>
		</>
	);
};
export default App;
