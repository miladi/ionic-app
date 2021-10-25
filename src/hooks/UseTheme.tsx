import { useState } from 'react';

const useTheme = () => {
	const [checked, setChecked] = useState(false);
	const toggleDarkModeHandler = (event: CustomEvent) => {
		setChecked(event.detail.checked);
		document.body.classList.toggle('dark');
	};

	return {
		checked,
		toggleDarkModeHandler,
	};
};

export default useTheme;
