function Experience({onChange, data}) {
    return (
        <fieldset>
            <legend>Experience</legend>
            <div>
                <label htmlFor="cname">Company Name</label>
                <input 
                    type="text" id="cname" name="cname" 
                    value={data.cname} onChange={(e) => onChange("cname", e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="title">Position Title</label>
                <input 
                    type="text" id="title" name="title" 
                    value={data.title} onChange={(e) => onChange("title", e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="tasks">Main Responsibilities </label>
                <input 
                    type="text" id="tasks" name="tasks" 
                    value={data.tasks} onChange={(e) => onChange("tasks", e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="startDate">Start Date</label>
                <input 
                    type="date" id="startDate" name="startDate" 
                    value={data.startDate} onChange={(e) => onChange("startDate", e.target.value)}
                />
            </div>
             <div>
                <label htmlFor="leaveDate">Leave Date</label>
                <input 
                    type="date" id="leaveDate" name="leaveDate" 
                    value={data.leaveDate} onChange={(e) => onChange("leaveDate", e.target.value)}
                />
            </div>
        </fieldset>
    )
}

export default Experience