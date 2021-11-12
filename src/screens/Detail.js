import React, {Fragment, useEffect} from 'react'
import {View, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { OutlinedTextField } from 'react-native-material-textfield'
import Icon from 'react-native-vector-icons/FontAwesome'

const Detail = props => {

    useEffect(() => {

        return () => {
        }        
    }, [])

    return (
        <Fragment>

            <SafeAreaView style={styles.container}>

                <ScrollView>

                    <View style={styles.input}>
                        <OutlinedTextField
                            value={props.route.params.data.Nome}
                            label="Paciente"
                            disabled={true}
                            baseColor={'#2c2b49'}
                        />
                    </View>

                    <View style={styles.input}>
                        <OutlinedTextField
                            value={props.route.params.data.data_agendamento_inicial}
                            label="Dt Inicial"
                            disabled={true}
                            baseColor={'#2c2b49'}
                        />
                    </View>

                    <View style={styles.input}>
                        <OutlinedTextField
                            value={props.route.params.data.data_agendamento_final}
                            label="Dt Final"
                            disabled={true}
                            baseColor={'#2c2b49'}
                        />
                    </View>

                    <View style={styles.input}>
                        <OutlinedTextField
                            value={props.route.params.data.Observacao}
                            label="Observação"
                            disabled={true}
                            multiline={true}
                            baseColor={'#2c2b49'}
                        />
                    </View>

                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => alert('Desenvolver!')}>

                            <View style={styles.buttonIcon}>
                                <Icon name='check'size={25} color='green'></Icon>
                                <Text style={styles.text}>Concluir Sessão</Text> 
                            </View>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => alert('Desenvolver!')}>
                            
                            <View style={styles.buttonIcon}>
                                <Icon name='remove'size={25} color='red'></Icon>
                                <Text style={styles.text}>Cancelar Sessão</Text> 
                            </View>
                               
                        </TouchableOpacity>

                    </View>

                </ScrollView>

            </SafeAreaView>
           
        </Fragment>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 10
    },
    buttonIcon: {
        flexDirection: 'row',
    },
    text: {
        paddingLeft: 5,
        paddingTop: 3
    },
    input: {
        marginTop: 10,
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        borderRadius: 50
    },
})

export default Detail