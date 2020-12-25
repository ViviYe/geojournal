import Color from "./Colors"
import { StyleSheet } from 'react-native'


export const ExploreStyles = StyleSheet.create({

});

export const StartScreenStyle = StyleSheet.create({

    wrapper: {
        flex: 1,
       
        backgroundColor: Color.NavBlue,
      
    },
    logo: {
        height: 120,
        width: 140,
    },
    title: {
        flex: 1.6,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonsWrapper: { flex: 1, paddingLeft: 10, paddingRight: 10 }


})

export const LoginStyle = StyleSheet.create({

    wrapper: {
        flex: 1,
        backgroundColor: Color.backgroundgray,
        padding: 20,
    },
    logo: {
        height: '35%',
        width: '50%',
        resizeMode: 'contain'
    },
    title: {

        paddingTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40%'
    },

    OtherOption:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '90%',
        marginHorizontal: 20,
        paddingTop: 20
    }

})