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
                location: 'New York',
                description: 'New York, New York',
            },
            {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg',
                id: 'ewtfgbeeergfvfdgef',
                title: 'Meetup in Paris',
                date: '2017-07-19',
                location: 'Paris',
                description: 'It is Paris',
            },
        ],
        user: {
            id: 'sdfgwergwfgd',
            registeredMeetups: ['ewtfgbeeergfvfdgef'],
        },
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload);
        },
    },
    actions: {
        createMeetup({ commit }, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 'sdafsdgevegv',
            };
            // Reach out to firebase and store it
            commit('createMeetup', meetup);
        },
    },
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
