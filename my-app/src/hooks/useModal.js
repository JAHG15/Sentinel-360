import { useState } from 'react'

export default function useModal() {
  const [visible, setVisible] = useState(false)
  const open = () => setVisible(true)
  const close = () => setVisible(false)
  return { visible, open, close, setVisible }
}
