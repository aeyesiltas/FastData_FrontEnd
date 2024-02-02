import { Button, SelectField, TextInputField, Pane, Label, Textarea } from "evergreen-ui";
import { useEffect, useState } from "react";
import axios from 'axios'
import { toaster } from "evergreen-ui";

class newJobData {
    isActive;
    source;
    dbType;
    jobName;
    folderId;
    email;
    query;
    fetchSize;
    bufferSize;
    inMemory;
    notParallel;
    priorityLevel;
    beforeSql;
    afterSql;
    partition;
    isCsv;

    // target
    targetDbType;
    targetSchema;
    targetInsertHint;
    targetTable;
    targetCommitSize;
    targetBufferSize;
    targetBeforeSql;
    targetAfterSql;

    constructor() {
        this.isActive = true;
        this.jobName = '';
        this.folderId = '';
        this.email = '';
        this.partition = '';
        this.source = '0';
        this.dbType = 'MySQL';
        this.query = ''
        this.targetInsertHint = '';
        this.fetchSize = '0';
        this.bufferSize = '0';
        this.inMemory = '0';
        this.notParallel = false;
        this.priorityLevel = '1';
        this.beforeSql = '0';
        this.afterSql = '0';
        this.targetDbType = '0';
        this.targetSchema = '0';
        this.targetTable = '0';
        this.targetCommitSize = '0';
        this.targetBufferSize = '0';
        this.targetBeforeSql = '0';
        this.targetAfterSql = '0';
        this.isCsv = 'false';

    }
}

