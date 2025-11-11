import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { IoIosArrowDown, IoIosArrowUp, IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";

function Skills({ onChange, data, onReset, onSave }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  // ✅ Lazy init
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("skillItems");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("skillItems", JSON.stringify(items));
    if (items.length >= 0) {
        onSave();
    }
  }, [items]);

  const handleIsOpen = () => setIsOpen((prev) => !prev);
  const handleIsAdding = (e) => {
    e.preventDefault();
    setIsAdding((prev) => !prev);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(data).some((value) => String(value).trim() === "");
    if (isEmpty) {
      setErrorMessage("Please fill in all fields.");
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
        <h1>Skills</h1>
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
            <IoIosAddCircleOutline /> Add Skill Group
          </button>
        )}

        {/* List */}
        <div className={styles.experienceList}>
          {items.map((item) => (
            <div key={item.id} className={styles.experienceItem}>
              <div className={styles.itemInfo}>
                <h4>{item.category || "Category"}</h4>
                <span className={styles.skillList}>
                  {item.skills || "No skills listed"}
                </span>
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
            <label htmlFor="category">Skill Group</label>
            <input
              type="text"
              id="category"
              name="category"
              placeholder="e.g. Front End"
              value={data.category}
              onChange={(e) => onChange("category", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="skills">Skills (comma-separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              placeholder="HTML, CSS, JavaScript"
              value={data.skills}
              onChange={(e) => onChange("skills", e.target.value)}
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

export default Skills;
