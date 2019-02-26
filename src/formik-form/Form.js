import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import * as Yup from 'yup';
import { Formik } from 'formik';
import DatePicker from './DatePicker';

class Form extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Formik
          initialValues={{ DOB: '' }}
          validationSchema={Yup.object().shape({
            DOB: Yup.string()
              .test(
                'date-of-birth',
                "Must be older than that",
                (value) => (moment().diff(value, 'years') >= 18)
              )
          })}
          onSubmit={this.onSubmit}
          render={({
            values,
            handleSubmit,
            setFieldValue,
            errors
          }) => (
              <DatePicker
                name="DOB"
                onDateChange={setFieldValue}
                error={errors.DOB}
                label="Date of birth"
              />
            )
          }
        />
      </View>
    );
  }
};

export default Form;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});