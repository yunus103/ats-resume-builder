import { useState, useEffect } from "react";
import styles from "./Form.module.css";
import { IoIosArrowDown, IoIosArrowUp, IoIosAddCircleOutline } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";

function Certificates({ onChange, data, onReset }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);

  // ✅ lazy init localStorage
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("certificateItems");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("certificateItems", JSON.stringify(items));
  }, [items]);

  const handleIsOpen = () => setIsOpen((prev) => !prev);

  const handleIsAdding = (e) => {
    e.preventDefault();
    setIsAdding((prev) => !prev);
  };

  const handleSave = (e) => {
    e.preventDefault();

    const isEmpty = Object.values(data).some((v) => String(v).trim() === "");
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
    const updated = items.filter((it) => it.id !== id);
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
        <h1>Certificates</h1>
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
            <IoIosAddCircleOutline /> Add Certificate
          </button>
        )}

        {/* List */}
        <div className={styles.experienceList}>
          {items.map((item) => (
            <div key={item.id} className={styles.experienceItem}>
              <div className={styles.itemInfo}>
                <h4>{item.ctitle || "Certificate Title"}</h4>
                <span>{item.description || "No description"}</span>
                <small>{item.cdate || "No date"}</small>
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
            <label htmlFor="ctitle">Certificate Title</label>
            <input
              type="text"
              id="ctitle"
              name="ctitle"
              placeholder="e.g. React Developer Certificate"
              value={data.ctitle}
              onChange={(e) => onChange("ctitle", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="Issued by Coursera"
              value={data.description}
              onChange={(e) => onChange("description", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cdate">Completion Date</label>
            <input
              type="date"
              id="cdate"
              name="cdate"
              value={data.cdate}
              onChange={(e) => onChange("cdate", e.target.value)}
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

export default Certificates;
