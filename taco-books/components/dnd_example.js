import update from 'immutability-helper'
import { memo, useCallback, useState } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { useDrop, useDrag } from 'react-dnd'

export default function Container() {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
      lastDroppedItem: null,
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
  ])
  const [boxes] = useState([
    { name: 'Bottle', type: ItemTypes.GLASS },
    { name: 'Banana', type: ItemTypes.FOOD },
    { name: 'Magazine', type: ItemTypes.PAPER },
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, dustbins],
  )
  return (
    <div>
      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {boxes.map(({ name, type }, index) => (
          <Box
            name={name}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}

const style = {
    border: '1px dashed gray',
    backgroundColor: 'white',
    padding: '0.5rem 1rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    cursor: 'move',
    float: 'left',
  }
  export const Box = memo(function Box({ name, type, isDropped }) {
    const [{ opacity }, drag] = useDrag(
      () => ({
        type,
        item: { name },
        collect: (monitor) => ({
          opacity: monitor.isDragging() ? 0.4 : 1,
        }),
      }),
      [name, type],
    )
    return (
      <div ref={drag} style={{ ...style, opacity }} data-testid="box">
        {isDropped ? <s>{name}</s> : name}
    </div>
  )
})

const db_style = {
    height: '12rem',
    width: '12rem',
    marginRight: '1.5rem',
    marginBottom: '1.5rem',
    color: 'white',
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    float: 'left',
  }
  export const Dustbin = memo(function Dustbin({
    accept,
    lastDroppedItem,
    onDrop,
  }) {
    const [{ isOver, canDrop }, drop] = useDrop({
      accept,
      drop: onDrop,
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    })
    const isActive = isOver && canDrop
    let backgroundColor = '#222'
    if (isActive) {
      backgroundColor = 'darkgreen'
    } else if (canDrop) {
      backgroundColor = 'darkkhaki'
    }
    return (
      <div ref={drop} style={{ ...db_style, backgroundColor }} data-testid="dustbin">
        {isActive
          ? 'Release to drop'
          : `This dustbin accepts: ${accept.join(', ')}`}
  
        {lastDroppedItem && (
          <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
        )}
      </div>
    )
  })

export const ItemTypes = {
    FOOD: 'food',
    GLASS: 'glass',
    PAPER: 'paper',
}
  