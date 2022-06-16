const Message = ({ msg, isError }) => {
    console.log('isError', isError)

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

    const errorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontStyle: 'bold',
        fontSize: 16,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 5
    }

    let style = isError ? errorStyle : messageStyle

    return(
        <div style={style}>
            <p>{msg}</p>
        </div>
    )
}

export default Message;
