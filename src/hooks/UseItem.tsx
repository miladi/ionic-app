import { useRef, useState } from 'react';

const useItem = () => {
	const [editItem, setEditItem] = useState(false);
	const ref = useRef<any>(null);

	return {
		editItem,
		ref,
		setEditItem,
	};
};

export default useItem;
