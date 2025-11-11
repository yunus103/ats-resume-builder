import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { IoIosArrowDown, IoIosArrowUp, IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";

function Education({ onChange, data, onReset, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  // ✅ localStorage lazy initialization
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("educationItems");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Invalid localStorage data:", err);
      return [];
    }
  });

  // ✅ items değişince kaydet
  useEffect(() => {
    localStorage.setItem("educationItems", JSON.stringify(items));
    if (items.length >= 0) {
        onSave();
    }
  }, [items]);

  const handleIsAdding = (e) => {
    e.preventDefault();
    setIsAdding((prev) => !prev);
  };

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(data).some((value) => String(value).trim() === "");
    if (isEmpty) {
      setErrorMessage("Make sure you filled all required fields.");
      return;
    }

    if (editingItemId) {
      setItems((prev) =>
        prev.map((it) =>
          it.id === editingItemId ? { ...data, id: editingItemId } : it
        )
      );
      setEditingItemId(null);
    } else {
      const id = crypto.randomUUID();
      const newItem = { ...data, id };
      setItems((prev) => [...prev, newItem]);
    }

    setIsAdding(false);
    onReset();
    setErrorMessage("");
  };

  const handleDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
  };

  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setIsAdding(true);
    Object.keys(item).forEach((key) => {
      if (key !== "id") onChange(key, item[key]);
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.fieldHeader} onClick={handleIsOpen}>
        <h1>Education</h1>
        <button type="button" className={styles.btnExpand}>
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
      </div>

      <div
        className={`${styles.wrapper} ${styles.expandable} ${
          isOpen ? styles.open : ""
        }`}
      >
        {!isAdding && (
          <button className={styles.btnAdd} onClick={handleIsAdding}>
            <IoIosAddCircleOutline /> Add Education
          </button>
        )}

        {/* Liste */}
        <div className={styles.experienceList}>
          {items.map((item) => (
            <div key={item.id} className={styles.experienceItem}>
              <div className={styles.itemInfo}>
                <h4>{item.sname || "School Name"}</h4>
                <span>{item.field || "Study Field"}</span>
              </div>

              <div className={styles.itemActions}>
                <button
                  type="button"
                  className={styles.edit}
                  onClick={() => handleEdit(item)}
                >
                  <FaEdit />
                </button>
                <button
                  type="button"
                  className={styles.delete}
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        {/* Form */}
        <fieldset
          className={`${styles.expandable} ${isAdding ? styles.open : ""}`}
        >
          <div>
            <label htmlFor="sname">School Name</label>
            <input
              type="text"
              id="sname"
              name="sname"
              value={data.sname}
              onChange={(e) => onChange("sname", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="field">Study Field</label>
            <input
              type="text"
              id="field"
              name="field"
              value={data.field}
              onChange={(e) => onChange("field", e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="studyDate">Graduation Date</label>
            <input
              type="date"
              id="studyDate"
              name="studyDate"
              value={data.studyDate}
              onChange={(e) => onChange("studyDate", e.target.value)}
            />
          </div>

          <button type="button" className={styles.btnSave} onClick={handleSave}>
            Save
          </button>
        </fieldset>
      </div>
    </div>
  );
}

export default Education;
