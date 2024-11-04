import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const useStore = create(
  devtools((set, get) => ({
    modal: '',
    setModal: (modal) => set({ modal }),
    notification: {},
    setNotification: (notification) => set({ notification }),
  }))
)
