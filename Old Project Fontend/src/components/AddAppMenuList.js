import React from 'react';
import { appMenuListData } from './AppMenuList';
import moment from 'moment';

export class AddAppMenuList extends React.Component {
    constructor(props) {
        super(props);

        this.state = { title: "", loading: true, appMenuList: new appMenuListData() };


        var appId = this.props.match.params["appId"];


        if (appId > 0) {
            fetch('AppMenu/' + appId)
                .then(response => response.json())
                .then(data => {

                    this.setState({ title: "Edit", loading: false, appMenuList: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, appMenuList: new appMenuListData() };
        }

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }


    render() { 
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();
        return <div>
            <h1>{this.state.title} App Menu</h1>
            <hr />
            {contents}
        </div>;
    }

     
    FuncSave(event) {
        event.preventDefault();
        const data = new FormData(event.target)

        if (this.state.appMenuList.appId) {
            fetch('AppMenu', {
                method: 'PUT',
                body: data,
            }).then((response) => {
                this.props.history.push("/app-menu-list");
            })
        }
        else {

            fetch('AppMenu', {
                method: 'POST',
                body: data,
            })
                .then(response => {
                    this.props.history.push("/app-menu-list");
                })
        }
    }


    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/app-menu-list");
    }
     
    renderCreateForm() {
        return (

            <form onSubmit={this.FuncSave} >
                <div className="form-group row" >
                    <input type="hidden" name="appId" value={this.state.appMenuList.appId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">App Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="appName" placeholder="App Name" defaultValue={this.state.appMenuList.appName} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="created">Created By</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="createdBy" placeholder="Created By" defaultValue={this.state.appMenuList.createdBy} required />
                    </div>
                </div>


                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="active">Active Status</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="activeStatus" placeholder="Active Status" defaultValue={this.state.appMenuList.activeStatus} required >
                            <option value="">-- Select Status --</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="date">Creation Date</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="creationDate" placeholder="Creation Date " defaultValue={moment(this.state.appMenuList.creationDate).format('YYYY-MM-DD')} required />
                    </div>
                </div>


                <div className="form-group">
                    <button type="submit" className="btn btn-success"><i className="save icon"></i>Save</button>
                    {' '}
                    <button className="btn btn-danger" onClick={this.FuncCancel}><i className="cancel icon"></i>Cancel</button>
                </div>
            </form>
        )
    }
}