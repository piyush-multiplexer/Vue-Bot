<template>
  <div class="UserBubbleWidget BubbleWidget">
    <div class="bubble-card">
      <div v-if="widgetData.input.name==='user_card'">
        <img :src="thombarUrl+widgetData.text[0].string.img_url" style="cursor: pointer"/>
        <div v-html="widgetData.text[0].string.val"></div>
      </div>
      <div v-else-if="widgetData.input.name==='user_buttons'">
        <v-icon dark class="float-left m-r-5">view_list</v-icon>
        <span>You Selected {{widgetData.text[0].string.name}}</span>
      </div>
      <div v-else-if="widgetData.input.name==='user_file'">
        <template v-if="fileExtensionValidater(widgetData.meta.type)">
          <img :src="widgetData.text[0].string">
          <div>{{widgetData.meta.name}} | {{widgetData.meta.size|fileSizeFilter }} KB</div>
        </template>
        <template v-else>
          <v-icon dark class="float-left m-r-5">attachment</v-icon>
          <span>{{widgetData.meta.name}} | {{widgetData.meta.size|fileSizeFilter }} KB</span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_location'">
        <v-icon dark class="float-left m-r-5">location_city</v-icon>
        <span v-text="widgetData.text[0].string.address"></span>
        <!--        <google-map  ref="map" :center="{lat:widgetData.text[0].string.lat,lng:widgetData.text[0].string.lng}" :zoom="10"-->
        <!--                    style="width: 100%; height: 300px; margin-bottom: 10px">-->
        <!--          <google-marker ref="marker"-->
        <!--            :position="{lat:widgetData.text[0].string.lat,lng:widgetData.text[0].string.lng}"></google-marker>-->
        <!--        </google-map>-->
      </div>
      <div v-else-if="widgetData.input.name==='user_calendar_picker'">
        <v-icon dark class="float-left m-r-5">calendar_today</v-icon>
        <span v-text="widgetData.text[0].string"></span>
      </div>
      <div v-else-if="widgetData.input.name==='user_date_picker'">
        <v-icon dark class="float-left m-r-5">date_range</v-icon>
        <span v-text="widgetData.text[0].string"></span>
      </div>
      <div v-else-if="widgetData.input.name==='user_time_picker'">
        <v-icon dark class="float-left m-r-5">access_time</v-icon>
        <span v-text="widgetData.text[0].string"></span>
      </div>
      <div v-else-if="widgetData.input.name==='user_email'">
        <v-icon dark class="float-left m-r-5">email</v-icon>
        <span v-text="widgetData.text[0].string"></span>
      </div>
      <div v-else-if="widgetData.input.name==='user_password'">
        <v-icon dark class="float-left m-r-5">lock</v-icon>
        <span v-text="widgetData.text[0].string"></span>
      </div>
      <div v-else-if="widgetData.input.name==='user_phone'">
        <v-icon dark class="float-left m-r-5">phone</v-icon>
        <span v-text="widgetData.text[0].string"></span>
      </div>
      <div v-else-if="widgetData.input.name==='user_rating'">
        <v-icon dark class="float-left m-r-5">star_rate</v-icon>
        <span v-text="widgetData.text[0].string"></span>
      </div>
      <div v-else-if="widgetData.input.name==='user_name'">
        <v-icon dark class="float-left m-r-5">person</v-icon>
        <span v-text="widgetData.text[0].string"></span>
      </div>
      <div v-else-if="widgetData.input.name==='user_search_suggestion'">
        <v-icon dark class="float-left m-r-5">search</v-icon>
        <span v-text="widgetData.text[0].string"></span>
      </div>

      <div v-else>
        <span>{{widgetData.text[0].string}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import EventBus from '../../plugins/eventBus'

  export default {
    name: 'UserBubbleWidget',
    props: ['widgetData'],
    data () {
      return {
        thombarUrl: 'http://thumbor.avinashi.com/unsafe/250x300/smart/',
      }
    },
    mounted () {
      let self = this
      let offset = 0
      // this.bubbles.forEach((bubble, bubbleIndex) => {
      //   setTimeout(function () {
      //     self.appendBubble(bubble, bubbleIndex)
      //   }, bubble.delay + offset)
      //   offset += bubble.delay
      // })
    },
    computed: {},
    methods: {
      fileExtensionValidater (fileExtension) {
        let flag = false;
        ['jpeg', 'jpg', 'png', 'gif', 'bmp'].every(extension => {
          if (fileExtension.toString().includes(extension))
            flag = true
        })
        return flag
      },
      checkBubble () {
        if (this.bubbles.length === this.localBubbles.length) {
          console.log(1)
          this.startTyping = false
          EventBus.$emit('AFTER_BUBBLE', { type: 'text' })
        }
      },
      appendBubble (bubble, bubbleIndex) {
        // if (bubbleIndex === 0 || bubbleIndex + 1 < this.bubbles.length) {
        this.localBubbles.push(bubble)
        // }
        if (bubbleIndex + 1 === this.bubbles.length) {
          this.startTyping = false
          EventBus.$emit('AFTER_BUBBLE', { type: 'text' })
        }
      },
    },
    filters: {
      fileSizeFilter (v) {
        return Math.round(v / 1024)
      },
    },
  }
</script>
<style>
  .light-gallery__modal {
    height: 100vh !important;
    z-index: 9999;
  }

  .loaded {
    width: 50% !important;
  }

  .light-gallery__container {
    transform: translate(-50%, 0%);
    top: calc(50vh - 25%);

  }
</style>
