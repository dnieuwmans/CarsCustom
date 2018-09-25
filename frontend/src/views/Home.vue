<template>
  <div class="home">
    <header class="home-header">

    <div class="container">
      <div class="row">
        <div class="col header-nav">
          <div class="header-nav__logo logo logo--white">
            <main-logo></main-logo>
          </div>

          <div class="header-nav__menu">
            <ul class="list-unstyled">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">Explore Cars</a></li>
              <li><a href="#"><i class="far fa-user"></i></a></li>
            </ul>
        </div>
      </div>
      </div>

      <div class="row">
        <div class="col header-text">
          <h1>Buy your dream car today!</h1>
          <h4>Choose from 4 exclusive cars.</h4>
          <p class="text-center">
            <a href="#" class="btn btn-lg btn-outline">
              <span>Explore</span>
              <i class="far fa-map"></i>
            </a>
            </p>
        </div>
      </div>
    </div>

    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src
import MainLogo from "@/components/MainLogo.vue";

import CarApi from '@/api/CarApi';

@Component({
  components: {
    HelloWorld,
    MainLogo
  }
})
export default class Home extends Vue {
  public totalCars: Number = 0;

  public mounted() {
    


    CarApi.findAll().then((response) => {
      console.log(response);
    })
  }
}
</script>
