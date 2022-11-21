import {
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Agenda, Calendar} from 'react-native-calendars';

export default function App() {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const startDate = selectedStartDate
    ? selectedStartDate.format('YYYY-MM-DD').toString()
    : '';

  const marked = {
    '2022-11-16': {selected: true, marked: true, selectedColor: 'blue'},
    '2022-11-22': {marked: true},
    '2022-11-18': {marked: true, dotColor: 'red', activeOpacity: 0},
    '2022-11-19': {disabled: true, disableTouchEvent: true},
  };

  const items = {
    '2022-11-22': [{name: 'item 1 - any js object'}],
    '2022-11-16': [{name: 'item 2 - any js object'}],
    '2022-11-23': [{name: 'item 2 - any js object', height: 80}],
    '2022-11-24': [],
    '2022-11-25': [{name: 'item 3 - any js object'}, {name: 'any js object'}],
  };

  const onDayPress = val => {
    console.log(val.dateString == marked);
  };

  // ----------------------------------------------Agenda-----------------------------------------
  function loadItems(day) {
    console.log(day);
    // setTimeout(() => {
    //   for (let i = -15; i < 85; i++) {
    //     const time = day.timestamp + i * 24 * 60 * 60 * 1000;
    //     const strTime = timeToString(time);
    //     if (!this.state.items[strTime]) {
    //       this.state.items[strTime] = [];
    //       const numItems = Math.floor(Math.random() * 5);
    //       for (let j = 0; j < numItems; j++) {
    //         this.state.items[strTime].push({
    //           name: 'Item for ' + strTime,
    //           height: Math.max(50, Math.floor(Math.random() * 150)),
    //         });
    //       }
    //     }
    //   }
    //   //console.log(this.state.items);
    //   const newItems = {};
    //   Object.keys(this.state.items).forEach(key => {
    //     newItems[key] = this.state.items[key];
    //   });
    //   this.setState({
    //     items: newItems,
    //   });
    // }, 1000);
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  const renderItem = item => {
    console.log(item);
    return (
      <View style={[styles.item]}>
        <Text style={{color: 'black'}}>{item.name}</Text>
      </View>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    console.log(r1, r2);
    return r1.name !== r2.name;
  };

  const timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  return (
    <View
      style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
      }}>
      {/* <View>
        <CalendarPicker
          // customDatesStyles={}
          onDateChange={setSelectedStartDate}
          initialDate={'2022-11-22'}
        />
        <Text style={styles.dateText}>Birthday: {startDate}</Text>
      </View> */}

      {/* <Calendar
        // testID={testIDs.calendars.FIRST}

        enableSwipeMonths
        // current={INITIAL_DATE}
        // style={styles.calendar}
        onDayPress={onDayPress}
        markedDates={marked}
      /> */}
      <Agenda
        items={items}
        // loadItemsForMonth={val => loadItems(val)}
        selected={'2022-11-16'}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        markingType={'period'}
        markedDates={{
          '2022-11-08': {textColor: '#666'},
          '2022-11-09': {textColor: '#666'},
          '2022-11-14': {startingDay: true, endingDay: true, color: 'blue'},
          '2022-11-21': {startingDay: true, color: 'blue'},
          '2022-11-22': {endingDay: true, color: 'gray'},
          '2022-11-24': {startingDay: true, color: 'gray'},
          '2022-11-25': {color: 'gray'},
          '2022-11-26': {endingDay: true, color: 'gray'},
        }}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
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
