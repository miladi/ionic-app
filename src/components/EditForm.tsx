import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/Validation";
import { IonButton } from "@ionic/react";
import { ItemProps, ItemsContext } from "../itemsContext/ItemsContext";
import { useContext, useState } from "react";

export interface ItemEditProps {
  item: ItemProps;
  editItem: boolean;
  setEditItem: (item: boolean) => void;
}

const EditForm: React.FC<ItemEditProps> = ({ item, editItem, setEditItem }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { itemsArray, changeItem } = useContext(ItemsContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...item },
  });

  const onSubmit: SubmitHandler<ItemProps> = (data) => {
    setError(false);
    setErrorMessage("");
    const sameItemName = itemsArray.find((item) => {
      if (item.id === data.id) {
        return false;
      }
      return item.name === data.name;
    });

    if (sameItemName) {
      setError(true);
      setErrorMessage("You can not use the same item name");
      return;
    }

    if (
      data.type === "integrated" &&
      (data.price < 1000 || data.price > 2600)
    ) {
      setError(true);
      setErrorMessage("Choose a price between 1000 & 2600");
      return;
    } else {
      changeItem(data);
      setEditItem(false);
    }
  };

  const handleCancel = () => {
    setEditItem(false);
    setEditItem(false);
  };

  return (
    <>
      {editItem && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("name")} name="name" />
          <p>{errors.name?.message}</p>
          <input {...register("price")} name="price" type="tel" />
          <p>{errors.price?.message}</p>
          <select {...register("type")}>
            <option value="integrated">Integrated</option>
            <option value="peripheral">Peripheral</option>
          </select>
          <p>{errors.type?.message}</p>
          {error && <p>{errorMessage}</p>}

          <div className="modalButtons">
            <IonButton
              type="submit"
              disabled={Object.keys(errors).length ? true : false}
            >
              Save
            </IonButton>
            <IonButton onClick={() => handleCancel()}>Cancel</IonButton>
          </div>
        </form>
      )}
    </>
  );
};

export default EditForm;
