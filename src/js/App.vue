<template>
  <div>
    <div v-if="isCurrentStep(0)">
      WELCOME!!

      <button type="button" class="btn" @click="next()">
        <i class="fa fa-arrow-right" aria-hidden="true"></i>Next
      </button>

    </div>
    <div v-else-if="isCurrentStep(1)">
      <div v-for="object in objects" class="col-xs-6">
        <img class="img-responsive" :src="object.image_url" :alt="object.name" />
      </div>   
    </div>    
    <div v-else>
      TOP 10
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      currentStep: 0,
      objects: []
    }
  },
  methods: {
    isCurrentStep (step) {
      return step == this.currentStep;          
    },
    next () {
      this.currentStep++;
      switch(this.currentStep) {
        case 1:
          this.fetchOptions()
        break;
        case 2:
          this.fetchTopTen()
        break;
      }      
    },
    fetchOptions () {
      var endpoint = this.$config.api + '/objects'
      this.$http.get(endpoint)
      .then( function(response) { 
          this.objects = response.body
      }) 
      .catch( function(error) { 
          console.error(error); 
      });          
    },
    fetchTopTen () {
      var endpoint = this.$config.api + '/top-ten'
      this.$http.get(endpoint)
      .then( function(response) { 
          this.toptenList = response.body
      }) 
      .catch( function(error) { 
          console.error(error); 
      });          
    }      
  }    
}
</script>

<style src="../sass/app.scss" lang="scss"></style>


