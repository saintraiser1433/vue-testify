import { ref } from 'vue'

export const useCollapsiblesData = () => {
  const settingsData = ref([
    { routeName: 'Backup', tabName: 'Backup' },
    { routeName: 'Examinee', tabName: 'Examinee' }
  ])

  return { settingsData }
}
