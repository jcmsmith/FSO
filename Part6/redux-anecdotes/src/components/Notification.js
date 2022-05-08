//import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.message
  //const isError = useSelector(state => state.message[0].isError)

  const messageStyle = {
    color: 'green',
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  // const errorStyle = {
  //   color: 'red',
  //   border: 'solid',
  //   padding: 10,
  //   borderWidth: 1
  // }

  //const style = isError ? errorStyle : messageStyle
  const style = messageStyle

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    message: state.message[0].message
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification