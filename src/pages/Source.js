import { useDataQuery, useAlert } from '@dhis2/app-runtime'
import { Button, CircularLoader, InputField, Table, TableBody, TableCell, TableCellHead, TableHead, TableRow, TableRowHead } from "@dhis2/ui";

import { DataFilterHeaderView } from './DataFilterHeaderView'
import React, { useState } from 'react'

import { PaginationControls } from './SourceComponents/PaginationControls'
import * as classes from '../App.module.css'
import i18n from "../locales/index.js";
import styles from './Form.module.css'


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
            pageSize:pageSize,
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

export const Source = () => {
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
  
        var contacts = "TUMOURIDSOURCETABLE"+"\t"+"SOURCERECORDID"+"\t"+"SRC"+"\t"
        +"SRVC"+"\t"+"SRCNO"+"\t"+"ARCHVC"+"\t"+"ADMNDATE"+"\t"+"DATESC"+"\t"+"DISDATE"+"\t"+"LABO"+"\t"+"LABNO"+"\t"+"BIOPSYNO"+"\t"+"RECEPTNDATE"+"\t"+"REPRTDATE"+"\t"+"FROM"+"\t"+"SRCDATE"+"\t"+"TO"+"\t"+"INTENTREF";

        //variable declaration...
        let tumourid_src_table="", source_record_id="", tumor_src="", source_service="", patient_hospital_number="", archive_code="", date_of_admition="", date_of_discharge="", date_of_adm="", source_labo="", labnun="", Biopsy_Number="", Date_of_reception="", Date_of_Report="", Referred_from="", srcdate="", Referred_to="", Referred_for="", aregno="";
        // end of global variable declaration...
        let temp_sourceid_src_table="";


//mapping datas in file to download

trackedEntityInstances.map((tei) => {
    let uniqueId = ''
    let sourceCounts = 0
    let sourceEvents = []
    tei.attributes.map((item) => {
        if (item.attribute == 'PTGSZmTk3IQ') {
            uniqueId = formatPatientID(item.value)
        }
    })
    
    // Getting the number of Tumour  stage events present in the current enrollment
    tei.enrollments.map((enrollment) => {
        enrollment.events.map((teiEvent) => {
            if(teiEvent.programStage=="x0UOKjUKJsO"){
                sourceCounts ++
                sourceEvents.push(teiEvent)
            } 
        })
    })
    
    for (let i = 0; i < sourceEvents.length; i++) {
        let teiEvent = sourceEvents[i]

       
                    aregno = uniqueId+"0101"; 
                    source_record_id=aregno+"0"+(i+1);
                    tumourid_src_table=aregno;
        
        // Filling the rest of the tumor table fields
        teiEvent.dataValues.map((dataValue) =>{
            if(dataValue.dataElement == "WEMqZvXK07I") { tumor_src = dataValue.value }
            if(dataValue.dataElement == "v9h8LhYlF2k") { source_service = dataValue.value }
            if(dataValue.dataElement == "gfyCp3UGFBg") { patient_hospital_number = dataValue.value }
            if(dataValue.dataElement == "g5PfzRwNHVy") { archive_code = dataValue.value }
            if(dataValue.dataElement=="alUwzyO4ksp")
            {
                //console.log(dtvalues.value);
                var dats=dataValue.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                date_of_admition=pyear+pmonth+pdate;

            }
            if(dataValue.dataElement=="Ntf8uwbttrj")
            {
                //console.log(dtvalues.value);
                var dats=dataValue.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                date_of_discharge=pyear+pmonth+pdate;

            }




            if(dataValue.dataElement=="cVDk6Qi4aXJ")
            {
                //console.log(dtvalues.value);
                source_labo=dataValue.value;
            }
            if(dataValue.dataElement=="m9zPgjtU6Ck")
            {
                //console.log(dtvalues.value);
                labnun=dataValue.value;
            }
            if(dataValue.dataElement=="K90OuFCv3c8")
            {
                //console.log(dtvalues.value);
                Biopsy_Number=dataValue.value;
            }
            if(dataValue.dataElement=="iUev3OfIqOg")
            {
                //console.log(dtvalues.value);
                var dats=dataValue.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                Date_of_reception=pyear+pmonth+pdate;

            }
            if(dataValue.dataElement=="kNjR9xQM4Wv")
            {
                //console.log(dtvalues.value);
                var dats=dataValue.value;

                var pyear=dats.substring(0,4);
                var pmonth=dats.substring(5,7);
                var pdate=dats.substring(8,10);
                Date_of_Report=pyear+pmonth+pdate;

            }
            
            if(dataValue.dataElement=="sLGqIdIjg20")
            {
                //console.log(dtvalues.value);
                Referred_from=dataValue.value;
            }
            if(dataValue.dataElement=="yvXtJYq4f5A")
            {
                //console.log(dtvalues.value);
                Referred_to=dataValue.value;
            }
            if(dataValue.dataElement=="BD4nYiPXwLN")
            {
                //console.log(dtvalues.value);
                Referred_for=dataValue.value;
            }
      
    
        });
        if(!(tumor_src==""))
                {
                var fullstring=tumourid_src_table+"\t"+source_record_id+"\t"+tumor_src+"\t"+source_service+"\t"+patient_hospital_number+"\t"+archive_code+
                "\t"+date_of_admition+"\t"+date_of_adm+"\t"+date_of_discharge+"\t"+source_labo+"\t"+labnun+"\t"+Biopsy_Number+
                "\t"+Date_of_reception+"\t"+Date_of_Report+"\t"+Referred_from+"\t"+
                srcdate+"\t"+Referred_to+"\t"+Referred_for;
                        contacts=contacts+'\n'+fullstring;
                }
    }
});



/*



        trackedEntityInstances.map((itemp) => {

            itemp.attributes.map(function(itm, i){
                
                if(itm.attribute=="PTGSZmTk3IQ") {
                    let patientID = formatPatientID(itm.value)
                    aregno = patientID+"0101"; 
                    temp_sourceid_src_table=aregno+"0";
                    tumourid_src_table=aregno;
                
                }
            })
            
            itemp.enrollments.map(function(enrolmnt, i){
                let j = 1
                enrolmnt.events.map(function(evts, i){
           
                if(evts.programStage=="x0UOKjUKJsO")
                {
                    source_record_id=temp_sourceid_src_table+j;
                
                    j++
                    evts.dataValues.map(function(dtvalues, i){
                
                if(dtvalues.dataElement=="WEMqZvXK07I")
                {
                    
                    //console.log(dtvalues.value);
                    tumor_src=dtvalues.value;
                }
                
                if(dtvalues.dataElement=="v9h8LhYlF2k")
                {
                    //console.log(dtvalues.value);
                    source_service=dtvalues.value;
                }
                if(dtvalues.dataElement=="gfyCp3UGFBg")
                {
                    //console.log(dtvalues.value);
                    patient_hospital_number=dtvalues.value;
                }
                if(dtvalues.dataElement=="g5PfzRwNHVy")
                {
                    //console.log(dtvalues.value);
                    archive_code=dtvalues.value;
                }
                if(dtvalues.dataElement=="alUwzyO4ksp")
                {
                    //console.log(dtvalues.value);
                    var dats=dtvalues.value;

                    var pyear=dats.substring(0,4);
                    var pmonth=dats.substring(5,7);
                    var pdate=dats.substring(8,10);
                    date_of_admition=pyear+pmonth+pdate;

                }
                if(dtvalues.dataElement=="Ntf8uwbttrj")
                {
                    //console.log(dtvalues.value);
                    var dats=dtvalues.value;

                    var pyear=dats.substring(0,4);
                    var pmonth=dats.substring(5,7);
                    var pdate=dats.substring(8,10);
                    date_of_discharge=pyear+pmonth+pdate;

                }
                if(dtvalues.dataElement=="cVDk6Qi4aXJ")
                {
                    //console.log(dtvalues.value);
                    source_labo=dtvalues.value;
                }
                if(dtvalues.dataElement=="m9zPgjtU6Ck")
                {
                    //console.log(dtvalues.value);
                    labnun=dtvalues.value;
                }
                if(dtvalues.dataElement=="K90OuFCv3c8")
                {
                    //console.log(dtvalues.value);
                    Biopsy_Number=dtvalues.value;
                }
                if(dtvalues.dataElement=="iUev3OfIqOg")
                {
                    //console.log(dtvalues.value);
                    var dats=dtvalues.value;

                    var pyear=dats.substring(0,4);
                    var pmonth=dats.substring(5,7);
                    var pdate=dats.substring(8,10);
                    Date_of_reception=pyear+pmonth+pdate;

                }
                if(dtvalues.dataElement=="kNjR9xQM4Wv")
                {
                    //console.log(dtvalues.value);
                    var dats=dtvalues.value;

                    var pyear=dats.substring(0,4);
                    var pmonth=dats.substring(5,7);
                    var pdate=dats.substring(8,10);
                    Date_of_Report=pyear+pmonth+pdate;

                }
                
                if(dtvalues.dataElement=="sLGqIdIjg20")
                {
                    //console.log(dtvalues.value);
                    Referred_from=dtvalues.value;
                }
                if(dtvalues.dataElement=="yvXtJYq4f5A")
                {
                    //console.log(dtvalues.value);
                    Referred_to=dtvalues.value;
                }
                if(dtvalues.dataElement=="BD4nYiPXwLN")
                {
                    //console.log(dtvalues.value);
                    Referred_for=dtvalues.value;
                }
                })
                
                }
                if(!(tumor_src==""))
                {
                var fullstring=tumourid_src_table+"\t"+source_record_id+"\t"+tumor_src+"\t"+source_service+"\t"+patient_hospital_number+"\t"+archive_code+
                "\t"+date_of_admition+"\t"+date_of_adm+"\t"+date_of_discharge+"\t"+source_labo+"\t"+labnun+"\t"+Biopsy_Number+
                "\t"+Date_of_reception+"\t"+Date_of_Report+"\t"+Referred_from+"\t"+
                srcdate+"\t"+Referred_to+"\t"+Referred_for;
                        contacts=contacts+'\n'+fullstring;
                }
                    })

                  

                    })
            
          
            
        });*/

        if(!(tumourid_src_table==""))
        {
        const element = document.createElement("a");
        const file = new Blob([contacts], {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "source_data.txt";
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();

        }

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
        const message = 'SUCCESS: Successfully retrieved Source events.'
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

    // Refetches and updates the tumour data as long as the Filter button is clicked
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
            <DataFilterHeaderView onUpdateFetchInfo={updateFetchInfo} provinces={data.provinces.children}/>
            
            
            <Table>
                                <TableHead>
                                    <TableRowHead>
                                        <TableCellHead className={styles.leftcell}>
                                            <div className={styles.row}>
                                                <div className={styles.downloadfiles}>
                                             
             
                                                <Button primary onClick={() => {updateDowloadInfo(data.results.pager.total)}}>{i18n.t('Download Source Data')} </Button>
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
                            <TableCellHead>Status</TableCellHead>
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
                                            {attr.attribute == 'PTGSZmTk3IQ'
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
                                <TableCell>Incomplete</TableCell>
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