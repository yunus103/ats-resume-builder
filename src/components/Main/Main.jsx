import { useState } from "react";
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
          ></Experience>
          <Education
            onChange={handleEducationData}
            data={educationData}
            onReset={handleResetEducation}
          ></Education>
          <Skills
            onChange={handleSkillsChange}
            data={skillsData}
            onReset={handleSkillsReset}
          ></Skills>
          <Certificates
            onChange={handleCertificateChange}
            data={certificateData}
            onReset={handleCertificateReset}
          ></Certificates>
        </form>
        <div className={styles.resume}>
          
        </div>
      </main>
    </>
  );
}

export default Main;
