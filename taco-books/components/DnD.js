import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

export const ItemTypes = {
    CARD: 'card',
    LIST: 'list'
  }

export const dragStyle = {
border: '1px dashed gray',
padding: '0.5rem 1rem',
marginBottom: '.5rem',
backgroundColor: 'white',
cursor: 'move',
}

export const horizontalDrag = (id, index, moveCard, listIdx) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(listIdx, dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  
  drag(drop(ref))

  return {ref: ref, id: handlerId, opacity: opacity}
}

export const verticalDrag = (id, index, moveList) => {
  const ref = useRef(null)
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.LIST,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get horizontal middle
      const hoverMiddleX =
        (hoverBoundingRect.left + hoverBoundingRect.right) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the left edge
      const hoverClientX = clientOffset.x + hoverBoundingRect.left
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging right
      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }
      // Dragging left
      if (dragIndex > hoverIndex && hoverClientX < hoverMiddleX) {
        return
      }
      // Time to actually perform the action
      moveList(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.LIST,
    item: () => {
      return { id, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  
  drag(drop(ref))

  return {ref: ref, id: handlerId, opacity: opacity}
}

export const dropTarget = (updateListCards, toIdx) => {
  let [{isOverCurrent}, drop] = useDrop(
    ()=>({
      accept: ItemTypes.CARD,
      drop(item) {
        updateListCards(toIdx, item.id)
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({shallow: true})
      })
    })
  )

  return {isOverCurrent: isOverCurrent, ref: drop}
}
