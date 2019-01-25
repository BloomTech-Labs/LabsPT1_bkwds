import React from "react"
import { connect } from "react-redux"
import { Formik } from "formik"
import styled from "styled-components"
import PropTypes from "prop-types"

import { Form } from "../../styles/theme/styledComponents"
import { CustomInputWithError, CustomButtonWithError } from "./customInputs"
import { createTrip } from "../../redux/actions/trips"
import { newTripValidations as validate } from "./formValidations"
import { formatDate, getToday, getTomorrow } from "../../utils"
import { validationErrorMixin } from "../../styles/theme/mixins"

const NewTripFormStyles = styled.div`
  /* Make space up top for validation error messages: */
  padding-top: 1rem;
  .new-trip-form-field {
    ${validationErrorMixin};
  }
  button {
    height: 2.5rem;
  }
`

const makeInitialValues = tripIndex => ({
  name: `Trip #${tripIndex + 1}`, // trip name is initialized to next trip index
  start: formatDate(getToday()),
  end: formatDate(getTomorrow()),
  lat: "",
  lon: ""
})

const NewTripForm = ({ userId, createTrip, newTripError, tripIndex }) => {
  return (
    <Formik
      validate={validate}
      initialValues={makeInitialValues(tripIndex)}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false)
        createTrip({ ...values, userId })
      }}
      render={({
        values,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting
      }) => (
        <NewTripFormStyles>
          <div className="new-trip-form custom-form">
            <Form onSubmit={handleSubmit}>
              <CustomInputWithError
                name="name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Email"
                values={values}
                classNames={["new-trip-form-field"]}
              />
              <CustomInputWithError
                name="start"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
                classNames={["new-trip-form-field"]}
              />
              <CustomInputWithError
                name="end"
                type="date"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
                classNames={["new-trip-form-field"]}
              />
              <CustomInputWithError
                name="lat"
                type="number"
                placeholder="Latitude"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
                classNames={["new-trip-form-field"]}
              />
              <CustomInputWithError
                name="lon"
                type="number"
                placeholder="Longitude"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values}
                classNames={["new-trip-form-field"]}
              />
              <CustomButtonWithError
                text="Save Trip"
                submitError={newTripError}
                isSubmitting={isSubmitting}
              />
            </Form>
          </div>
        </NewTripFormStyles>
      )}
    />
  )
}

NewTripForm.propTypes = {
  userId: PropTypes.string.isRequired,
  newTripError: PropTypes.string.isRequired,
  tripIndex: PropTypes.number.isRequired,
  createTrip: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userId: state.auth.user.id,
  newTripError: state.trips.error,
  tripIndex: Object.keys(state.trips.trips).length
})

const mapDispatchToProps = { createTrip }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewTripForm)
