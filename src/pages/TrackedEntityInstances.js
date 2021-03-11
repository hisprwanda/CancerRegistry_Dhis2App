// @TODO: Import `Table`, `TableBody`, `TableCell`, `TableCellHead`, `TableHead`, `TableRow` & `TableRowHead` from `@dhis2/ui`
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableCellHead,
  TableRow,
  TableRowHead
} from "@dhis2/ui";

import { useDataQuery } from "@dhis2/app-runtime";
import React from "react";

/**
 * This defined the data that we want to get
 * The `app-runtime` will be explained in a presentation after this one,
 * so you don't have to worry about the specifics
 */
const TEIS_QUERY = {
  // One query object in the whole query
  trackedEntityInstances: {
    // The `attributes` endpoint should be used
    resource: "trackedEntityInstances",
    params: {
      ou: "Hjw70Lodtf2",
      program: "rx6V962E4XM",
      paging: false,
      // Only the attribute properties that are required should be loaded
      // fields: "created,orgUnit,inactive"
      fields: "lastUpdated, created,orgUnit,inactive"
    }
  }
};

export const TrackedEntityInstances = () => {
  // This is yet another functionality provided by the `@dhis2/app-runtime`
  // For the time being it does not matter what this does exactly
  // * loading will be true while the data is being loaded
  // * error will be an instance of `Error` if something fails
  // * data will be null while the data is being loaded or if something fails
  // * data will be an object once loading is done with the following path
  //   data.attributes.attributes <- That's an array of objects
  const { loading, error, data } = useDataQuery(TEIS_QUERY);
  console.log("trackedEntityInstances", data)
  return (
    <div>
      <h1>TrackedEntityInstances</h1>

      {
        // display that the data is being loaded
        // when loading is true
        loading && "Loading..."
      }

      {
        // display the error message
        // is an error occurred
        error && error.message
      }

      {
        // if there is any data available
        data?.trackedEntityInstances?.trackedEntityInstances && (
          // const attributesM = data.trackedEntityInstances.trackedEntityInstances;
          // console.log("attributes", attributesM);
          <Table>
            <TableHead>
              <TableRowHead>
                <TableCellHead>Created</TableCellHead>
                <TableCellHead>OrgUnit</TableCellHead>
                <TableCellHead>Inactive</TableCellHead>
              </TableRowHead>
            </TableHead>
            <TableBody>
              {data.trackedEntityInstances.trackedEntityInstances.map(
                
                ({created,orgUnit,inactive }) => (
                  <TableRow >
                    <TableCell>{created}</TableCell>
                    <TableCell>{orgUnit}</TableCell>
                    <TableCell>{inactive ? "yes" : "no"}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )
      }
    </div>
  );
};
