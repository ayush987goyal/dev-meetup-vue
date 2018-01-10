import Vue from 'vue';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import colors from 'vuetify/es5/util/colors';
import * as firebase from 'firebase';

import App from './App';
import AlertCmp from './components/Shared/Alert';
import EditMeetupDetailsDialogCmp from './components/Meetup/Edit/EditMeetupDetailsDialog';
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog';
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog';
import router from './router';
import { store } from './store';
import DateFilter from './filters/date';

Vue.use(Vuetify, {
  theme: {
    primary: colors.red.darken2,
    accent: colors.red.accent2,
    secondary: colors.grey.lighten1,
    info: colors.blue.lighten1,
    warning: colors.amber.darken2,
    error: colors.red.accent4,
    success: colors.green.lighten2,
  },
});

Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialogCmp);
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog);
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created() {
    firebase.initializeApp({
        apiKey: 'AIzaSyA9s0X1um2Lqdn_32bQ-84egZb8hCBLXWo',
        authDomain: 'vuejs-http-dcd62.firebaseapp.com',
        databaseURL: 'https://vuejs-http-dcd62.firebaseio.com',
        projectId: 'vuejs-http-dcd62',
        storageBucket: 'gs://vuejs-http-dcd62.appspot.com',
        messagingSenderId: '753953592343',
    });
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.$store.dispatch('autoSignIn', user);
        }
    });
    this.$store.dispatch('loadMeetups');
  },
});
