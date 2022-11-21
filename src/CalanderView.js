import {
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Agenda, Calendar} from 'react-native-calendars';

export default function () {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [Data, SetData] = useState();
  const [Date, SetDate] = useState();
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

  const marked = {
    '2022-11-26': {
      selected: true,
      marked: true,
      selectedColor: 'red',
      data: {details: 'We Have an appointment with the PM'},
    },
    '2022-11-22': {marked: true, data: {details: 'We Have to go school'}},
    '2022-11-24': {
      marked: true,
      dotColor: 'red',
      activeOpacity: 0,
      data: {
        image:
          'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        details: 'Event of image',
      },
    },
    '2022-11-18': {
      marked: true,
      dotColor: 'red',
      activeOpacity: 0,
      data: {
        image:
          'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
        details: 'Event of image',
      },
    },
    '2022-11-19': {disabled: true, disableTouchEvent: true},
  };

  const items = {
    '2022-11-22': [{name: 'item 1 - any js object'}],
    '2022-11-26': [{name: 'item 2 - any js object'}],
    '2022-11-23': [{name: 'item 2 - any js object', height: 80}],
    '2022-11-24': [],
    '2022-11-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}],
  };

  const onDayPress = val => {
    const findSpecificStr = (obj, str) => {
      return Object.keys(obj).includes(str);
    };
    const value = val.dateString;
    const data = findSpecificStr(marked, value);

    if (data) {
      SetDate(value);
      SetData(marked[value]);
    } else {
      SetData({
        data: {
          details: 'No Event Decided',
        },
      });
    }
  };

  // ----------------------------------------------Agenda-----------------------------------------

  return (
    <View
      style={{
        flex: 1,

        backgroundColor: 'white',
      }}>
      <Calendar
        // testID={testIDs.calendars.FIRST}
        style={{
          marginTop: '20%',
          borderWidth: 0.5,
          width: '80%',
          borderRadius: 20,
          alignSelf: 'center',
        }}
        enableSwipeMonths
        onDayPress={onDayPress}
        minDate={'2022-11-21'}
        markedDates={marked}
      />

      {Data && (
        <View
          style={{
            alignItems: 'center',
            marginTop: 20,
            justifyContent: 'center',
            backgroundColor: '#33F6FF',
            marginHorizontal: '5%',
            borderRadius: 30,
            padding: 10,
          }}>
          {Data.data?.image && (
            <Image
              source={{uri: Data.data?.image}}
              style={{
                width: 200,
                height: 200,
                borderRadius: 30,
                margin: '5%',
              }}
            />
          )}
          <Text
            style={{
              color: 'white',
              fontSize: 10,
              backgroundColor: 'black',
              borderRadius: 20,
              padding: 8,
            }}>
            {Date}
          </Text>

          <Text
            style={{
              color: 'black',
              fontSize: 17,
              padding: '5%',
              fontWeight: 'bold',
              backgroundColor: 'skyblue',
              textAlign: 'center',
              borderRadius: 20,
            }}>
            {Data.data.details}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dateText: {color: 'black', fontWeight: 'bold', textAlign: 'center'},
  text: {color: 'black', fontWeight: 'bold', textAlign: 'center'},

  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: '40%',
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
