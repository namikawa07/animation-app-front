import { IonPage} from '@ionic/react';
import './Home.css';

import Header from '../components/Header'
import VideoContentList from '../components/video/content/List';

const Home: React.FC = () => {
  return (
    <IonPage>
    <Header></Header>
     <VideoContentList></VideoContentList>
    </IonPage>
  );
};

export default Home;