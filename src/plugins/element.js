import Vue from 'vue'
import { Button, pagination, inputNumber, Message, MessageBox } from 'element-ui'

Vue.use(Button)
Vue.use(pagination)
Vue.use(inputNumber)
Vue.prototype.$message = Message
Vue.prototype.$alert = MessageBox.alert