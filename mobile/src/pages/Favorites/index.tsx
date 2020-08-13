import React, { useEffect, useState } from 'react';
import {View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './styles';
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import {RectButton} from 'react-native-gesture-handler'
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';



function Favorites() {

    const [favorites, setFavorites] = useState<Teacher[]>([])
    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                setFavorites(favoritedTeachers);
            } 
        });
    }

    useFocusEffect(() => {
        loadFavorites();
    })

    return (
        <View style={styles.container}>

            <PageHeader title="Meus proffys favoritos"></PageHeader>

            <ScrollView
            style={styles.teacherList}
            contentContainerStyle ={{
                paddingHorizontal: 16,
                paddingBottom: 16}}>
                {favorites.map(teacher => {
                    return <TeacherItem key={teacher.id} teacher={teacher} favorited={favorites.includes(teacher)}></TeacherItem>
                })}
            </ScrollView>
        </View>
    )
}


export default Favorites;