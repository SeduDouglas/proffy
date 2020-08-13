import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#8257E5',
        flex: 1,
        justifyContent: 'center',
        padding: 40,
        
    },

    banner: {
        width: '100%',
        resizeMode:'contain'
    },

    title:{
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize:32,
        lineHeight: 32,
        maxWidth: 180,
    },

    titleBold: {
        fontFamily: 'Poppins_600SemiBold',
    },

    buttonsContainer:{
        flexDirection:'row',
        marginTop: 40,
        justifyContent: 'space-between',
    },

    button:{
        height:150,
        width: '48%',
        backgroundColor:'#333',
        borderRadius: 8,
        padding: 24,
        justifyContent: 'space-between'
    },

    buttonPrimary:{
        backgroundColor: '#9871f5'
    },

    buttonSecondary:{
        backgroundColor: '#04b361'
    },

    buttonText:{
        fontFamily: 'Archivo_700Bold',
        color: '#FFF',
        fontSize: 20,
    },

    totalConnections: {
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 12,
        lineHeight: 20,
        maxWidth: 140,
        marginTop: 40,
    },
    content: {
        flex: 1,
        justifyContent: 'center',

    },

    description:{
        marginTop: 24,
        color: '#d4c2ff',
        fontSize: 16,
        lineHeight: 26,
        fontFamily: 'Poppins_400Regular',
        maxWidth: 240
    },

    okButton: {
        marginVertical: 40,
        backgroundColor: '#04b361',
        height: 58,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    okButtonText:{
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Archivo_700Bold'
    }

});

export default styles;