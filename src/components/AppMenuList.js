import React from 'react';
import moment from 'moment';

 
export class AppMenuList extends React.Component {
     
    constructor() {
         
        super();
         
        this.state = { appMenuListData: [], loading: true };
         
        fetch('AppMenu')
            .then(response => response.json())
            .then(data => {
                 
                this.setState({ appMenuListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

     
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderAppMenuListTable(this.state.appMenuListData);
        return <div>
            <h1>App Menu </h1>
            <p>
                <a href="add-app-menu-list"><button className="btn btn-primary"><i className="plus icon"></i>Create New</button></a>
            </p>
            {contents}
        </div>;
    }

    FuncDelete(appId) {

        if (window.confirm("Do you want to delete App Menu List with this Id: " + appId) === false)
            return;
        else {

            fetch('AppMenu/' + appId, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        appMenuListData: this.state.appMenuListData.filter((rec) => {
                            return (rec.appId !== appId);
                        })
                    });
            });
        }
    }
     
    FuncEdit(appId) {
         
        this.props.history.push("/appmenu/edit/" + appId);
    }
     
    renderAppMenuListTable(appMenuListData) {
      
        return <table className='table'>
            <thead>
                <tr>
                    <th>App Name</th>
                    <th>Created By</th>
                    <th>Active Status</th>
                    <th>Creation Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody> 
                {appMenuListData.map(item =>
                    <tr key={item.appId}>
                        <td>{item.appName}</td>
                        <td>{item.createdBy}</td>
                        <td>{item.activeStatus}</td>
                        <td>{moment(item.creationDate).format('YYYY-MM-DD')}</td>
                        <td><button className="btn btn-warning" onClick={(appId) => this.FuncEdit(item.appId)}><i className="edit icon"></i>Edit</button>
                            <button className="btn btn-danger" onClick={(appId) => this.FuncDelete(item.appId)}><i className="trash icon"></i>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
 
export class appMenuListData {
    appId = 0;
    appName = "";
    activeStatus = "";
    createdBy = "";
    creationDate = "";
}