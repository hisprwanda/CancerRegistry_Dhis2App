import { useDataQuery , useAlert} from '@dhis2/app-runtime'
import { Button, CircularLoader, InputField, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";

import { AllRecordsHeaderView } from './AllRecordsHeaderView'
import React, { useState } from 'react'

import { PaginationControls } from './TumourComponents/PaginationControls'
import * as classes from '../App.module.css'
import i18n from "../locales/index.js";
import styles from './Form.module.css'

import { formatTodayDate } from "../app_utils/App_Utils";


const eventsQuery = {
    results: {
        resource: 'trackedEntityInstances.json',
        params: ({ page, startDate, endDate, orgUnitID, pageSize, ouMode }) => ({
            page: page,
            ou: orgUnitID,
            ouMode: ouMode,
            program: 'rx6V962E4XM',
            fields: ['attributes[attribute,value],enrollments[events[storedBy,event,programStage,dataValues[dataElement,value]]]'],
            programStartDate:startDate,
            programEndDate:endDate,
            totalPages: true,
            pageSize: pageSize,
        }),
    },
    provinces: {
        resource: 'organisationUnits',
        id: 'Hjw70Lodtf2',
        params:{
            fields: ['children[name,id]']
        },
    },
}

export const Patient = () => {
    const [forFileDownload, setForFileDownload] = useState(false)

    const formatPatientID = (oldID) => {
        var newID
        if (oldID.length == 9) { 
            newID = oldID.substring(0, 4) + oldID.substring(5);
        } else if  (oldID.length == 14) { 
            newID = oldID.substring(4, 8) + oldID.substring(10);
        }else {
            newID = oldID
        }
        return newID;
    }


    const exportTSVFile = (trackedEntityInstances) =>{

        var contacts = "REGNO"+"\t"+"PERS"+"\t"+"IDENTITYCARD"+"\t"
        +"SURNAME"+"\t"+"FIRSTN"+"\t"+"SEX"+"\t"+"BIRTHD"+"\t"+"PHONE1"
        +"\t"+"PHONEN2"+"\t"+"NKNAME"+"\t"+"TNNK"+"\t"+"NATIONALITY"
        +"\t"+"DLC"+"\t"+"STATUS"+"\t"+"ONCOPR"
        +"\t"+"IFALIVE"+"\t"+"PROGRESSION"+"\t"+"CAUSEDEATH"+"\t"+"PLACED"+"\t"+"OCD"+"\t"+"OBSOLETEFLAGPATIENTTABLE"+
        "\t"+"PATIENTRECORDID"+"\t"+"PATIENTUPDATEDBY"+"\t"+"PATIENTUPDATEDATE"+"\t"+"PATIENTRECORDSTATUS"+
        "\t"+"PATIENTCHECKSTATUS"+"\t"+"REMARKS";

        //variable declaration...

        let aregno=""
        let aregnoOld = ""
        // end of global variable declaration...

        trackedEntityInstances.map((itemp) => {
            aregno = "";
            aregnoOld = "";
            let afname="", lname="", emails="", age="", idnums="", genders="", bds="", mdates="",incdates="", phn="", phn1="", nkin="", natn="", stus="", oncopr="", progress="", csdeath="", placd="", datelastcontact="",remark="",inciddates="",datelst="",datelastcontact_temp="",recby="";

            itemp.enrollments.map((enrolmnt) => {
                enrolmnt.events.map((evts) => {
                    //stus="";datelastcontact="";oncopr="";progress="";csdeath="";placd="";remark="";inciddates="";
//tumor script to store the date of last contact


                    if(evts.programStage=="Y0cWLBEdXzb")
                    {
                        evts.dataValues.map(function(dttumors, i){
                    
                   

                    if(dttumors.dataElement=="qiPi86HJH9D")
                    {
                        //console.log(dtvalues.value);
                        incdates=dttumors.value;
               // var incyear=incdates.substring(0,4);
               // var incmonth=incdates.substring(5,7);
                //var incdate=incdates.substring(8,10);
               // inciddates=incyear+incmonth+incdate;
                    }
                  
                    
                    })
                    }




// follow up script

                    
                    if(evts.programStage=="yj7nAGqKXZw")
                    {


                        evts.dataValues.map(function(dtvalues, i){

                            if(dtvalues.dataElement=="ZBgYdd6OKlc")
                            {
                                //console.log(dtvalues.value);
                        mdates=dtvalues.value;
                        datelastcontact_temp=mdates;
                        
                       // var pyear=mdates.substring(0,4);
                       // var pmonth=mdates.substring(5,7);
                       // var pdate=mdates.substring(8,10);
                       // datelastcontact=pyear+pmonth+pdate;
                        
                            }

                            var datelastcontact_temp_conv=new Date(datelastcontact_temp);
                            var datelst_conv=new Date(datelst);
                          
                            datelst=datelastcontact_temp;
                         

                    
                    if(dtvalues.dataElement=="ya7NvvPZ6NE")
                    {
                        //console.log(dtvalues.value);
                        stus=dtvalues.value;
                    }

                    if(dtvalues.dataElement=="TFmh28f4Ylz")
                    {
                        //console.log(dtvalues.value);
                        oncopr=dtvalues.value;
                    }
                    if(dtvalues.dataElement=="CiP6FnZEAr7")
                    {
                        //console.log(dtvalues.value);
                        progress=dtvalues.value;
                    }
                    if(dtvalues.dataElement=="amOhRQ0vBI7")
                    {
                        //console.log(dtvalues.value);
                        csdeath=dtvalues.value;
                    }
                    if(dtvalues.dataElement=="CMycg9jCdw3")
                    {
                        //console.log(dtvalues.value);
                        placd=dtvalues.value;
                    }
                    if(dtvalues.dataElement=="OjKZjjByH9n")
                    {
                        //console.log(dtvalues.value);
                        remark=dtvalues.value;
                    }
                    
                    // recorded by
                    recby = evts.storedBy?evts.storedBy:"";
                    
                    
                    
                    
                    
                    })



                    }

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
                
                
                
                
                
                if(itm.attribute=="uWRHiEUPnP7") {
                aregno=itm.value
                }
                if(itm.attribute=="PTGSZmTk3IQ") {
                    aregnoOld=itm.value
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

        //finalizing the declaration and map the values into one single variable so that it can be exported in a file
        
            var prss="0";
            var tnnk="-1";
            
            var ifall="1";

            if(aregno=="")
            {
                aregno=aregnoOld;
            }
            
            
            if ((!(aregno=="")) && (aregno.length == 8)) {
                
                var ocd="";
                var obsplaq="0";
                var patrecid=aregno+"01";
                recby=recby;
                var patrecstatus="0";
                var checkstatus="0";

                var datelast=new Date(datelst);
                var dateinc=new Date(incdates);

                var datediff=Math.floor((Math.abs(datelast-dateinc))/(1000*60*60*24));
          if(datediff<0){
                    //date 1 is newer
                    datelastcontact="";
                  
                }
                else{

                   var pyear=datelst.substring(0,4);
                        var pmonth=datelst.substring(5,7);
                        var pdate=datelst.substring(8,10);
                        datelastcontact=pyear+pmonth+pdate;   
                }


               /* if(datelast.getTime() <= dateinc.getTime()){
                    //date 1 is newer
                    datelastcontact="";
                  
                }
                else{

                   var pyear=datelst.substring(0,4);
                        var pmonth=datelst.substring(5,7);
                        var pdate=datelst.substring(8,10);
                        datelastcontact=pyear+pmonth+pdate;   
                }*/
              
                var fullstring=aregno+"\t"+prss+"\t"+idnums+"\t"+afname+"\t"+lname+"\t"+genders+"\t"+bds+"\t"+phn+"\t"+phn1+"\t"+nkin+"\t"+tnnk+ "\t"+natn+"\t"+datelastcontact+"\t"+stus+"\t"+ 
                oncopr+"\t"+ifall+"\t"+progress+"\t"+csdeath+"\t"+placd+"\t"+ocd+"\t"+obsplaq+"\t"+patrecid+ "\t"+recby+"\t"+formatTodayDate()+"\t"+patrecstatus+"\t"+checkstatus+"\t"+remark; contacts=contacts+'\n'+fullstring;
            }

        });

        
        const element = document.createElement("a");
        const file = new Blob([contacts], {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "patient_data.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

        // Reset file dowload to false
        setForFileDownload(false)

        // Show paginated list again
        refetch({ 
            pageSize: 5
        })

    }

    // A dynamic alert to communicate success or failure 
    const { show } = useAlert(
        ({ message }) => message,
        ({ status }) => {
            if (status === 'success') return { success: true }
            else if (status === 'error') return { critical: true }
            else return {}
        } )

    const { loading, error, data, refetch } = useDataQuery(eventsQuery, {
        variables: { page: 0, startDate: '2021-02-01', endDate: '2021-06-01', orgUnitID: 'OujzhM1lgN5', pageSize: 5, ouMode: 'SELECTED' },
    })

    if (error) { return <span>ERROR: {error.message}</span> }

    if (loading) {
        return (
            <>
                <CircularLoader />
            </>
        )
    }

    if (data.results.trackedEntityInstances) {  
        const message = 'SUCCESS: Successfully retrieved patient events.'
        if (forFileDownload) {
            exportTSVFile(data.results.trackedEntityInstances)
        }
        show({ message, status: 'success' })
    }

    const updateDowloadInfo = (pageSize) =>{
        setForFileDownload(true)

        refetch({ 
            pageSize: pageSize
        })
    }

    // Refetches and updates the patient data as long as the Filter button is clicked
    const updateFetchInfo = (startDate, endDate, orgUnitID, ouMode) => {
        refetch({ 
            startDate: startDate,
            endDate: endDate,
            orgUnitID: orgUnitID,
            ouMode: ouMode 
        })

        setForFileDownload(false)
    }

    return (

        <div className={classes.tableContainer}>
          <div className='products'>
            <AllRecordsHeaderView onUpdateFetchInfo={updateFetchInfo} provinces={data.provinces.children}/>
            
            <Table>
                                <TableHead>
                                    <TableRowHead>
                                        <TableCellHead className={styles.leftcell}>
                                            <div className={styles.row}>
                                                <div className={styles.downloadfiles}>
                                                <Button primary onClick={() => {updateDowloadInfo(data.results.pager.total)}}>{i18n.t('Download Patient Data')} </Button>
              </div>

                                            </div>
                                        </TableCellHead>
                                    </TableRowHead>
                                </TableHead>
                            </Table>

            <Table>
            <TableHead>
                <TableRowHead>
                <TableCellHead>First name</TableCellHead>
                            <TableCellHead>Last name</TableCellHead>
                            <TableCellHead>Phone Number</TableCellHead>
                            <TableCellHead>DOB</TableCellHead>

                            <TableCellHead>UID</TableCellHead>
                            <TableCellHead>Other Phone</TableCellHead>
                           

                </TableRowHead>
            </TableHead>
            <TableBody>
                {data.results.trackedEntityInstances.map((item) => (
            <TableRow>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'mJ3oYSkDyWz'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'Uda5alDG8P5'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'dd98c7o6RjZ'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'm1At2P4UT9e'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>

                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'uWRHiEUPnP7'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {item.attributes.map((attr, index) => (
                                        <p>
                                            {attr.attribute == 'dd98c7o6RjZ'
                                                ? attr.value
                                                : ''}
                                        </p>
                                    ))}
                                </TableCell>
                               
                            </TableRow>

                ))
                }
                </TableBody>
            </Table>
        </div>
            <PaginationControls pager={data.results.pager} refetch={refetch} />
        </div>
    )
}