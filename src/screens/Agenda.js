import React, {Fragment, useState} from 'react'
import {SafeAreaView, StyleSheet, Alert} from 'react-native'
import WeekView, { addLocale } from 'react-native-week-view'
import commonStyles from '../commonStyles'
import moment from 'moment'
import 'moment/locale/pt-br'
import { COLOR } from 'react-native-material-ui'

addLocale('pt-br')

const Agenda = props => {

    const generateDates = (hours, minutes) => {
        const date = new Date()
        date.setHours(date.getHours() + hours)
        if (minutes != null) {
          date.setMinutes(minutes)
        }
        return date
      }
      
      const sampleEvents = [
        {
          id: 1,
          description: 'Joana Ferreira',
          startDate: generateDates(0),
          endDate: generateDates(2),
          color: 'green',
          data : {
              Id: 1,
              Nome: 'Joana Ferreira',
              data_agendamento_inicial: moment(generateDates(0)).format('DD/MM/YYYY hh:mm'),
              data_agendamento_final: moment(generateDates(2)).format('DD/MM/YYYY hh:mm'),
              Observacao: 'Realizar fisioterapia perna direita paciente com sindrome joelho corredor'
          }
        }
    ]

    const onEventPress = ({id, color, startDate, endDate, description, data}) => {
        // Alert.alert(
        //   `event ${color} - ${id}`,
        //   `start: ${startDate}\nend: ${endDate}`,
        // )

        props.navigation.navigate('Sessão', {data})
    }

    return (
        <Fragment>

            <SafeAreaView style={styles.container}>
          
            <WeekView
                events={sampleEvents}
                selectedDate={new Date()}
                numberOfDays={1}
                onEventPress={onEventPress}
                headerStyle={styles.headerStyle}
                headerTextColor="#fff"
                formatDateHeader="MMM D"
                hoursInDisplay={12}
                startHour={8}
                locale={'addLocale'}
            />
            </SafeAreaView>
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFF',
      marginTop: 5
    },
    headerStyle: {
      backgroundColor: COLOR.blue800,
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft: 10
    },
  })
  

export default Agenda