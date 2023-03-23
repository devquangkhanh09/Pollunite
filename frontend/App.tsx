import app from './src/services/firebaseApp'
import { NavigationContainer } from "@react-navigation/native";
import {useState, useEffect} from 'react'
import {
    getAuth,
    onAuthStateChanged,
    User,
} from 'firebase/auth'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AuthStack from './src/navigator/AuthStack';
import TabNavigator from './src/navigator/TabNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, doc, getDoc, getFirestore } from 'firebase/firestore';

export default function App() {
    const [user, setUser] = useState<User|null>(null)

    useEffect(() => {
        onAuthStateChanged(getAuth(), async (_user) => {
            if (_user) {
              const userRef = doc(collection(getFirestore(), 'users'), _user?.uid);
              const userSnapshot = await getDoc(userRef);
              const userData = userSnapshot.data();
              await AsyncStorage.setItem('uid', _user?.uid);
              await AsyncStorage.setItem('name', userData?.name);
              await AsyncStorage.setItem('avatarUrl', userData?.imageUrl? userData?.imageUrl:"");
              setUser(_user);
            } else setUser(null);
        })
    }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user
        ? <TabNavigator />
        : <AuthStack />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
