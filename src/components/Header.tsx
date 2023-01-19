import { IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { Route } from "react-router-dom";

interface HeaderProps { }



const Header: React.FC<HeaderProps> = () => {
  return (
  <>
    <IonHeader translucent>
      <IonToolbar className="toolbar">
        <IonTitle>ANIMET</IonTitle>
      </IonToolbar>
    </IonHeader>
  </>
  );
};

export default Header;


