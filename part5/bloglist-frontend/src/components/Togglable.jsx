import React, { useState, useImperativeHandle } from "react"; // Changed to single quotes
import PropTypes from "prop-types"; // Changed to single quotes

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" }; // Changed to single quotes
  const showWhenVisible = { display: visible ? "" : "none" }; // Changed to single quotes

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility, // Simplified and removed extra semicolon
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button id="save" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button id="cancel" onClick={toggleVisibility}>
          cancel
        </button>
      </div>
    </div>
  );
});

// PropTypes definition
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Display name for debugging
Togglable.displayName = "Togglable";

export default Togglable;
