const Message = ({ msg }) => {
    console.log(msg)

    if (msg === null) {return null}

    const messageStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }

    return(
        <div style={messageStyle}>
            <p>{msg}</p>
        </div>
    )
}

export default Message;
