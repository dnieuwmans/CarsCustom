<template>
    <div class="order-panel col">
        <h4>Order Payment</h4>
        <div class="alert alert-info">
            <i class="fas fa-info"></i>
            <strong>Note:</strong> we don't store your credit card information at all! It is only necessary in order to complete the payment.
        </div>
        <p>Please select the payment method of your choice.</p>

        <ul class="list-unstyled order-payment-method">
            <li v-for="paymentMethod in paymentMethodsEnum"
                :class="{ 'is-active' : selectedPaymentMethod === paymentMethod }"
                @click="selectPayment(paymentMethod)">
                <i class="fab" :class="`fa-cc-${paymentMethod}`"></i>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    enum paymentMethodsEnum {
        VISA = 'visa',
        STRIPE = 'stripe',
        MASTERCARD = 'mastercard',
        AMEX = 'amex',
        DISCOVER = 'discover',
        JCB = 'jcb',
        DINERS_CLUB = 'diners-club',
    }

    @Component({
        name: 'PaymentStep',
    })
    export default class PaymentStep extends Vue {
        public selectedPaymentMethod: string = '';
        public paymentMethodsEnum = paymentMethodsEnum;

        get order() {
            return this.$store.getters['Order/getOrder'];
        }

        public selectPayment(paymentMethod: string) {
            this.selectedPaymentMethod = paymentMethod;
        }
    }
</script>
