import { IonContent, IonIcon, useIonRouter } from "@ionic/react";
import { useContext, useState } from "react";
import { ItemProps, ItemsContext } from "../itemsContext/ItemsContext";
import { IonButton } from "@ionic/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "../utils/Validation";
import { cloudDownloadOutline, removeCircleOutline } from "ionicons/icons";
import "./AddPage.css";

const AddPage: React.FC = () => {
  const { itemsArray, addItem } = useContext(ItemsContext);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useIonRouter();

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
      setErrorMessage("You can not use the same product name");
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
      router.goBack();
    }
  };

  const cancelForm = () => {
    setErrorMessage("");
    reset();
    router.goBack();
  };
  return (
    <IonContent>
      <div>
        <h4 className="title">Create New Product</h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Name" {...register("name")} />
        <p>{errors.name?.message}</p>

        <input placeholder="Price" type="tel" {...register("price")} />
        <p>{errors.price?.message}</p>
        {error && <p>{errorMessage}</p>}

        <div className="selection">
          <label>Product Type:</label>
          <select {...register("type")}>
            <option value="">Choose</option>
            <option value="integrated">Integrated</option>
            <option value="peripheral">Peripheral</option>
          </select>
        </div>
        <p>{errors.type?.message}</p>

        <div className="modalButtons">
          <IonButton
            color="success"
            type="submit"
            disabled={Object.keys(errors).length ? true : false}
          >
            <h2>Save</h2>
            <IonIcon icon={cloudDownloadOutline} />
          </IonButton>
          <IonButton color="medium" onClick={() => cancelForm()}>
            <h2>Cancel</h2>
            <IonIcon icon={removeCircleOutline} />
          </IonButton>
        </div>
      </form>
    </IonContent>
  );
};

export default AddPage;
