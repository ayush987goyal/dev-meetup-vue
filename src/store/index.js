import Vue from 'vue';
import Vuex from 'vuex';
import * as firebase from 'firebase';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [{
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
                id: 'ewtevfdgef',
                title: 'Meetup in New York',
                date: new Date(),
                location: 'New York',
                description: 'New York, New York',
            },
            {
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Paris_vue_d%27ensemble_tour_Eiffel.jpg',
                id: 'ewtfgbeeergfvfdgef',
                title: 'Meetup in Paris',
                date: new Date(),
                location: 'Paris',
                description: 'It is Paris',
            },
        ],
        user: null,
        loading: false,
        error: null,
    },
    mutations: {
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload);
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        clearError(state) {
            state.error = null;
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
        signUserUp({ commit }, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    (user) => {
                        commit('setLoading', false);
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: [],
                        };
                        commit('setUser', newUser);
                    },
                )
                .catch(
                    (error) => {
                        commit('setLoading', false);
                        commit('setError', error.message);
                    },
                );
        },
        signUserIn({ commit }, payload) {
            commit('setLoading', true);
            commit('clearError');
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(
                (user) => {
                    commit('setLoading', false);
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                    };
                    commit('setUser', newUser);
                },
            )
            .catch(
                (error) => {
                    commit('setLoading', false);
                    commit('setError', error.message);
                },
            );
        },
        clearError({ commit }) {
            commit('clearError');
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
