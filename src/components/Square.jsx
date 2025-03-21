export const Square = ({ children, isSelected, updateBoard, index }) => {
  const squareClass = `square ${isSelected ? "isSelected" : ""}`;

  const handleClick = () => {
    updateBoard(index);
  };

  return (
    <div onClick={handleClick} className={squareClass}>
      {children}
    </div>
  );
};
