<template>
  <label class="select" v-if="name && label" :for="id ? id : null">
    <select :id="id ? id : null" :name="name" :disabled="disabled ? disabled : null">
      <slot></slot>
    </select>
    <span class="select__label">{{label}}</span>
  </label>
</template>

<script>
  export default {
    name: 'v-select',
    data () {
      return { };
    },
    props: {
      id:       { type: String, default: "" },
      name:     { type: String, required: true },
      label:    { type: String, required: true },      
      disabled: { type: Boolean, default: false } 
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .select {
    @extend %textfield-select__container;

    [disabled] {
      @extend %disabled;

      & + * {
        @extend %disabled;
      }
    }

    select {
      @extend %textfield-select__shape;
      @extend %textfield-select__height;
      background-position: top ($baseline / 1.2) right ($baseline / 2.4);
      background-repeat: no-repeat;

      // Remove browser defult apperance on select element in IE 
      &::-ms-expand {
        display: none;
      }

      &:focus {
        @extend %textfield-select__focus;
        
        + .select__label {
          
          &:after {
            border-top-color: $theme-color;
            transform: rotate(-180deg);
          }    
        }
      }

      option[disabled] {
        background-color: $grey-color;
      }
    }

    .select__label {
      @extend %textfield-select__label;
    
      &:after {
        content: '';
        border-left: ($baseline / 4) solid transparent;
        border-right:($baseline / 4) solid transparent;
        border-top: ($baseline / 4) solid $hint-text-color;
        height: 0;
        width: 0;
        margin-top: (($baseline / 4.8) * -1);
        position: absolute;
        right: ($baseline / 2.4);
        bottom: ((($baseline / 2.4) + ($baseline / 8)) * -1);
        transition: transform get_duration("short") cubic-bezier(get_easing(12));

        @include desktop() {
          border-left-width: ($baseline / 3);
          border-right-width:($baseline / 3);
          border-top-width: ($baseline / 3);
        }
      }    
    }
  }
</style>