import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  const menu = ref(0)

  const switchMenu = (menuId: number) => {
    menu.value = menuId
  }

  return { menu, switchMenu }
})
