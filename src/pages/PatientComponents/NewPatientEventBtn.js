import { useDataMutation } from '@dhis2/app-runtime'
import { Button } from '@dhis2/ui'

const mutation = {
    resource: 'events',
    type: 'create',
    data: {
        dataElement: 'jufaPpTt33C',
        value: '2',
        eventDate: '2021-04-11',
        orgUnit: 'OujzhM1lgN5',
        program: 'rx6V962E4XM',
        trackedEntityInstance: 'DjDguxzVFAB',
        programStage: 'Y0cWLBEdXzb',
    },
}

export const NewPatientEventBtn = ({ refetch }) => {
    const [mutate, { loading }] = useDataMutation(mutation)
    const onClick = async () => {
        await mutate()
        refetch()
    }
    return (
        <Button primary disabled={loading} onClick={onClick}>
            + New
        </Button>
    )
}