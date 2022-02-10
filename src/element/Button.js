import React from "react";

const Button = (props) => {
  const { title, onClick, is_uploading } = props;
  const [disable, setDisable] = React.useState(is_uploading);

  return (
    <button
      onClick={onClick}
      className="w-full py-3 bg-slate-300 hover:bg-rose-300 rounded text-white hover:transition-all transition-all ease-linear disabled:bg-gray-600"
      // disabled={disable}
    >
      {title}
    </button>
  );
};

Button.defaultProps = {
  title: "",
  onClick: () => {},
};

export default React.memo(Button);
