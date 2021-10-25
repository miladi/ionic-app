import React from 'react';
import useAddItem from '../hooks/UseAddItem';
import { ItemProps } from '../itemsContext/ItemsContext';
import Form from './Form';

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

	return (
		<>
			{(editItem || error) && (
				<>
					<h4>Update Values</h4>
					<Form
						submit={data => {
							onSubmitEdit(data);
							setEditItem(false);
						}}
						error={error}
						errorMessage={errorMessage}
						cancel={() => setEditItem(false)}
						item={item}
					/>
				</>
			)}
		</>
	);
};

export default EditForm;
