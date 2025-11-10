import { useState } from 'react'
import styles from './Main.module.css'
import Personal from "../Form/Personal"
import Experience from "../Form/Experience"
import Education from "../Form/Education"
import Skills from "../Form/Skills"
import Certificates from "../Form/Certificates"

function Main() {
    const [personalData, setPersonalData] = useState({
        fname: "",
        email: "",
        address: "",
        linkedin: ""
    });

    const [experienceData, setExperienceData] = useState({
        cname: "",
        title: "",
        tasks: "",
        startDate: "",
        leaveDate: ""
    });

    const [educationData, setEducationData] = useState({
        sname: "",
        field: "",
        studyDate: ""
    });

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

    const handleEducationData = (field, value) => {
        setEducationData((prev) => ({
            ...prev,
            [field]: value,
        }));
    }

    return (
        <>
            <main>
                <form>
                    <Personal onChange={handlePersonalChange} data={personalData}></Personal>
                    <Experience onChange={handleExperienceChange} data={experienceData}></Experience>
                    <Education onChange={handleEducationData} data={educationData}></Education>
                    <Skills></Skills>
                    <Certificates></Certificates>
                </form>
                <div className={styles.resume}>
                    <p>Name: {personalData.fname}</p>
                    <p>Email: {personalData.email}</p>
                    <p>Address: {personalData.address}</p>
                    <p>Linkedin: {personalData.linkedin}</p> <br /><br />

                    <p>Company: {experienceData.cname}</p>
                    <p>Title: {experienceData.title}</p>
                    <p>Responsibilities: {experienceData.tasks}</p>
                    <p>Start Date: {experienceData.startDate}</p>
                    <p>Leave Date: {experienceData.leaveDate}</p>
                    <br /><br />

                    <p>School Name: {educationData.sname}</p>
                    <p>Field of Study: {educationData.field}</p>
                    <p>Graduation Date: {educationData.studyDate}</p>
                    <br /><br />
                </div>
            </main>
        </>
    )
}

export default Main