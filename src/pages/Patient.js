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
import ReactPaginate from 'react-paginate';

 
  var data=[]
  
    var headers=[
      {label: 'REGNO', key:'regno'},
      {label: 'PERS', key:'pers'},
      {label: 'IDENTITYCARD', key:'idnum'},
      {label: 'SURNAME', key:'firstName'},
      {label: 'FIRSTN', key:'lastName'},
      {label: 'SEX', key:'gender'},
      {label: 'BIRTHD', key:'bd'},
      {label: 'PHONE1', key:'phone'},
      {label: 'PHONEN2', key:'phone1'},
      {label: 'Date', key:'date'}
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
      offset:0,
      tableData:[],
      orgtableData:[],
      perPage:10,
      currentPage:0,
     
    }
    this.handlePageClick = this.handlePageClick.bind(this);
}



handlePageClick = (e) => {
  const selectedPage = e.selected;
  const offset = selectedPage * this.state.perPage;

  this.setState({
      currentPage: selectedPage,
      offset: offset
  }, () => {
      this.loadMoreData()
  });

};

loadMoreData() {
const data = this.state.orgtableData;

const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
this.setState({
pageCount: Math.ceil(data.length / this.state.perPage),
items:slice
})

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

  console.log(this.state.mydatas);
 
  axios.get('https://dev.hisprwanda.org/oncology/api/trackedEntityInstances.json?ou='+this.state.villselected+'&ouMode=DESCENDANTS&pageSize=5&fields=attributes[attribute,value]&program=rx6V962E4XM',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
  .then(res =>{
    //console.log(res.data.trackedEntityInstances)
    this.setState(
      {
        isLoaded: true,
        items:res.data.trackedEntityInstances,
      }
    )
   
  })
  
  var contacts = "REGNO"+"\t"+"PERS"+"\t"+"IDENTITYCARD"+"\t"
  +"SURNAME"+"\t"+"FIRSTN"+"\t"+"SEX"+"\t"+"BIRTHD"+"\t"+"PHONE1"
  +"\t"+"PHONEN2"+"\t"+"NKNAME"+"\t"+"TNNK"+"\t"+"NATIONALITY"
  +"\t"+"DLC"+"\t"+"STATUS"+"\t"+"ONCOPR"
  +"\t"+"IFALIVE"+"\t"+"PROGRESSION"+"\t"+"CAUSEDEATH"+"\t"+"PLACED"+"\t"+"OCD"+"\t"+"OBSOLETEFLAGPATIENTTABLE"+
  "\t"+"PATIENTRECORDID"+"\t"+"PATIENTUPDATEDBY"+"\t"+"PATIENTUPDATEDATE"+"\t"+"PATIENTRECORDSTATUS"+
  "\t"+"PATIENTCHECKSTATUS"+"\t"+"REMARKS";

  

  console.log(this.state.mydatas)
  var aregno="";
  var afname="";
  var lname=""
  var emails="";
  var age="";
  var idnums="";
  var genders="";
  var bds="";
  var mdates="";
  var phn="";
  var phn1="";
  var nkin="";
  var natn="";
  
this.state.mydatas.map(function(itemp, i){
  itemp.enrollments.map(function(enrolmnt, i){
    enrolmnt.events.map(function(evts, i){
console.log("events");
    })
  })

  itemp.attributes.map(function(itm, i){
    
    if(itm.attribute=="Yp8W95xlxMv")
    {
      natn=itm.value;
    
    }
    if(itm.attribute=="iUkIkQbkxI1")
    {
      phn=itm.value;
    
    }
    if(itm.attribute=="YfjjdE6XOBu")
    {
      nkin=itm.value;
    
    }
    if(itm.attribute=="dd98c7o6RjZ")
    {
      phn1=itm.value;
    
    }
    
    
    
    
    
    if(itm.attribute=="PTGSZmTk3IQ")
    {
      aregno=itm.value;
      var strFirstThree = aregno.substring(0,2);
      if(strFirstThree=="20")
      {
        aregno=aregno.substring(2,9); 
      }
      if(strFirstThree=="CR")
      {
        var n1=aregno.substring(4,8);
        var n2=aregno.substring(9,13);
        aregno=n1+n2; 
      }
    }

    if(itm.attribute=="m1At2P4UT9e")
    {
      mdates=itm.value;
      var pyear=mdates.substring(0,4);
      var pmonth=mdates.substring(5,7);
      var pdate=mdates.substring(8,10);
      bds=pyear+pmonth+pdate;

    }
    if(itm.attribute=="l93yUywzP20")
    {
      genders=itm.value;
      if(genders=="Male")
      {
        genders="1"
      }
      else if(genders=="Female")
      {
        genders=="2"
      }
     else{
      genders="1"
     }
    }
    
    if(itm.attribute=="LbuO5oeODsy")
    {
      idnums=itm.value;
      idnums=idnums;
    }
    if(itm.attribute=="mJ3oYSkDyWz")
    {
      afname=itm.value;
    }

    if(itm.attribute=="Uda5alDG8P5")
    {
      lname=itm.value;
    }
    if(itm.attribute=="dd98c7o6RjZ")
    {
      emails=itm.value;
    }
    if(itm.attribute=="m1At2P4UT9e")
    {
      age=itm.value;
    }
  
  })
  var prss="0";
  var tnnk="-1";
  var stus="1";
  var oncopr="1";
  var ifall="1";
  var progress="9";
  var csdeath="";
  var placd="";
  var ocd="";
  var obsplaq="0";
  var patrecid=aregno+"01";
  var recby="Winny";
  var patrecstatus="0";
  var checkstatus="0";
  var remark="";
  var fullstring=aregno+"\t"+prss+"\t"+idnums+"\t"+afname+"\t"+lname+"\t"+genders+
  "\t"+bds+"\t"+phn+"\t"+phn1+"\t"+nkin+"\t"+tnnk+
  "\t"+natn+"\t"+bds+"\t"+stus+"\t"+
  oncopr+"\t"+ifall+"\t"+progress+"\t"+csdeath+"\t"+placd+"\t"+ocd+"\t"+obsplaq+"\t"+patrecid+
  "\t"+recby+"\t"+bds+"\t"+patrecstatus+"\t"+checkstatus+"\t"+remark;
    
         contacts=contacts+'\n'+fullstring;

})


if(!(aregno==""))
{
const element = document.createElement("a");
const file = new Blob([contacts], {type: 'text/plain;charset=utf-8'});
element.href = URL.createObjectURL(file);
element.download = "myFile.txt";
document.body.appendChild(element); // Required for this to work in FireFox
element.click();

}

      
   
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
 
  
console.log(event.target.value)


    this.setState({[nam]: val});

    axios.get('https://dev.hisprwanda.org/oncology/api/trackedEntityInstances.json?ou='+event.target.value+'&ouMode=DESCENDANTS&pageSize=5&fields=attributes[attribute,value],enrollments[events]&program=rx6V962E4XM',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
    .then(res =>{
      
      this.setState(
        {
          isLoaded: true,
          mydatas:res.data.trackedEntityInstances,
        }
      )
     
    })
    
   console.log(this.state.mydatas);

    //var afname="Pascaltest";


    //var datss={firstName: ap,lastName: "NDAYIZIGIYE", email: "pazzosgmail.com", age: "30"}
    //data.push(datss);
   
 
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


    axios.get('https://dev.hisprwanda.org/oncology/api/trackedEntityInstances.json?ou=Hjw70Lodtf2&ouMode=DESCENDANTS&pageSize=30&fields=attributes[attribute,value]&program=rx6V962E4XM',{auth:{username:"pndayizigiye",password:"Pascal@1234"}})
    .then(res =>{
      const datap=res.data.trackedEntityInstances;
      const slice=datap.slice(this.state.offset,this.state.offset+this.state.perPage)
      this.setState(
        {
          isLoaded: true,
          items:slice,
          pageCount:Math.ceil(datap.length/this.state.perPage),
          orgtableData:res.data.trackedEntityInstances,
          tableData:slice
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
                <Button primary  onClick={this.exportexcel} >
                   Download
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
{item.attributes.map((attr, index) =><p>{attr.attribute=="m1At2P4UT9e"?attr.value:""}</p>)}
</TableCell>
<TableCell>
    Incomplete
</TableCell>
</TableRow>






)} 
 


   
    
 <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
    
    
  </TableBody>
 
</Table>















    </div>
  )










}

 
  }


export default Patient;
