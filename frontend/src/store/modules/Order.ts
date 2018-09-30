import Car from '@/models/Car';

// Interfaces
interface State {
    selectedCar: Car | null;
    selectedColor: number | null;
}

interface Getters {
    getSelectedCar($state: any): Car;
    getSelectedColor($state: any): number;
}

interface Mutations {
    setSelectedCar($state: any, car: Car): void;
    setSelectedColor($state: any, color: number): void;
}

// Actions
const state: State = {
    selectedCar: null,
    selectedColor: null,
};

const getters: Getters = {
    getSelectedCar: $state => $state.selectedCar,
    getSelectedColor: $state => $state.selectedColor,
};

const mutations: Mutations = {
    setSelectedCar($state, car) {
        $state.selectedCar = car;
    },

    setSelectedColor($state, color) {
        $state.selectedColor = color;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
};