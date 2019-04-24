<template>
  <div class="PasswordWidget">
    <div v-if="showWidget" class="animated slideInUp bot-animated-card" @keyup.enter="setPasswordValue">
      <div class="widget-question">Enter Password</div>
      <v-layout row wrap>
        <v-flex xs10 md10>
          <v-text-field required ref="password" prepend-inner-icon="vpn_key" class="bot-text-field" outline
                        v-model="password"
                        type="password"></v-text-field>
        </v-flex>
        <v-flex xs2 md2 class="text-center">
          <v-btn class="bot-button-round" @click.once="setPasswordValue" :disabled="!password.length" fab flat icon>
            <v-icon style="transform:rotate(-45deg) ">send</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>

  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'PasswordWidget',
    props: ['widgetData'],
    data () {return { password: '', showWidget: false, clicked: false }},
    mounted () {
      let self = this
      EventBus.$on('AFTER_BUBBLE', function () {
        self.showWidget = true
        setTimeout(function () { self.$refs.password.focus() }, 200)
      })
    },
    methods: {
      setPasswordValue () {
        let self = this
        if (this.password.length && !this.clicked) {
          this.clicked = true
          $(this.$el).addClass('animated bounceOutDown')
          setTimeout(function () {
            self.$parent.sendMessage(self.password)
            self.$destroy()
            self.$el.parentNode.removeChild(self.$el)
          }, 500)
        }
      },
    },
  }
</script>

<style scoped>

</style>
