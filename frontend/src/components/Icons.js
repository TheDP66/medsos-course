import React from "react";

const Icons = ({ setContent, content, theme }) => {
  const reactions = [
    "♥️",
    "🙂",
    "😀",
    "😄",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "☺️",
    "😌",
    "😉",
    "😏",
    "👍",
    "👎",
    "✌️",
    "👌",
    "💪",
    "🙏",
  ];
  return (
    <div
      className="nav-item px-2 dropdown"
      style={{ opacity: 1, filter: theme ? "invert(1)" : "invert(0)" }}
    >
      <span
        className="nav-span position-relative px-1"
        id="notifyDropdown"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span style={{ opacity: 0.4 }}>😂</span>
      </span>

      <div className="dropdown-menu" aria-labelledby="notifyDropdown">
        <div className="reactions">
          {reactions.map((icon) => (
            <span key={icon} onClick={() => setContent(content + icon)}>
              {icon}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Icons;
