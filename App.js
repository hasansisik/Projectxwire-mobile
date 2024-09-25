import "react-native-gesture-handler";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Main from "./Main";
import "./locales/i18n";
import { LogLevel, OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";

export default function App() {
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(Constants.expoConfig.extra.oneSignalAppId);

    // Bildirim izinlerini isteme
    OneSignal.Notifications.requestPermission(true);
    OneSignal.User.pushSubscription.getPushSubscriptionId();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}
