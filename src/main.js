import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const BaseCard = defineAsyncComponent(() => import('./components/UI/BaseCard.vue'))
const BaseButton = defineAsyncComponent(() => import('./components/UI/BaseButton.vue'))
const BaseTable = defineAsyncComponent(() => import('./components/UI/BaseTable.vue'))
const BaseCollapsible = defineAsyncComponent(() => import('./components/UI/BaseCollapsible.vue'))
const BaseList = defineAsyncComponent(() => import('./components/UI/BaseList.vue'))
const BaseInput = defineAsyncComponent(() => import('./components/UI/BaseInput.vue'))
const BaseBadge = defineAsyncComponent(() => import('./components/UI/BaseBadge.vue'))
const BaseSwitch = defineAsyncComponent(() => import('./components/UI/BaseSwitch.vue'))
const BaseSelector = defineAsyncComponent(() => import('./components/UI/BaseSelector.vue'))
const BaseModal = defineAsyncComponent(() => import('./components/UI/BaseModal.vue'))
const BaseTextArea = defineAsyncComponent(() => import('./components/UI/BaseTextArea.vue'))
const BaseCheckBox = defineAsyncComponent(() => import('./components/UI/BaseCheckBox.vue'))

/* Components */
const app = createApp(App)
app.component('BaseCard', BaseCard)
app.component('BaseButton', BaseButton)
app.component('BaseTable', BaseTable)
app.component('BaseCollapsible', BaseCollapsible)
app.component('BaseList', BaseList)
app.component('BaseInput', BaseInput)
app.component('BaseBadge', BaseBadge)
app.component('BaseSwitch', BaseSwitch)
app.component('BaseSelector', BaseSelector)
app.component('BaseModal', BaseModal)
app.component('BaseTextArea', BaseTextArea)
app.component('BaseCheckBox', BaseCheckBox)
/* Use */

app.use(router)
app.use(store)
app.use(VueSweetalert2)
/* Mount */
app.mount('#app')
