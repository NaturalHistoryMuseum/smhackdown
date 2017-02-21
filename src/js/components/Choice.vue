<template>
<div>
    CHOICE
</div>
</template>

<script>
export default {
  name: 'Choice',
  data () {
    return {
      images: []
    }
  },
  mounted: function() {
    console.log(this.$config.api)
    // var path = require('path')
    // var apiEndpoint = path.join(this.$config.api.host, this.$config.api.prefix)
    // this.$http.get(this.apiEndpoint, {
    //     // Update schemas 
    //     }).then(response => {
    //       this.schemas = response.body
    //     }, response => {
    //       console.log('Fetch Failed')
    //     })
  },
}
</script>