function BottomFooter(props) {
  const style = {
    backgroundColor: "white",
    textAlign: "center",
    color: "black",
    padding: "0px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "40px",
    width: "100%",
  };
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div style={style}>
        <small>
          &copy; Copyright <strong>T R O Y</strong>. All Rights Reserved to T R
          O Y
        </small>
      </div>
    </>
  );
}

export default BottomFooter;
