import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import "./Header.css";

const Header: React.FC = () => (
  <IonHeader>
    <IonToolbar>
      <IonTitle>Items</IonTitle>
    </IonToolbar>

    <IonGrid>
      <IonRow>
        <IonCol>
          <div className="ion-text-center">
            <h6>Name</h6>
          </div>
        </IonCol>
        <IonCol>
          <div className="ion-text-center">
            <h6>Type</h6>
          </div>
        </IonCol>
        <IonCol>
          <div className="ion-text-center">
            <h6>Price</h6>
          </div>
        </IonCol>
      </IonRow>
    </IonGrid>

    <hr className="hr" />
  </IonHeader>
);

export default Header;
