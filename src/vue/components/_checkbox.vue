<template>
  <label class="checkbox" v-if="name && label && value" :for="id ? id : null">
    <input :id="id ? id : null" type="checkbox" :name="name" :value="value" :checked="checked"/>
    <span v-if="label" class="checkbox__label">{{label}}</span>
  </label>
</template>

<script>
  export default {
    name: 'v-checkbox',
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

  .checkbox {
    @extend %radio-checkbox__container;
    
    &:before {
      border-radius: $border-radius--sm;
    }

    .checkbox__label {
      @extend %radio-checkbox__label;

      &:after {
        border-radius: $border-radius--sm;
        @extend %radio-checkbox__shape;
      }    
    }

    input[type=checkbox] {
      @extend %radio-checkbox__input;
      
      &:checked {
        
        + .checkbox__label {
          
          &:before {
            transform: scale3d(1, 1, 1);
          }
        }
      }

      &:focus {

        + .checkbox__label {
          
          &:after {
            @extend %radio-checkbox__focus;
          }
        }
      }

      + .checkbox__label {
        
        &:before {
          @extend %radio-checkbox__checkmark;
          transform: scale3d(0, 0, 0);
          transition: transform get_duration("short") cubic-bezier(get_easing(12));
        }
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