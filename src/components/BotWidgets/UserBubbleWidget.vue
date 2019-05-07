<template>
  <div class="UserBubbleWidget BubbleWidget">
    <div class="bubble-card">
      <div v-if="widgetData.input.name==='user_card'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <img :src="thombarUrl+widgetData.text[0].string.img_url"
               style="cursor: pointer;border: 3px solid white;border-radius: 15px;border-top-right-radius:0;"/>
          <div v-html="widgetData.text[0].string.val"></div>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_buttons'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>view_list</v-icon>
          <span>You Selected {{widgetData.text[0].string}}</span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_calendar_picker'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>calendar_today</v-icon>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_date_picker'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>date_range</v-icon>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_time_picker'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>access_time</v-icon>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_email'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>email</v-icon>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_password'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>lock</v-icon>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_phone'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>phone</v-icon>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_rating'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>star</v-icon>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_name'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>person</v-icon>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_search_suggestion'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-icon class="float-left m-r-5" dark>search</v-icon>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_custom_text'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <span v-text="widgetData.text[0].string"></span>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_file'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <template v-if="fileExtensionValidater(widgetData.meta.type)">
            <v-img :src="widgetData.text[0].string"
                   max-height="200">
              <template v-slot:placeholder>
                <v-layout align-center fill-height justify-center ma-0>
                  <v-progress-circular color="grey lighten-5" indeterminate></v-progress-circular>
                </v-layout>
              </template>
            </v-img>
            <div>{{widgetData.meta.name}} | {{widgetData.meta.size|fileSizeFilter }} KB</div>
          </template>
          <template v-else>
            <v-icon class="float-left m-r-5" dark>attachment</v-icon>
            <span>{{widgetData.meta.name}} | {{widgetData.meta.size|fileSizeFilter }} KB</span>
          </template>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_take_photo'">
        <template v-if="widgetData.text[0].string==='skipped'">
          <span>SKIPPED</span>
        </template>
        <template v-else>
          <v-img :src="widgetData.text[0].string"
                 max-height="200">
            <template v-slot:placeholder>
              <v-layout align-center fill-height justify-center ma-0>
                <v-progress-circular color="grey lighten-5" indeterminate></v-progress-circular>
              </v-layout>
            </template>
          </v-img>
          <div>{{widgetData.meta.name}} | {{widgetData.meta.size|fileSizeFilter }} KB</div>
        </template>
      </div>
      <div v-else-if="widgetData.input.name==='user_location'">
        <v-icon class="float-left m-r-5" dark>location_city</v-icon>
        <span v-text="widgetData.text[0].string.address"></span>
        <!--        <google-map  ref="map" :center="{lat:widgetData.text[0].string.lat,lng:widgetData.text[0].string.lng}" :zoom="10"-->
        <!--                    style="width: 100%; height: 300px; margin-bottom: 10px">-->
        <!--          <google-marker ref="marker"-->
        <!--            :position="{lat:widgetData.text[0].string.lat,lng:widgetData.text[0].string.lng}"></google-marker>-->
        <!--        </google-map>-->
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
        ['jpeg', 'jpg', 'png', 'gif', 'bmp'].forEach((extension) => {
          if (fileExtension.toString().includes(extension)) {
            flag = true
          }
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
