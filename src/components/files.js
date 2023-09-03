import Button from "./deleteButton"
const Files = (props) => {
    const files = props.files


    return (
        <>
            <br />
            <hr />
            
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>File name</th>
                        <th>URL</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {files && files.map(
                        (file, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{file.file}</td>
                                    <td>
                                        <button>
                                            <a href={file.url}>View</a>
                                        </button>
                                    </td>
                                    <td>
                                        <Button username={props.username} filename={file.file} />
                                    </td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </>
    )
}

export default Files