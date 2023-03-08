function Button(props) {
  const buttonStyle = {
    backgroundColor: props.color,
    borderRadius: 20,
    color: "white",
    padding: "10px 20px",
    border: "none",
    margin: "0"
  }

  return (
    <button style={buttonStyle} onClick={props.method}>
      {props.text}
    </button>
  );
}

export default Button