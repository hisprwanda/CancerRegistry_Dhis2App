import React,{Component,useState} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import {CSVLink} from 'react-csv'

import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableCellHead,
    TableHead,
    TableRow,
    TableRowHead,
    InputFieldFF,
    SingleSelectFieldFF,
    SwitchFieldFF,
    composeValidators,
    createEqualTo,
    email,
    hasValue,
  } from "@dhis2/ui";
  import styles from './Form.module.css'
  import { ReactFinalForm } from '@dhis2/ui'

 
  var data=[]
  
    var headers=[
      {label: 'First Name', key:'firstName'},
      {label: 'Last Name', key:'lastName'},
      {label: 'Email', key:'email'},
      {label: 'Age', key:'age'}
    ]
   

    var csvReport={
      filename:'Report.csv',
      headers: headers,
      data:data
    
    }



  /**
 * This is just a function to demonstrate the values when the form is submitted
 * It takes the form's values (which is an object), transforms it into readable JSON,
 * and then finally displays the values in an alert box
 *
 * @param {Object} values
 * @param {string} values.title
 * @param {string} values.surname
 * @param {string} values.firstname
 * @param {string} values.email
 * @param {string} values.email-confirmation
 * @param {bool} values.newsletter
 */
const alertValues = values => {
  const formattedValuesString = JSON.stringify(values, null, 2)
  
}

const { Field } = ReactFinalForm


