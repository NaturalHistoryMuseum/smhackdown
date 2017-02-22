<template>
  <div>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <div class="row">
            <div class="col-md-2">
             <div class="dropdown">
                <a class="dropdown-toggle" type="button" data-toggle="dropdown">
                  <span class="glyphicon glyphicon-menu-hamburger"></span>
                </a>
                <ul class="dropdown-menu">
                  <li><a @click="setStep(1, $event)">Hot or Not</a></li>
                  <li><a @click="setStep(2, $event)">Top 10</a></li>
                  <li><a @click="setStep(3, $event)">Top institution</a></li>
                </ul>
              </div>              
            </div>
            <div class="col-md-10">
              <h1>HOT<span>OR</span>NOT</h1>
            </div>            
            
          </div>            
        </div>      
      </div>
    </nav>

    <div class="container-fluid">
        <div class="row">


        </div>          
    </div>
    <div class="container-fluid">
        <div class="row">
          <div v-if="isCurrentStep(0)">
            WELCOME!!

            <button type="button" class="btn btn-default" @click="next()">
              <i class="fa fa-arrow-right" aria-hidden="true"></i>Next
            </button>

          </div>
          <div v-else-if="isCurrentStep(1)">
            <div v-for="object in objects" class="col-xs-6 no-margin">
              <img @click="like(object.id)" class="img-responsive" :src="object.image_url" :alt="object.name" />
            </div>   
          </div>    
          <div v-else-if="isCurrentStep(2)">
            TOP 10
          </div>             
          <div v-else>
            TOP INST
          </div>         
        </div>          
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
      this.onStepChange();
    },
    setStep (step, event) {
      this.currentStep = step;
      event.preventDefault()
      this.onStepChange();
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
    like(option){
      console.log(option)
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
    },
    onStepChange(){
      switch(this.currentStep) {
        case 1:
          this.fetchOptions()
        break;
        case 2:
          this.fetchTopTen()
        break;
      }  
    }      
  }, 
}
</script>

<style src="../sass/app.scss" lang="scss"></style>


