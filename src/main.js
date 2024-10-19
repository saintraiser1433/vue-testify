import './assets/main.css'

import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue-loading-overlay/dist/css/index.css'
import Loading from 'vue-loading-overlay'
import BaseCard from './components/UI/BaseCard.vue'
import BaseButton from './components/UI/BaseButton.vue'
import BaseTable from './components/UI/BaseTable.vue'
import BaseCollapsible from './components/UI/BaseCollapsible.vue'
import BaseList from './components/UI/BaseList.vue'
import BaseInput from './components/UI/BaseInput.vue'
import BaseBadge from './components/UI/BaseBadge.vue'
import BaseSwitch from './components/UI/BaseSwitch.vue'
import BaseSelector from './components/UI/BaseSelector.vue'
import BaseModal from './components/UI/BaseModal.vue'
import BaseTextArea from './components/UI/BaseTextArea.vue'
import BaseCheckBox from './components/UI/BaseCheckBox.vue'
import BaseLoader from './components/UI/BaseLoader.vue'
import BaseBreadCrumbs from './components/UI/BaseBreadCrumbs.vue'
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
app.component('loading-overlay', Loading)
app.component('BaseLoader', BaseLoader)
app.component('BaseBreadCrumbs', BaseBreadCrumbs)
/* Use */

app.use(router)
app.use(store)
app.use(VueSweetalert2)

/* Mount */
app.mount('#app')
