import styles from "./Nav.module.css";


function Nav() {
    const handleClear = () => {
        localStorage.removeItem("experienceItems");
        localStorage.removeItem("educationItems");
        localStorage.removeItem("skillItems");
        localStorage.removeItem("certificateItems");
        window.location.reload();
    }
  return (
    <>
      <nav>
        <h1>CV Builder</h1>
        <div>
          <button onClick={handleClear}>Clear Resume</button>
          <button
            className={`${styles.btnPrint} no-print`}
            onClick={() => window.print()}
          >
            Print as PDF
          </button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
