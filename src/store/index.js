import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [{
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
                id: 'ewtevfdgef',
                title: 'Meetup in New York',
                date: '2017-07-17',
            },
            {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg',
                id: 'ewtfgbeeergfvfdgef',
                title: 'Meetup in Paris',
                date: '2017-07-19',
            },
        ],
        user: {
            id: 'sdfgwergwfgd',
            registeredMeetups: ['ewtfgbeeergfvfdgef'],
        },
    },
    mutations: {},
    actions: {},
    getters: {
        loadedMeetups(state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => meetupA.date > meetupB.date);
        },
        featuredMeetups(state, getters) {
            return getters.loadedMeetups.slice(0, 5);
        },
        loadedMeetup(state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId;
                });
            };
        },
    },
});
