function Education ({onChange, data}) {
    return (
        <fieldset>
            <legend>Education</legend>
            <div>
                <label htmlFor="sname">School Name</label>
                <input type="text" name="sname" id="sname" 
                        value={data.sname} onChange={(e) => onChange("sname", e.target.value)}/>
            </div>
            <div>
                <label htmlFor="field">Study Field</label>
                <input type="text" name="field" id="field" 
                        value={data.field} onChange={(e) => onChange("field", e.target.value)}/>
            </div>
            <div>
                <label htmlFor="studyDate">Graduation Date</label>
                <input type="date" name="studyDate" id="studyDate" 
                        value={data.studyDate} onChange={(e) => onChange("studyDate", e.target.value)}/>
            </div>
        </fieldset>
    )
}

export default Education