class Patient extends Component
{
constructor(){
  super();
    this.state={
      items:[],
      mydatas:[],
      orgs:[],
      isLoaded: false,
      selectValue:0,
      districts:[],
      sectors:[],
      cells:[],
      villages:[],
      provselected: '',
      disselected: '',
      sectselected: '',
      celselected: '',
      villselected: '',
    }
}
myFunc= (event) =>{
  
  let nam = event.target.name;
  let val = event.target.value;
    this.setState({[nam]: val});
  
  axios.get('https://dev.hisprwanda.org/oncology/api/organisationUnits/'+event.target.value+'.json?fields=children[name,id]',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
  .then(res =>{
    console.log(res.data.children)
    this.setState(
      {
        districts:res.data.children,
      }
    )
   
  })

 
}

myChangeHandler = (event) => {
 
 // alert(this.state.villselected)
   

      axios.get('https://dev.hisprwanda.org/oncology/api/trackedEntityInstances.json?ou='+this.state.villselected+'&ouMode=DESCENDANTS&pageSize=5&fields=attributes[attribute,value]&program=rx6V962E4XM',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
      .then(res =>{
        console.log(res.data.trackedEntityInstances)
        this.setState(
          {
            isLoaded: true,
            items:res.data.trackedEntityInstances,
          }
        )
       
      }) 
  
}

exportexcel = (event) => {


 
  axios.get('https://dev.hisprwanda.org/oncology/api/trackedEntityInstances.json?ou='+this.state.villselected+'&ouMode=DESCENDANTS&pageSize=5&fields=attributes[attribute,value]&program=rx6V962E4XM',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
  .then(res =>{
    console.log(res.data.trackedEntityInstances)
    this.setState(
      {
        isLoaded: true,
        items:res.data.trackedEntityInstances,
      }
    )
   
  }) 

 
      
   
 }

sectorfilter= (event) =>{
  let nam = event.target.name;
  let val = event.target.value;
    this.setState({[nam]: val});
 
  axios.get('https://dev.hisprwanda.org/oncology/api/organisationUnits/'+event.target.value+'.json?fields=children[name,id]',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
  .then(res =>{
    console.log(res.data.children)
    this.setState(
      {
        sectors:res.data.children,
      }
    )
   
  })
}

villagfilter= (event) =>{
  let nam = event.target.name;
  let val = event.target.value;
    this.setState({[nam]: val});

    axios.get('https://dev.hisprwanda.org/oncology/api/trackedEntityInstances.json?ou='+this.state.villselected+'&ouMode=DESCENDANTS&pageSize=5&fields=attributes[attribute,value]&program=rx6V962E4XM',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
    .then(res =>{
      console.log(res.data.trackedEntityInstances)
      this.setState(
        {
          isLoaded: true,
          mydatas:res.data.trackedEntityInstances,
        }
      )
     
    }) 

    var datss={firstName: "Pascaltest",lastName: "NDAYIZIGIYE", email: "pazzosgmail.com", age: "30"}
    data.push(datss);
 
}





cellfilter= (event) =>{
  
  let nam = event.target.name;
  let val = event.target.value;
    this.setState({[nam]: val});

  axios.get('https://dev.hisprwanda.org/oncology/api/organisationUnits/'+event.target.value+'.json?fields=children[name,id]',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
  .then(res =>{
    console.log(res.data.children)
    this.setState(
      {
        cells:res.data.children,
      }
    )
   
  })
}
villagefilter= (event) =>{
  
 let nam = event.target.name;
  let val = event.target.value;
    this.setState({[nam]: val});

  axios.get('https://dev.hisprwanda.org/oncology/api/organisationUnits/'+event.target.value+'.json?fields=children[name,id]',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
  .then(res =>{
    console.log(res.data.children)
    this.setState(
      {
        villages:res.data.children,
      }
    )
   
  })
}
  componentDidMount(){
    axios.get('https://dev.hisprwanda.org/oncology/api/trackedEntityInstances.json?ou=Hjw70Lodtf2&ouMode=DESCENDANTS&pageSize=5&fields=attributes[attribute,value]&program=rx6V962E4XM',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
    .then(res =>{
      console.log(res.data.trackedEntityInstances)
      this.setState(
        {
          isLoaded: true,
          items:res.data.trackedEntityInstances,
        }
      )
     
    })

    axios.get('https://dev.hisprwanda.org/oncology/api/organisationUnits.json?paging=false&level=2',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
    .then(res =>{
      console.log(res.data.organisationUnits)
      this.setState(
        {
          orgs:res.data.organisationUnits,
        }
      )
     
    })
  }
 


  render(){
    var a = 0;
   
      
   
  return(

    <div className='products'>

<h1>Location Filter</h1>

<ReactFinalForm.Form onSubmit={this.myChangeHandler}>
    {({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>


<Table>
  <TableHead>
      <TableRowHead>
          <TableCellHead>
              
            <div className={styles.row}>
              <select className={styles.cbx} onChange={this.myFunc} name='provselected'   >
              <option value="0">Select Province...</option>
              {this.state.orgs.map((orgn, index) =>
                <option value={orgn.id}>{orgn.displayName}</option>
                

              )}
              </select>
            </div>
          </TableCellHead>
          <TableCellHead>
          <div className={styles.row}>
              <select className={styles.cbx} onChange={this.sectorfilter} name='disselected' >
              <option value="0">Select District...</option>
              {this.state.districts.map((distr, index) =>
                <option value={distr.id}>{distr.name}</option>

              )}
              </select>
            </div>
          </TableCellHead>
          <TableCellHead>
          <div className={styles.row}>
              <select className={styles.cbx} onChange={this.cellfilter} name='sectselected' >
              <option value="0">Select sector...</option>
              {this.state.sectors.map((sect, index) =>
                <option value={sect.id}>{sect.name}</option>

              )}
              </select>
            </div>
          </TableCellHead>
          <TableCellHead>
          <div className={styles.row}>
              <select className={styles.cbx} onChange={this.villagefilter} name='celselected'  >
              <option value="0">Select Cell...</option>
              {this.state.cells.map((cels, index) =>
                <option value={cels.id}>{cels.name}</option>

              )}
              </select>
            </div>
          </TableCellHead>
        
          <TableCellHead>
          <div className={styles.row}>
              <select className={styles.cbx}  onChange={this.villagfilter} name='villselected' >
              <option value="0">Select Villages...</option>
              {this.state.villages.map((vill, index) =>
                <option value={vill.id}>{vill.name}</option>

              )}
              </select>
            </div>
          </TableCellHead>
          <TableCellHead>
          <div className={styles.row}>
                <Button primary type="submit" >
                    Filter Data
                </Button>
            </div>
          </TableCellHead>
          <TableCellHead>
          <div className={styles.row}>
                <Button primary type="button" onClick={this.exportexcel} >
                  <CSVLink {...csvReport}> Download</CSVLink> 
                </Button>
            </div>
          </TableCellHead>
         
      </TableRowHead>
  </TableHead></Table>


          
        </form>
    )}
</ReactFinalForm.Form>


<br /><br />


      <Table>
  <TableHead>
      <TableRowHead>
          <TableCellHead>
              First name
          </TableCellHead>
          <TableCellHead>
              Last name
          </TableCellHead>
          <TableCellHead>
              Phone Number
          </TableCellHead>
          <TableCellHead>
              DOB
          </TableCellHead>
        
          <TableCellHead>
              UID
          </TableCellHead>
          <TableCellHead>
              Other Phone
          </TableCellHead>
          <TableCellHead>
              Status
          </TableCellHead>
      </TableRowHead>
  </TableHead>
  <TableBody>
  

  {this.state.items.map((item, index) =>  

  


<TableRow>
<TableCell>
  
{item.attributes.map((attr, index) =><p>{attr.attribute=="mJ3oYSkDyWz"?attr.value:""}</p>)}
</TableCell>
<TableCell>
{item.attributes.map((attr, index) =><p>{attr.attribute=="Uda5alDG8P5"?attr.value:""}</p>)}
</TableCell>
<TableCell>
{item.attributes.map((attr, index) =><p>{attr.attribute=="dd98c7o6RjZ"?attr.value:""}</p>)}
</TableCell>
<TableCell>
{item.attributes.map((attr, index) =><p>{attr.attribute=="m1At2P4UT9e"?attr.value:""}</p>)}
</TableCell>

<TableCell>
{item.attributes.map((attr, index) =><p>{attr.attribute=="PTGSZmTk3IQ"?attr.value:""}</p>)}
</TableCell>
<TableCell>
{item.attributes.map((attr, index) =><p>{attr.attribute=="pnXiH7HdfGx"?attr.value:""}</p>)}
</TableCell>
<TableCell>
    Incomplete
</TableCell>
</TableRow>






)} 
 


   
    
    
    
    
  </TableBody>
 
</Table>















    </div>
  )










}

 
  }


export default Patient;
