import create from 'zustand'
import { devtools } from 'zustand/middleware'

export const useStore = create(
  devtools((set, get) => ({
    modal: '',
    setModal: (modal) => set({ modal }),
    modalState: {},
    setModalState: (modalState) => set({ modalState }),
    notification: {},
    setNotification: (notification) => set({ notification }),
  }))
)
