import BotData from '../data/BotData'

export default class VueBot {
  constructor () {
    this.bot_messages = BotData.bot
    this.user_messages = BotData.user
    this.bot_config = BotData.config
    this.bot_index = 0
    this.user_index = 0
  }

  getConfig () {
    return this.bot_config
  }

  setData (value) {
    this.user_messages[this.user_index].data.inputText = value
  }

  getNextUserData () {
    return this.user_messages[this.user_index++]
  }

  getNextBotData () {
    return this.bot_messages[this.bot_index++]
  }

  addMessage () {

  }

}
