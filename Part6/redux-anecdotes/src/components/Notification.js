import { useSelector } from 'react-redux'

const Notification = (props) => {
  const notification = useSelector(state => state.message[0].message)
  const isError = useSelector(state => state.message[0].isError)

  const messageStyle = {
    color: 'green',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const errorStyle = {
    color: 'red',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const style = isError ? errorStyle : messageStyle

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification