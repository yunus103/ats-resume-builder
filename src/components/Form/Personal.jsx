import { useState } from "react";
import styles from "./Form.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Personal({ onChange, data }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.fieldHeader} onClick={handleIsOpen}>
          <h1>Personal Details</h1>
          <button type="button" className={styles.btnExpand}>
            {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </button>
        </div>
        
        <fieldset className={`${styles.expandable} ${isOpen ? styles.open : ""}`}>
          <div>
            <label htmlFor="fname">Full Name *</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={data.fname}
              onChange={(e) => onChange("fname", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={data.address}
              onChange={(e) => onChange("address", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="linkedin">Linkedin</label>
            <input
              type="text"
              id="linkedin"
              name="linkedin"
              value={data.linkedin}
              onChange={(e) => onChange("linkedin", e.target.value)}
            />
          </div>
        </fieldset>
      </div>
    </>
  );
}

export default Personal;
