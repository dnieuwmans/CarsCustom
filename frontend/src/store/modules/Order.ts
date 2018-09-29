import Car from '@/models/Car';

// Interfaces
interface State {
    selectedCar: Car | null;
}

interface Getters {
    getSelectedCar($state: any): Car;
}

interface Mutations {
    setSelectedCar($state: any, car: Car): void;
}

// Actions
const state: State = {
    selectedCar: null,
};

const getters: Getters = {
    getSelectedCar: $state => $state.selectedCar,
};

const mutations: Mutations = {
    setSelectedCar($state, car) {
        $state.selectedCar = car;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
};