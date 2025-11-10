function Skills(){
    return (
        <fieldset>
            <legend>Skills</legend>
            <div>
                <label htmlFor="skill-title">Skill Title</label>
                <input 
                    type="text" id="skill-title" name="skill-title"
                    placeholder="Eg. Front End"
                    
                />
                <label htmlFor="skill">Add Skill</label>
                <input type="text" id="skill" name="skill-title"/>
            </div>
        </fieldset>
    )
}

export default Skills