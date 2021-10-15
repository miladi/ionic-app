import { useContext } from "react";
import { ItemsContext } from "../itemsContext/ItemsContext";
import Header from "../components/Header";
import Item from "../components/Item";
import {
  IonApp,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from "@ionic/react";
import { useIonRouter } from "@ionic/react";
import { add } from "ionicons/icons";
import "./Home.css";

const Home: React.FC = () => {
  const { itemsArray } = useContext(ItemsContext);
  const router = useIonRouter();

  return (
    <IonApp>
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
              <Item key={item.name} item={item} />
            ))}
          </>
        )}

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color="success">
            <IonIcon icon={add} onClick={() => router.push("/add")} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonApp>
  );
};

export default Home;
