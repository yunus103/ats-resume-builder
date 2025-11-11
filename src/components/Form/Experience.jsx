import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

function Experience({ onChange, data, onReset, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("experienceItems");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Invalid localStorage data:", err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("experienceItems", JSON.stringify(items));
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

    const isEmpty = Object.values(data).some(
      (value) => String(value).trim() === ""
    );
    if (isEmpty) {
      setErrorMessage("Make sure you filled all required fields.");
      return; // fonksiyonu burada durdur
    }

    if (editingItemId) {
      // mevcut item'i güncelle
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
      if (key !== "id") onChange(key, item[key]); // parent’taki data’yı doldur
    });
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.fieldHeader} onClick={handleIsOpen}>
          <h1>Experience</h1>
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
              <IoIosAddCircleOutline /> Add Experience
            </button>
          )}

          <div className={styles.experienceList}>
            {items.map((item) => (
              <div key={item.id} className={styles.experienceItem}>
                <div className={styles.itemInfo}>
                  <h4>{item.cname || "Company Name"}</h4>
                  <span>{item.title || "Position Title"}</span>
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
          <fieldset
            className={`${styles.expandable} ${isAdding ? styles.open : ""}`}
          >
            <div>
              <label htmlFor="cname">Company Name</label>
              <input
                type="text"
                id="cname"
                name="cname"
                value={data.cname}
                onChange={(e) => onChange("cname", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="title">Position Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={data.title}
                onChange={(e) => onChange("title", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="tasks">Main Responsibilities </label>
              <input
                type="text"
                id="tasks"
                name="tasks"
                value={data.tasks}
                onChange={(e) => onChange("tasks", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="startDate">Start Date</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={data.startDate}
                onChange={(e) => onChange("startDate", e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="leaveDate">Leave Date</label>
              <input
                type="date"
                id="leaveDate"
                name="leaveDate"
                value={data.leaveDate}
                onChange={(e) => onChange("leaveDate", e.target.value)}
              />
            </div>
            <button
              type="button"
              className={styles.btnSave}
              onClick={handleSave}
            >
              Save
            </button>
          </fieldset>
        </div>
      </div>
    </>
  );
}

export default Experience;
