import Vue from 'nativescript-vue'
import Home from './components/Home.vue'

declare let __DEV__: boolean;

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = true

new Vue({
  render: (h) => h('frame', [h(Home)]),
}).$start()



console.log("INIT APP")
import {firebase} from '@nativescript/firebase-core'
import '@nativescript/firebase-messaging'
import {AuthorizationStatus} from "@nativescript/firebase-messaging"; // only needs to be imported 1x


async function requestUserPermission() {
  const authStatus = await firebase()
    .messaging()
    .requestPermission({
      android: {
        alert: true
      }
    })

  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL
  console.log(enabled)
  if (enabled) {
    console.log('Authorization status:', authStatus)

    const didRegister = await firebase().messaging().registerDeviceForRemoteMessages()
    console.log(didRegister)
    console.log(await firebase()
      .messaging().getToken())
  }
}

requestUserPermission();

firebase()
  .messaging()
  .onMessage(async (remoteMessage) => {
    console.log("onMessage MESSAGEEE!!!!!!")
  });


