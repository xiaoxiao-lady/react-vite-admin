

import { Button } from 'antd'
import React, { memo, useCallback, useState } from 'react'

const Child = memo(({ count }) => {
  console.log('child render')
  return (
    <div>{count}</div>
  )
})
const Child1 = memo((props) => {
  const { changeCount } = props
  console.log('child1 render')

  return (
    <div>
      <Button onClick={changeCount}>+</Button>
    </div>
  )
}
)
// export default function page1() {

//   const [count, setCount] = useState(1)
//   console.log('parent render')
//   const changeCount = useCallback(
//     () => {
//       setCount((c)=>c+1)
//     },
//     [count],
//   )

//   return (
//     <>
//     <Child count ={count}> </Child>
//     <Child1 changeCount = {changeCount}></Child1>
//     </>

//   )
// }

// 避免行内样式
const Child11 = memo(( props) => {
  console.log('child render')
const {style,propA} = props
  return (
    <div style={{ ...style }}>好看</div>
  )
})
const styles ={ color: 'red' }
export default function page1() {
  const [count, setCount] = useState(1)
  const changeCount = useCallback(
    () => {
      setCount((c) => c + 1)
    },
    [],
  )
  const propA = { name: 'value' }

  return (
    <>
      <Child11 style={styles} propA = {propA}> </Child11>
      <Button onClick={changeCount}>+</Button>

    </>

  )
}
