export default function Button (props) {
  const { isOpen, onClose, onFocus, onOpen } = props

  const open = (
    <button
      className='menu-item-button-open'
      type="button"
      onFocus={onFocus}
      onClick={onOpen}
    >Open</button>
  )

  const close = (
    <button
      className='menu-item-button-close'
      type="button"
      onFocus={onFocus}
      onClick={onClose}
    >Close</button>
  )

  return isOpen ? close : open
}
