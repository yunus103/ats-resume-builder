import { useEffect, useState } from "react";
import styles from "./Main.module.css";
import Personal from "../Form/Personal";
import Experience from "../Form/Experience";
import Education from "../Form/Education";
import Skills from "../Form/Skills";
import Certificates from "../Form/Certificates";

function Main() {
  const [personalData, setPersonalData] = useState({
    fname: "",
    email: "",
    address: "",
    linkedin: "",
  });

  const [experienceData, setExperienceData] = useState({
    cname: "",
    title: "",
    tasks: "",
    startDate: "",
    leaveDate: "",
  });

  const [educationData, setEducationData] = useState({
    sname: "",
    field: "",
    studyDate: "",
  });

  const [skillsData, setSkillsData] = useState({
    category: "",
    skills: "",
  });

  const [certificateData, setCertificateData] = useState({
    ctitle: "",
    description: "",
    cdate: "",
  });

  const [resumeData, setResumeData] = useState({
    experiences: [],
    educations: [],
    skills: [],
    certificates: [],
  });

  // 🔁 Tüm localStorage verilerini oku
  const handleRefresh = () => {
    const experiences = JSON.parse(
      localStorage.getItem("experienceItems") || "[]"
    );
    const educations = JSON.parse(
      localStorage.getItem("educationItems") || "[]"
    );
    const skills = JSON.parse(localStorage.getItem("skillItems") || "[]");
    const certificates = JSON.parse(
      localStorage.getItem("certificateItems") || "[]"
    );

    setResumeData({ experiences, educations, skills, certificates });
  };

  // Sayfa açıldığında bir kere yükle
  useEffect(() => {
    handleRefresh();
  }, []);

  const handleCertificateChange = (field, value) => {
    setCertificateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCertificateReset = () => {
    setCertificateData({
      ctitle: "",
      description: "",
      cdate: "",
    });
  };

  const handleSkillsChange = (field, value) => {
    setSkillsData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillsReset = () => {
    setSkillsData({
      category: "",
      skills: "",
    });
  };

  const handlePersonalChange = (field, value) => {
    setPersonalData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleExperienceChange = (field, value) => {
    setExperienceData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetExperience = () => {
    setExperienceData({
      cname: "",
      title: "",
      tasks: "",
      startDate: "",
      leaveDate: "",
    });
  };

  const handleResetEducation = () => {
    setEducationData({
      sname: "",
      field: "",
      studyDate: "",
    });
  };

  const handleEducationData = (field, value) => {
    setEducationData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <>
      <main>
        <form>
          <Personal
            onChange={handlePersonalChange}
            data={personalData}
          ></Personal>
          <Experience
            onChange={handleExperienceChange}
            data={experienceData}
            onReset={handleResetExperience}
            onSave={handleRefresh}
          ></Experience>
          <Education
            onChange={handleEducationData}
            data={educationData}
            onReset={handleResetEducation}
            onSave={handleRefresh}
          ></Education>
          <Skills
            onChange={handleSkillsChange}
            data={skillsData}
            onReset={handleSkillsReset}
            onSave={handleRefresh}
          ></Skills>
          <Certificates
            onChange={handleCertificateChange}
            data={certificateData}
            onReset={handleCertificateReset}
            onSave={handleRefresh}
          ></Certificates>
        </form>

        <div className={styles.resume}>
          <header className={styles.header}>
            <h1>{personalData.fname || "Your Name"}</h1>
            <p className={styles.subtitle}>
              {personalData.email && <span>{personalData.email}</span>}
              {" · "}
              {personalData.address && <span>{personalData.address}</span>}
              {personalData.linkedin && (
                <>
                  {" · "}
                  {personalData.linkedin && <span>LinkedIn: {personalData.linkedin}</span>}
                </>
              )}
            </p>
          </header>

          <section className={styles.section}>
            <h2>Experience</h2>
            {resumeData.experiences.length > 0 ? (
              resumeData.experiences.map((exp) => (
                <div key={exp.id} className={styles.item}>
                  <div className={styles.itemHeader}>
                    <h3>{exp.cname}</h3>
                    <span className={styles.date}>
                      {exp.startDate} – {exp.leaveDate || "Present"}
                    </span>
                  </div>
                  <p className={styles.title}>{exp.title}</p>
                  <p className={styles.tasks}>{exp.tasks}</p>
                </div>
              ))
            ) : (
              <p className={styles.placeholder}>No experiences added yet.</p>
            )}
          </section>

          <section className={styles.section}>
            <h2>Education</h2>
            {resumeData.educations.map((edu) => (
              <div key={edu.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <h3>{edu.sname}</h3>
                  <span className={styles.date}>{edu.studyDate}</span>
                </div>
                <p className={styles.title}>{edu.field}</p>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h2>Skills</h2>
            {resumeData.skills.map((s) => (
              <div key={s.id} className={styles.skillGroup}>
                <h3>{s.category}</h3>
                <div className={styles.badgeGroup}>
                  {s.skills.split(",").map((skill, i) => (
                    <span key={i} className={styles.badge}>
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </section>

          <section className={styles.section}>
            <h2>Certificates</h2>
            {resumeData.certificates.map((c) => (
              <div key={c.id} className={styles.item}>
                <div className={styles.itemHeader}>
                  <h3>{c.ctitle}</h3>
                  <span className={styles.date}>{c.cdate}</span>
                </div>
                <p className={styles.title}>{c.description}</p>
              </div>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export default Main;
