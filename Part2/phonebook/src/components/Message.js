const Message = ({ msg }) => {
    console.log(msg)

    if (msg === null) {return null}

    const messageStyle = {
        color: 'green',
        background: 'lightgrey',
        fontStyle: 'italic',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 5
    }

    return(
        <div style={messageStyle}>
            <p>{msg}</p>
        </div>
    )
}

export default Message;
