import Button from 'base/components/WpMenu/Button'
import ItemText from 'base/components/WpMenu/ItemText'
import expandPath from 'base/components/WpMenu/expandPath'
import makePath from 'base/components/WpMenu/makePath'

export default function Item (props) {
  const {
    activePath,
    children,
    currentPath,
    setFocusPath,
    setActivePath,
    id,
    linkText,
    parentDepth,
    parentPath,
    src
  } = props

  const depth = parentDepth + 1
  const handleItemFocus = () => setFocusPath(path)
  const hasChildren = children?.length > 0
  const isOpen = expandPath(activePath).includes(id)
  const path = makePath([ parentPath, id ])

  return (
    <li>
      <span className="menu-item">
        <ItemText
          currentPath={currentPath}
          onFocus={handleItemFocus}
          linkText={linkText}
          src={src}
        />
        {hasChildren && (<Button
          isOpen={isOpen}
          linkText={linkText}
          onClose={() => { setActivePath(parentPath) }}
          onFocus={handleItemFocus}
          onOpen={() => { setActivePath(path) }}
        />)}
      </span>

      {hasChildren && (
        <ul
          className="submenu"
          data-menu-depth={depth}
          data-menu-is-open={isOpen}
        >
          {children.map(item => {
            return <Item
              activePath={activePath}
              currentPath={currentPath}
              key={item.id}
              setFocusPath={setFocusPath}
              setActivePath={setActivePath}
              parentDepth={depth}
              parentPath={path}
              {...item}
            />
          })}
        </ul>
      )}
    </li>
  )
}
