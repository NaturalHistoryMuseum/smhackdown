<template>
  <div>
    <nav class="navbar navbar-inverse">
      <div class="container-fluid">
        <div class="navbar-header">
          <div class="row">
            <div class="col-xs-2">
             <div class="dropdown">
                <a class="dropdown-toggle" type="button" data-toggle="dropdown">
                  <span class="glyphicon glyphicon-menu-hamburger"></span>
                </a>
                <ul class="dropdown-menu">
                  <li><a @click="setStep(0, $event)">Home</a></li>
                  <li><a @click="setStep(1, $event)">Hot or Not</a></li>
                  <li><a @click="setStep(2, $event)">Top 10</a></li>
                  <li><a @click="setStep(3, $event)">Top institution</a></li>
                </ul>
              </div>              
            </div>
            <div class="col-xs-10">
              <h1 v-html="title"></h1>
            </div>                      
          </div>            
        </div>      
      </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
          <div v-if="isCurrentStep(0)">
            <div class="text-center intro">
              <h1>What object is HOT? What object is NOT?</h1>
              <h2>Four world class Museums compete for your love.</h2>
              <h2>Simply tap the picture you <span class="glyphicon glyphicon-heart"></span></h2>              
            </div>

            <div class="row">
              <div class="col-md-6 text-center grey-bg clickable" @click="setStep(2, $event)">
                <h1>View top ten</h1>            
              </div>
              <div class="col-md-6 text-center grey-bg clickable" @click="next()">
                <h1>Get started</h1>
              </div>
            </div>

          </div>
          <div v-else-if="isCurrentStep(1)">
            <div v-if="Object.keys(likedObject).length" class="text-center">
              <h1>You <span class="glyphicon glyphicon-heart"></span> {{ likedObject.name }}</h1>
              <img class="img-small" :src="likedObject.image_url" :alt="likedObject.name" />
              <p><a target="_blank" :href="likedObject.object_url">View {{ likedObject.institution }} object</a></p>
              <button type="button" class="btn btn-default" @click="setStep(2, $event)">
              View top ten
              </button>
              <button type="button" class="btn btn-default" @click="chooseAgain()">
              Choose again
              </button>           
            </div>   
            <div v-else>
              <div v-for="object in objectsList" class="col-xs-6 no-margin clickable">
                <img @click="like(object)" class="img-responsive" :src="object.image_url" :alt="object.name" />
              </div>   
            </div>              
          </div>    
          <div v-else-if="isCurrentStep(2)" class="topten">
            <table class="table table-striped table-hover">
            <tr v-for="(object, idx) in toptenList" class="topten">
              <td class="col-md-2 text-right"><span class="btn btn-success">{{ idx + 1 }}</span></td>
              <td class="col-md-4 text-center"><img :src="object.image_url" :alt="object.name" /></td>
              <td class="col-md-6">
                <h3>{{ object.name }}</h3>
                <h4><span class="glyphicon glyphicon-heart"></span> {{ object.likes_count }}</h4>
                <p><a target="_blank" :href="object.object_url">View {{ object.institution }} object</a></p>
              </td>
            </tr>
            </table>
          </div>             
          <div v-else>

            <table class="table table-striped table-hover institution" cellpadding="10">
              <tr v-for="institution in institutionsList">
                <td class="institution-logo">
                  <img :src="assetPath(institution.logo)" :alt="institution.name" :title="institution.name">
                </td>
                <td class="institution-likes">
                  <span class="glyphicon glyphicon-heart"></span> {{ institution.likes_count }}
                </td>
              </tr>              
            </table>

            <img class="hidden" src="../assets/British_Museum_Logo.jpg">
            <img class="hidden" src="../assets/ScienceMuseum.png">
            <img class="hidden" src="../assets/new-nhm-logo.gif">
            <img class="hidden" src="../assets/vanda.png">            
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
      objectsList: [],
      toptenList: [],
      institutionsList: [],
      likedObject: {}
    }
  },
  computed: {
    title: function () { 
      switch(this.currentStep) {
        case 1:
          return 'HOT<span>OR</span>NOT'
        break;
        case 2:
          return 'TOP<span>TEN</span>'
        break;
        case 3:
          return 'TOP<span>INSTITUTION</span>'
        break;        
        default:
          return 'SMHACK<span>DOWN</span>'
        break;
      }  
    },       
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
      this.objects = []
      var endpoint = this.$config.api + '/objects'
      this.$http.get(endpoint)
      .then( function(response) { 
          this.objectsList = response.body
      }) 
      .catch( function(error) { 
          console.error(error); 
      });          
    },
    chooseAgain(){
      this.objects = []
      this.fetchOptions();
      this.likedObject = {}
    },
    like(object){
      this.likedObject = object
      var endpoint = this.$config.api + '/objects' 
      var data = {
        object_id: object.id
      }
      this.$http.post(endpoint, data)
      .then( function(response) { 
          console.log("LIKED")
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
    },
    fetchInstitutions () {
      var endpoint = this.$config.api + '/institutions'
      this.$http.get(endpoint)
      .then( function(response) { 
          this.institutionsList = response.body
      }) 
      .catch( function(error) { 
          console.error(error); 
      });          
    },    
    onStepChange(){
      this.likedObject = {}
      switch(this.currentStep) {
        case 1:
          this.fetchOptions()
        break;
        case 2:
          this.fetchTopTen()
        break;
        case 3:
          this.fetchInstitutions()
        break;        
      }  
    },
    assetPath(asset){
      return 'dist/' + asset;
    }
  }, 
}
</script>

<style src="../sass/app.scss" lang="scss"></style>


