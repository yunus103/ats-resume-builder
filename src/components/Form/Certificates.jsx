function Certificates() {
    return (
        <fieldset>
            <legend>Certificates</legend>
            <div>
                <label htmlFor="ctitle">Certificate Title</label>
                <input 
                    type="text" id="ctitle" name="ctitle" 
                />

                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" />

                <label htmlFor="cdate">Complete Date</label>
                <input type="date" id="cdate" name="cdate"/>
            </div>
        </fieldset>
    )
}

export default Certificates