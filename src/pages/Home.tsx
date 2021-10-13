import { useState, useContext } from "react";
import { ItemsContext } from "../itemsContext/ItemsContext";
import Header from "../components/Header";
import Item from "../components/Item";
import Modal from "../components/Modal";
import { IonContent, IonFab, IonFabButton, IonIcon } from "@ionic/react";
import { add } from "ionicons/icons";
import "./Home.css";

const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const { itemsArray } = useContext(ItemsContext);

  return (
    <>
      <Header />

      <IonContent>
        {!itemsArray.length ? (
          <div className="info">
            <div className="infoText">
              <h4>
                You do not have any products. Press the plus button below to add
                a new item.
              </h4>
            </div>
          </div>
        ) : (
          <>
            {itemsArray.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </>
        )}

        <Modal showModal={showModal} setShowModal={setShowModal} />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton>
            <IonIcon icon={add} onClick={() => setShowModal((prev) => !prev)} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </>
  );
};

export default Home;
