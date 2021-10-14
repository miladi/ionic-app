import { IonHeader, IonToolbar, IonGrid, IonRow, IonCol } from "@ionic/react";
import "./Header.css";

const Header: React.FC = () => (
  <IonHeader>
    <IonToolbar color="success">
      <h2 className="header">Items</h2>
    </IonToolbar>

    <IonToolbar color="light">
      <div className="subContainer">
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
      </div>
    </IonToolbar>

    <hr className="hr" />
  </IonHeader>
);

export default Header;
