import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DatePicker as DatePickerNB, Icon } from 'native-base';
import moment from 'moment';

const DatePicker = ({
  name,
  onDateChange,
  error,
  label,
  locale
}) => {
  return (
    <View>
      <View style={styles.container}>
        <Icon
          name="calendar"
          type="FontAwesome"
        />
        <DatePickerNB
          locale={locale}
          animationType="fade"
          textStyle={styles.text(error)}
          placeHolderTextStyle={styles.placeholderText}
          placeHolderText={label}
          onDateChange={(date) => onDateChange(name, moment(date).toISOString())}
        />
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
};

DatePicker.defaultProps = {
  label: 'Select date',
  locale: 'en-EN'
}

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#555'
  },
  errorMessage: {
    color: 'red',
    fontStyle: 'italic'
  },
  text: (isValid) => ({
    color: isValid === undefined ? '#1a3' : 'red'
  }),
  placeholderText: {
    color: "#333"
  }
});