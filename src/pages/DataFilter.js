import {
    Button,
    InputFieldFF,
    SingleSelectFieldFF,
    SwitchFieldFF,
    composeValidators,
    createEqualTo,
    email,
    hasValue,
} from '@dhis2/ui'
import { ReactFinalForm } from '@dhis2/ui'
import React from 'react'
import styles from './Form.module.css'

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
    alert(formattedValuesString)
}

const { Field } = ReactFinalForm

export const DataFilter = () => (
    <div>
        <h1>Data Filter</h1>

        <ReactFinalForm.Form onSubmit={alertValues}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className={styles.row}>
                        <Field
                            name="Data type"
                            label="Data type"
                            // Use `SingleSelectFieldFF` as component
                            component={SingleSelectFieldFF}
                            className={styles.title}
                            initialValue="none"
                            options={[
                                { label: 'Tumour', value: 'prof' },
                                { label: 'Patient', value: 'doc' },
                                { label: 'Source', value: 'none' },
                            ]}
                        />
                    </div>

                    <div className={styles.row}>
                        <Field
                            required
                            name="Start Date"
                            label="Start Date"
                            component={InputFieldFF}
                            className={styles.surname}
                            validate={hasValue}
                        />

                        <Field
                            required
                            name="End Date"
                            label="End Date"
                            component={InputFieldFF}
                            className={styles.firstname}
                            validate={hasValue}
                        />
                    </div>

                    <div className={styles.row}>
                        <Field
                            required
                            name="more-info"
                            label="More info"
                            component={InputFieldFF}
                            className={styles.email}
                            validate={hasValue}
                        />
                    </div>

                    <div className={styles.row}>
                        <Field
                            type="checkbox"
                            name="newsletter"
                            label="Acknowledge"
                            component={SwitchFieldFF}
                            className={styles.newsletters}
                            initialValue={false}
                        />
                    </div>

                    <div className={styles.row}>
                        <Button primary type="submit">
                            Filter Data
                        </Button>
                    </div>
                </form>
            )}
        </ReactFinalForm.Form>
    </div>
)
