<template>
    <div class="row-action">
        <a href="#" @click.prevent.stop="toggleMenu()"><i class="far fa-ellipsis-h"></i></a>

        <div class="row-action__menu" :class="{ 'row-action__menu--open': menuOpen }">
        <slot name="content"></slot>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component({
        name: 'RowAction',
    })
    export default class RowAction extends Vue {
        public menuOpen: boolean = false;

        public toggleMenu() {
            this.menuOpen = !this.menuOpen;

            if (!this.menuOpen) {
                document.removeEventListener('click', this.toggleMenu);
            } else {
                document.addEventListener('click', this.toggleMenu);
            }
        }
    }
</script>