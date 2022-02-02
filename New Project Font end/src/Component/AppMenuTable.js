import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {EditAppMenuTable} from './EditAppMenuTable'
import {AddAppMenuTable} from './AddAppMenuTable'

export class AppMenuTable extends Component {
    constructor(props) {
        super(props);
        this.state = { amts: [], addModalShow: false, editModalShow: false }
    }

    refreshList() {
        fetch(process.env.REACT_APP_API + 'appmenu')
            .then(response => response.json())
            .then(data => {
                this.setState({ amts: data });
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteamt(amtid) {
    if (window.confirm('Are you sure?')) {
        fetch(process.env.REACT_APP_API + 'appmenu/' + amtid, {
            method: 'DELETE',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}

    render() {
        const { amts, amtid, amtname } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });
        return (
            <div >
                <Table className="mt-4" striped bordered hover variant="dark" size="sm">
                    <thead>
                        <tr>
                            <th>APP MENU ID</th>
                            <th>APP MENU LINKS</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {amts.map(amt =>
                            <tr key={amt.Id}>
                                <td>{amt.Id}</td>
                                <td>{amt.AppLinks}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button className="mr-2" variant="info"
                                            onClick={() => this.setState({
                                                editModalShow: true,
                                                amtid: amt.Id, amtname: amt.AppLinks
                                            })}>
                                            Edit
                                        </Button>

                                        <br></br>

                                        <Button className="mr-2" variant="danger"
                                            onClick={() => this.deleteamt(amt.Id)}>
                                            Delete
                                        </Button>

                                        <EditAppMenuTable show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            amtid={amtid}
                                            amtname={amtname} />
                                    </ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}>
                        Add App Menu</Button>

                    <AddAppMenuTable show={this.state.addModalShow}
                        onHide={addModalClose} />
                </ButtonToolbar>
            </div>
        )
    }
}
