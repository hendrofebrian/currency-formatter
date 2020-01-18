<template>
  <v-card class="mx-auto" width="344">
    <v-card-text>
      <p class="display-1 text--primary inline-content">
        {{ title }}
      </p>
      <p class="display-1 text--primary result-total inline-content">
        {{ resultTotal }}
      </p>
      <div class="text--primary italic">
        {{ description }}
      </div>
      <div class="text--primary italic">{{ conversionResult }}</div>
    </v-card-text>
    <v-btn @click="remove(title)" class="btn-remove red">(-)</v-btn>
  </v-card>
</template>
<script>
export default {
  props: {
    title: {
      required: true,
      type: String,
      default: 'IDR'
    },
    description: {
      required: true,
      type: String,
      default: 'IDR - Indonesian Rupiahs'
    },
    resultTotal: {
      required: true,
      type: String,
      default: '100000'
    },
    conversionResult: {
      required: true,
      type: String,
      default: '1000000'
    },
    remove: {
      required: true,
      type: Function,
      default: () => {}
    }
  }
}
</script>
<style scoped>
.inline-content {
  display: inline-block;
}
.result-total {
  padding-left: 40px;
  padding-right: 60px;
  float: right;
}
.italic {
  font-style: italic;
}
.btn-remove {
  position: absolute;
  top: 0%;
  right: 0;
  height: 100%;
}
.btn-remove.red.v-btn.v-btn--contained.theme--dark.v-size--default {
  height: 100%;
}
</style>
