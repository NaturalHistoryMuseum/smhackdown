<template>
<div>
  <div class="container">
    <div class="row">
      <div v-for="object in objects" class="col-xs-6">
        <img class="img-responsive" :src="object.image_url" :alt="object.name" />
      </div>      
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'Choice',
  data () {
    return {
      objects: []
    }
  },
  created () {
    this.fetchData()
  },  
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      var endpoint = this.$config.api + '/objects'
      console.log('FETCH')
      $.get(endpoint, function( data ) {
        console.log(data)
        this.objects = data
      }.bind(this));          
    }
  }  
}
</script>