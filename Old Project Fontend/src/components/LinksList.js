import React from 'react';
import moment from 'moment';

 
export class LinksList extends React.Component {
     
    constructor() {
         
        super();
         
        this.state = { linksListData: [], loading: true };
         
        fetch('Links')
            .then(response => response.json())
            .then(data => {
                 
                this.setState({ linksListData: data, loading: false });
            });

        this.FuncDelete = this.FuncDelete.bind(this);
        this.FuncEdit = this.FuncEdit.bind(this);
    }

     
    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderLinksListTable(this.state.linksListData);
        return <div>
            <h1>Links </h1>
            <p>
                <a href="add-links-list"><button className="btn btn-primary"><i className="plus icon"></i>Create New</button></a>
            </p>
            {contents}
        </div>;
    }

    FuncDelete(linkId) {

        if (window.confirm("Do you want to delete Links List with this Id: " + linkId) === false)
            return;
        else {

            fetch('Links/' + linkId, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        linksListData: this.state.linksListData.filter((rec) => {
                            return (rec.linkId !== linkId);
                        })
                    });
            });
        }
    }
     
    FuncEdit(linkId) {
         
        this.props.history.push("/links/edit/" + linkId);
    }
     
    renderLinksListTable(linksListData) {
      
        return <table className='table'>
            <thead>
                <tr>
                    <th>Link Name</th>
                    <th>Link</th>
                    <th>Sub Menu Name</th>
                    <th>Created By</th>
                    <th>Active Status</th>
                    <th>Creation Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody> 
                {linksListData.map(item =>
                    <tr key={item.linkId}>
                        <td>{item.linkName}</td>
                        <td><a href="{item.link}" target="_blank">{item.link}</a></td>
                        <td>{item.subMenu.subName}</td>
                        <td>{item.createdBy}</td>
                        <td>{item.activeStatus}</td>
                        <td>{moment(item.creationDate).format('YYYY-MM-DD')}</td>
                        <td><button className="btn btn-warning" onClick={(linkId) => this.FuncEdit(item.linkId)}><i className="edit icon"></i>Edit</button>
                            <button className="btn btn-danger" onClick={(linkId) => this.FuncDelete(item.linkId)}><i className="trash icon"></i>Delete</button></td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}
 
export class linksListData  {
    linkId = 0;
    linkName = "";
    link = "";
    subMenuId = 0;
    activeStatus = "";
    createdBy = "";
    creationDate = "";
}