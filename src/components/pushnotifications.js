import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    fcmToken();
  }
}

const fcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken')
  console.log(fcmToken, 'the Old Token');
  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log(fcmToken, "the new one");
        await AsyncStorage.setItem('fcmtoken', fcmToken)
      }
    } catch (error) {
      console.log("Error in Fcm Token", error);
    }
  }
};

export const notificationListener = async () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  messaging().onMessage(async remoteMessage => {
    console.log("Message received in freground", remoteMessage);
  })

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type);
      }
      // setLoading(false);
    });
}
