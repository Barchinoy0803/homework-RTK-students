import {memo} from "react";

const Header = () => {
  return (
    <div>
      <h2>Header</h2>
      <form action="">
        <input type="text" />
        <button>+</button>
      </form>
    </div>
  );
};

export default memo(Header);
