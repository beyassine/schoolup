<template>
      <h1>{{ title }}</h1>
</template>

<script>

export default {
  name: 'H1',
  props: {
    title: String
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 0 0 40px ;
  color: black;
}
</style>

      