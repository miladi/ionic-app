import { useContext, useState } from "react";
import { ItemProps, ItemsContext } from "../itemsContext/ItemsContext";
import { IonButton, IonModal } from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/Validation";
import "./Modal.css";

interface IModal {
  showModal: boolean;
  setShowModal: (bool: boolean) => void;
}

const Modal: React.FC<IModal> = ({ showModal, setShowModal }) => {
  const { itemsArray, addItem } = useContext(ItemsContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<ItemProps> = (data) => {
    setError(false);
    setErrorMessage("");
    const sameItemName = itemsArray.find((item) => item.name === data.name);

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
      reset();
      addItem({ ...data, id: itemsArray.length + 1 });
      setShowModal(false);
    }
  };

  return (
    <>
      <IonModal isOpen={showModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Name" {...register("name")} />
          <p>{errors.name?.message}</p>

          <input placeholder="Price" type="tel" {...register("price")} />
          <p>{errors.price?.message}</p>
          {error && <p>{errorMessage}</p>}

          <div className="selection">
            <label>Type:</label>
            <select {...register("type")}>
              <option value="">Choose</option>
              <option value="integrated">Integrated</option>
              <option value="peripheral">Peripheral</option>
            </select>
          </div>
          <p>{errors.type?.message}</p>

          <div className="modalButtons">
            <IonButton
              type="submit"
              disabled={Object.keys(errors).length ? true : false}
            >
              Save
            </IonButton>
            <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
          </div>
        </form>
      </IonModal>
    </>
  );
};

export default Modal;
