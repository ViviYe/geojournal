import React, { Component } from 'react';
import propTypes from 'prop-types'
import {
    Text,
    Image,
    StyleSheet,
    View,
    TouchableHighlight,
    TouchableOpacity
} from 'react-native'

export default function LoginButton(props) {
    const { text, color, background, onPress, icon, opacity, padding } = props
    const backgroundColor = background || 'login from facebook'
    const textColor = color || 'white'
    const buttonOpacity = opacity || 0.5
    const buttonPadding = padding || 15

    return (
        <TouchableOpacity
            style={[styles.wrapper, { backgroundColor: backgroundColor, opacity: buttonOpacity, padding: buttonPadding }]}
            onPress={onPress} >
            <View style={styles.button}>
                {icon}
                <Text style={[styles.text, { color: color }]}>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}


LoginButton.propTypes = {
    text: propTypes.string.isRequired,
    color: propTypes.string.isRequired,
    background: propTypes.string,
    icon: propTypes.object,
    onPress: propTypes.func.isRequired,
    opacity: propTypes.number,
    padding: propTypes.number,
    //height: propTypes.oneOfType([propType.number, propType.string])
}


const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 20,
        display: 'flex',
        borderWidth: 2,
        borderRadius: 40,
        borderColor: 'white',
        justifyContent: 'center',
        alignContent: 'center',
        shadowColor: 'white',
        shadowRadius: 10,
        //shadowOpacity: 1,

        shadowOffset: { width: 50, height: 10 }

    },
    text: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily:"Avenir"
    },
    button: {
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }


})