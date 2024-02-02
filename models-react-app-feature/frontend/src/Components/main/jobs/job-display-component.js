import { useEffect, useState } from "react";
import { Table } from "evergreen-ui";
import axios from "axios";
import NavbarComponent from "../../common/navbar-component";
import { Pagination } from "evergreen-ui";

function JobDisplayComponent() {
    const [jobs, setJobs] = useState([])
    const [jobSelectValue, setJobSelectValue] = useState('')

    useEffect(() => {
        axios.get("http://localhost:5000/job/getAll").then(r => {
            console.log(r)
            setJobs(r.data)
        })
    }, [])

    return (
        <div>
            <NavbarComponent />
            <div className="container">
            <Table className="mt-5">
                <Table.Head>
                    
                    <Table.TextHeaderCell>Job Name</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Created Date</Table.TextHeaderCell>
                    <Table.TextHeaderCell>Modified Date</Table.TextHeaderCell>
                    <Table.SearchHeaderCell />
                </Table.Head>
                <Table.Body height={240}>
                    {jobs.map((job) => (
                        <Table.Row key={job.id}>
                            <Table.TextCell>{job.name}</Table.TextCell>
                            <Table.TextCell>{job.createdDate}</Table.TextCell>
                            <Table.TextCell>{job.modifiedDate}</Table.TextCell>
                            <Table.TextCell></Table.TextCell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>

            <Pagination className="mt-3" page={1} totalPages={5}></Pagination>
            </div>
            
        </div>);
}

export default JobDisplayComponent;