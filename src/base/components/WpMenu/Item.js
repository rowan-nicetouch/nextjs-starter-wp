import Button from 'base/components/WpMenu/Button'
import ItemText from 'base/components/WpMenu/ItemText'
import expandPath from 'base/components/WpMenu/expandPath'
import makePath from 'base/components/WpMenu/makePath'
import ClassList from 'base/ClassList'

export default function Item (props) {
  const {
    activePath,
    children,
    classes,
    currentPath,
    setActivePath,
    setFocusPath,
    id,
    linkText,
    parentDepth,
    parentPath,
    src,
    target
  } = props

  const classList = new ClassList('menu-item', classes)
  const depth = parentDepth + 1
  const handleItemFocus = () => setFocusPath(path)
  const hasChildren = children?.length > 0
  const isOpen = expandPath(activePath).includes(id)
  const path = makePath([ parentPath, id ])

  return (
    <li>
      <span className={classList}>
        <ItemText
          currentPath={currentPath}
          onFocus={handleItemFocus}
          linkTarget={target}
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
          data-menu-is-open={isOpen ? '' : null}
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
