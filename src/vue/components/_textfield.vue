<template>
  <label class="textfield" v-if="name && label" :for="id ? id : null">
    <input type="text" :id="id ? id : null" :name="name" :placeholder="placeholder ? placeholder : null" :disabled="disabled ? disabled : null">
    <span class="textfield__label">{{label}}</span>
  </label>
</template>

<script>
  export default {
    name: 'v-textfield',
    data () {
      return { };
    },
    props: {
      id:          { type: String, default: "" }, 
      name:        { type: String, required: true },  
      label:       { type: String, required: true },
      placeholder: { type: String, default: "" },
      disabled:    { type: Boolean, default: false } 
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .textfield {
    @extend %textfield-select__container;

    input {
      @extend %textfield-select__shape;
      @extend %textfield-select__height;
    }

    .textfield__label {
      @extend %textfield-select__label;
    }

    *:focus {
      @extend %textfield-select__focus;
    }

    [disabled] {
      @extend %disabled;

      & + * {
        @extend %disabled;
      }
    }
  }
</style>