export default function Button (props) {
  const { isOpen, linkText, onClose, onFocus, onOpen } = props
  const ariaExpanded = isOpen
  const onClick = isOpen ? onClose : onOpen
  const buttonText = isOpen
    ? 'Show submenu for ' + linkText
    : 'Hide submenu for ' + linkText
  const className = isOpen ? 'menu-item-button-close' : 'menu-item-button-open'

  return (
    <button
      aria-expanded={ariaExpanded}
      className={className}
      onClick={onClick}
      onFocus={onFocus}
      type="button"
    ><span className="visually-hidden">{buttonText}</span></button>
  )
}