function EditJobComponent(props) {


    const [formMode, setFormMode] = useState('table');
    const [formModeTarget, setFormModeTarget] = useState('table');

    const [formData, setFormData] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/job/getById?id=" + props.selectedJobId).then(r => {
            var data = r.data[0]
            let jobData = new newJobData();
            jobData.isActive = data.isActive;
            jobData.jobName = data.jobName;
            jobData.folderId = data.folderId;
            jobData.email = data.email;
            jobData.partition = data.partition;
            jobData.source = data.source;
            jobData.dbType = data.dbType;
            jobData.query = data.query;
            jobData.targetInsertHint = data.targetInsertHint;
            jobData.fetchSize = data.fetchSize;
            jobData.bufferSize = data.bufferSize;
            jobData.inMemory = data.inMemory;
            jobData.notParallel = data.notParallel;
            jobData.priorityLevel = data.priorityLevel;
            jobData.beforeSql = data.beforeSql;
            jobData.afterSql = data.afterSql;
            jobData.targetDbType = data.targetDbType;
            jobData.targetSchema = data.targetSchema;
            jobData.targetTable = data.targetTable;
            jobData.targetCommitSize = data.targetCommitSize;
            jobData.targetBufferSize = data.targetBufferSize;
            jobData.targetBeforeSql = data.targetBeforeSql;
            jobData.targetAfterSql = data.targetAfterSql;
            jobData.isCsv = data.isCsv;

            setFormData(jobData)

        })
    }, [])

    const setValue = (key, value) => { const newData = { ...formData, [key]: value }; setFormData(newData); }
    const postData = () => {
        formData.folderId = props.selectedFolderId;
        formData.email = localStorage.getItem("user");
        axios.post("http://localhost:5000/job/add", { formData }).then(r => {
            if (r.status === -1) {
                toaster.danger(formData.jobName + " already exists!")
            }
            else if (r.status === 200) {
                toaster.success("Inserted!")
                setFormData(new newJobData());
                window.location.reload(true)
            }
            else {
                toaster.danger("An error occurred!")
            }

        })
    }

    const deleteById = () => {
        var body = new FormData();
        console.log(props.selectedJobId)
        body.append('id', props.selectedJobId)
        axios.post("http://localhost:5000/job/deleteById", body).then(r => {
            if (r.status === -1) {
                toaster.danger(formData.jobName + " already exists!")
            }
            else if (r.status === 200) {
                toaster.success("Deleted!")
                setFormData(new newJobData());
                window.location.reload(true)
            }
            else {
                toaster.danger("An error occurred!")
            }
        })
    }

    return (
        <div style={{ backgroundColor: "gray;" }}>
            <div className='d-flex flex-row justify-content-center mb-5 mt-4'>
                <h1>
                    Edit Job Screen
                </h1>
                <div className="align-self-center save-btns">
                    <Button className="me-2" appearance="primary" intent="success" onClick={postData}>
                        Edit
                    </Button>
                    <Button className="me-5" appearance="primary" intent="danger">
                        Delete
                    </Button>
                </div>
            </div>

            <div className='d-flex flex-row justify-content-around gap-5'>
                <div className="w-25">
                    <h2>Source</h2>
                    <SelectField
                        label="IsActive"
                        description="(1 or 0 - Default 1)"
                    >
                        <option value="1" selected>
                            1
                        </option>
                        <option value="0">0</option>
                    </SelectField>
                    <TextInputField
                        label="Job Name"
                        placeholder="text"
                        onChange={(e) => setValue('jobName', e.target.value)}
                        value={formData.jobName}
                    />
                    <SelectField
                        label="Connection" onChange={(e) => setValue('source', e.target.value)}
                    >
                        <option value="1" selected>
                            1
                        </option>
                        <option value="0">0</option>
                    </SelectField>

                    <SelectField
                        label="DB Type" onChange={(e) => setValue('dbType', e.target.value)}
                    >
                        <option value="Oracle" selected>
                            Oracle
                        </option>
                        <option value="SqlServer" selected>
                            SqlServer
                        </option>
                        <option value="MySQL" selected>
                            MySQL
                        </option>

                    </SelectField>

                    <SelectField
                        label="Query or Table" onChange={(e) => setFormMode(e.target.value)}
                    >
                        <option value="table" selected>
                            Table
                        </option>
                        <option value="query">Query</option>
                    </SelectField>
                    
                    {formData.dbType === 'SqlServer' ? <TextInputField
                            label="DB"
                            placeholder="text"
                            type="text"
                        /> : <></>}
                    
                    {formMode === 'table' ?
                        <>
                            <TextInputField
                                    label="Schema"
                                    placeholder="text"
                                    type="text"
                                />
                                <TextInputField
                                    label="Table"
                                    placeholder="text"
                                    type="text"
                                />
                                <TextInputField
                                    label="Partition"
                                    placeholder="text"
                                    type="text"
                                    onChange={(e) => setValue('partition', e.target.value)}
                                    value={formData.partition}
                                />
                        </>
                        :
                        <>
                            <Pane>
                                <Label htmlFor="textarea-2" display="block">
                                    Query
                                </Label>
                                <Textarea id="textarea-2" placeholder="Query..." onChange={(e) => setValue('query', e.target.value)} />
                            </Pane>
                        </>

                    }

                    <TextInputField
                        label="Fetch Size"
                        placeholder="text"
                        onChange={(e) => setValue('fetchSize', e.target.value)}
                        value={formData.fetchSize}
                        type="number"
                    />

                    <TextInputField
                        label="Buffer Size"
                        placeholder="text"
                        onChange={(e) => setValue('bufferSize', e.target.value)}
                        value={formData.bufferSize}
                        type="number"
                    />

                    <TextInputField
                        label="In Memory"
                        placeholder="yes/no"
                        onChange={(e) => setValue('inMemory', e.target.value)}
                        value={formData.inMemory}
                    />

                    <TextInputField
                        label="NOF"
                        placeholder="text"
                        onChange={(e) => setValue('notParallel', e.target.value)}
                        value={formData.notParallel}
                        type="number"
                    />

                    <TextInputField
                        label="Priority Level"
                        placeholder="high/medium/low"
                        onChange={(e) => setValue('priorityLevel', e.target.value)}
                        value={formData.priorityLevel}
                    />

                    <TextInputField
                        label="Before SQL"
                        placeholder="text"
                        onChange={(e) => setValue('beforeSql', e.target.value)}
                        value={formData.beforeSql}
                    />
                    <TextInputField
                        label="After SQL"
                        placeholder="text"
                        onChange={(e) => setValue('afterSql', e.target.value)}
                        value={formData.afterSql}
                    />

                    <SelectField
                        label="Is CSV"
                        onChange={(e) => setValue('isCsv', e.target.value)}
                    >
                        <option value="true">
                            True
                        </option>
                        <option value="false" selected>
                            False
                        </option>

                    </SelectField>

                </div>

                <div className="w-25">
                    <h2 className="mb-4">Target</h2>
                    <SelectField
                        label="DB Type"
                        onChange={(e) => setValue('targetDbType', e.target.value)}
                    >
                        <option value="Oracle" selected>
                            Oracle
                        </option>
                        <option value="SqlServer" >
                            SqlServer
                        </option>
                        <option value="MySQL" >
                            MySQL
                        </option>

                    </SelectField>

                    {formData.targetDbType === "SqlServer" ? <>
                    
                    <SelectField
                        label="Query or Table" onChange={(e) => setFormModeTarget(e.target.value)}
                    >
                        <option value="table" selected>
                            Table
                        </option>
                        <option value="query">Query</option>
                        
                    </SelectField>
                    <TextInputField
                            label="DB"
                            placeholder="text"
                            type="text"
                        />
                        {formModeTarget === 'table' ?
                            <>
                                <SelectField
                                    label="Schema"
                                >
                                    <option value="table" selected>
                                        Schema
                                    </option>
                                    <option value="query">Query</option>
                                </SelectField>
                                <SelectField
                                    label="Table"
                                >
                                    <option value="table" selected>
                                        Table
                                    </option>
                                    <option value="query">Query</option>
                                </SelectField>
                            </>
                            :
                            <>
                                <Pane>
                                    <Label htmlFor="textarea-2" display="block">
                                        Query
                                    </Label>
                                    <Textarea id="textarea-2" placeholder="Query..." onChange={(e) => setValue('query', e.target.value)} />
                                </Pane>
                            </>

                        }</> : <></>}

                    <TextInputField
                        label="Target Insert Hint"
                        placeholder="text"
                        onChange={(e) => setValue('targetInsertHint', e.target.value)}
                        value={formData.targetInsertHint}
                    />

                    <TextInputField
                        label="Commit Size"
                        placeholder="text"
                        onChange={(e) => setValue('targetCommitSize', e.target.value)}
                        value={formData.targetCommitSize}
                        type="number"
                    />

                    <TextInputField
                        label="Before SQL"
                        placeholder="text"
                        onChange={(e) => setValue('targetBeforeSql', e.target.value)}
                        value={formData.targetBeforeSql}
                    />
                    <TextInputField
                        label="After SQL"
                        placeholder="text"
                        onChange={(e) => setValue('targetAfterSql', e.target.value)}
                        value={formData.targetAfterSql}
                    />


                </div>

            </div>
        </div>

    );
}

export default EditJobComponent;