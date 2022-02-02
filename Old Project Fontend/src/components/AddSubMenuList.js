import React from 'react';
import { subMenuListData } from './SubMenuList';
import moment from 'moment';


export class AddSubMenuList extends React.Component {
    constructor(props) {
        super(props);


        this.state = { title: "", loading: true, appMenuListData: [], subMenuList: new subMenuListData() };

        fetch('AppMenu')
            .then(response => response.json())
            .then(data => {

                this.setState({ appMenuListData: data, loading: false });
            });


        var subMenuId = this.props.match.params["subMenuId"];


        if (subMenuId > 0) {
            fetch('SubMenu/' + subMenuId)
                .then(response => response.json())
                .then(data => {

                    this.setState({ title: "Edit", loading: false, subMenuList: data });
                });
        }
        else {
            this.state = { title: "Create", loading: false, appMenuListData: [], subMenuList: new subMenuListData() };
        }

        this.FuncSave = this.FuncSave.bind(this);
        this.FuncCancel = this.FuncCancel.bind(this);
    }


    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.appMenuListData);
        return <div>
            <h1>{this.state.title} Sub Menu</h1>
            <hr />
            {contents}
        </div>;
    }



    FuncSave(event) {
        event.preventDefault();
        const data = new FormData(event.target)
        
        if (this.state.subMenuList.subMenuId) {
            fetch('SubMenu', {
                method: 'PUT',
                body: data,
            }).then((response) => {
                this.props.history.push("/sub-menu-list");
            })
        }
        else {

            fetch('SubMenu', {
                method: 'POST',
                body: data,
            })
                .then(response => {
                    this.props.history.push("/sub-menu-list");
                })
        }
    }


    FuncCancel(e) {
        e.preventDefault();
        this.props.history.push("/sub-menu-list");
    }
     

    renderCreateForm(appMenuListData) {

        return (

            <form onSubmit={this.FuncSave} >
                <div className="form-group row" >
                    <input type="hidden" name="subMenuId" value={this.state.subMenuList.subMenuId} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="name">Sub Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="subName" placeholder="Sub Name" defaultValue={this.state.subMenuList.subName} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="active">App Name</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="appId" placeholder="App Name" defaultValue={this.state.subMenuList.appId} required>
                            <option value="">-- Select App Menu --</option>
                            {appMenuListData.map(item =>
                                <option key={item.appId} value={item.appId}>{item.appName}</option>
                            )}
                        </select> 
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="created">Created By</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="createdBy" placeholder="Created By" defaultValue={this.state.subMenuList.createdBy} required />
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="active">Active Status</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="activeStatus" placeholder="Active Status" defaultValue={this.state.subMenuList.activeStatus} required>
                            <option value="">-- Select Status --</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                        </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="date">Creation Date</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="creationDate" placeholder="Creation Date " defaultValue={moment(this.state.subMenuList.creationDate).format('YYYY-MM-DD')} required />
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