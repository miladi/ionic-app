import { useContext, useEffect, useRef, useState } from "react";
import { ItemProps, ItemsContext } from "../itemsContext/ItemsContext";
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import "./Item.css";
import EditForm from "./EditForm";

interface ItemEditProp {
  item: ItemProps;
}

const Item: React.FC<ItemEditProp> = ({ item }) => {
  const { deleteItem } = useContext(ItemsContext);
  const [editItem, setEditItem] = useState(false);
  const ref = useRef<HTMLIonItemSlidingElement | null>(null);

  useEffect(() => {
    ref.current?.close();
  }, [editItem]);

  return (
    <>
      <div className="container">
        <IonItemSliding ref={ref}>
          <IonItem color="light">
            <IonLabel>
              <h3>{item.name}</h3>
            </IonLabel>
            <IonLabel>
              <h3>{item.type}</h3>
            </IonLabel>
            <IonLabel>
              <h3>${item.price}</h3>
            </IonLabel>
          </IonItem>

          <IonItemOptions side="end">
            <IonItemOption>
              <IonIcon
                slot="icon-only"
                icon={createOutline}
                onClick={() => setEditItem(true)}
              />
            </IonItemOption>

            <IonItemOption color="danger">
              <IonIcon
                slot="icon-only"
                icon={trashOutline}
                onClick={() => deleteItem(item)}
              />
            </IonItemOption>
          </IonItemOptions>
        </IonItemSliding>
      </div>

      {editItem && (
        <EditForm item={item} editItem={editItem} setEditItem={setEditItem} />
      )}
    </>
  );
};

export default Item;
