import { Order, stepsEnum } from '@/models/Order';
import OrderUser from "@/models/OrderUser";

// TODO: Maybe add the steps too
// TODO: remove selected car and color

// Interfaces
interface State {
    order: Order | null;
}

interface Getters {
   getOrder($state: any): Order;
}

interface Mutations {
    setSelectedColor($state: any, color: number): void;
    setOrder($state: any, order: Order): void;
    nextStep($state: any): void;
    previousStep($state: any): void;
    updateOrderUser($state: any, orderUser: OrderUser): void;
    removeOrder($state: any): void;
}

// Actions
const state: State = {
    order: null,
};

const getters: Getters = {
    getOrder: $state => $state.order,
};

const mutations: Mutations = {
    setSelectedColor($state, color) {
        $state.order.selectedColor = color;

        // Add it to the store
        store($state.order);
    },

    setOrder($state, order) {
        $state.order = order;

        // Add it to the store
        store($state.order);
    },

    nextStep($state) {
        $state.order.steps[$state.order.activeStep - 1].completed = 100;

        if ($state.order.activeStep !== stepsEnum.SUMMARY) {
            $state.order.activeStep += 1;
        }

        // Add it to the store
        store($state.order);
    },

    previousStep($state) {
        $state.order.steps[$state.order.activeStep - 2].completed = 0;

        if ($state.order.activeStep !== stepsEnum.COLOR) {
            $state.order.activeStep -= 1;
        }

        // Add it to the store
        store($state.order);
    },

    updateOrderUser($state, orderUser) {
        $state.order.orderUser = orderUser;

        // Add it to the store
        store($state.order);
    },

    removeOrder($state) {
        $state.order = null;
        localStorage.removeItem('order');
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
};

const store = (order: any) => {
    // Yes I know what I am doing!
    // @ts-ignore-line
    localStorage.setItem('order', JSON.stringify(order));
};
