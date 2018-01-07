<template>
  <label class="radio" v-if="name && label && value" :for="id ? id : null">
    <input :id="id ? id : null" type="radio" :name="name" :value="value" :checked="checked"/>
    <span v-if="label" class="radio__label">{{label}}</span>
  </label>
</template>

<script>
  export default {
    name: 'v-radio',
    data () {
      return { };
    },
    props: {
      id:      { type: String, default: "" }, 
      name:    { type: String, required: true }, 
      value:   { type: String, required: true }, 
      label:   { type: String, required: true },
      checked: { type: Boolean, default: false }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .radio {
    @extend %radio-checkbox__container;

    &:before {
      border-radius: ($baseline / 1.2);
    }

    input[type=radio] {
      @extend %radio-checkbox__input;

      &:focus {
        
        + .radio__label {

          &:after {
            @extend %radio-checkbox__focus;
          }        
        }
      }

      &:checked {
        
        + .radio__label {

          &:before {
            transform: scale3d(1, 1, 1);
          }        
        }
      }

      + .radio__label {
        
        &:before {
          @extend %radio-checkbox__dot;
          transform: scale3d(0, 0, 0);
          transition: get_duration("short") transform cubic-bezier(get_easing(24));          
        }
      }
    }

    .radio__label {
      @extend %radio-checkbox__label;

      &:after {
        @extend %radio-checkbox__shape;
        border-radius: ($baseline / 1.2);
      }
    }

    [disabled] {
      @extend %disabled;

      & + * {
        @extend %disabled;
      }
    }
  }
</style>