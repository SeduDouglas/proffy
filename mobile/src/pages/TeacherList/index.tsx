import React, { useState, useEffect } from 'react';
import styles from './styles';
import { View, ScrollView, Text } from 'react-native';
import style from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'
import api from '../../services/api';
import {Teacher} from '../../components/TeacherItem/index'
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([])

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);


    useEffect(() => {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher:Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            } else {
                
            }
        });
    }, [])
    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit() {
        const response = await api.get('/classes',
        {
            params: {
                subject,
                week_day,
                time
            }
        });
        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    return (
        <View style={styles.container}>
            <PageHeader title="Proffys disponíveis" headerRight={(
                <BorderlessButton onPress={handleToggleFiltersVisible}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )}>

                {isFiltersVisible && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>
                            Matéria
                        </Text>
                        <TextInput
                        style={styles.input}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#c1bccc"
                        value={subject}
                        onChangeText={text => {
                            setSubject(text);
                        }}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={style.label}>Dia da semana</Text>
                                <TextInput
                                style={styles.input}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc"
                                value={week_day}
                                onChangeText={text => {
                                    setWeekDay(text);
                                }}
                                />

    
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={style.label}>Horário</Text>
                                <TextInput
                                style={styles.input}
                                placeholder="Qual o horário?"
                                placeholderTextColor="#c1bccc"
                                value={time}
                                onChangeText={text => {
                                    setTime(text);
                                }}
                                />
                            </View>
                        </View>

                        
                        <RectButton 
                        style={styles.submitButton}
                        onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>
                                Filtrar
                            </Text>
                        </RectButton>
                    </View>
                    )}
            </PageHeader>
            <ScrollView 
            style={styles.teacherList}
            contentContainerStyle ={{
                paddingHorizontal: 16,
                paddingBottom: 16}}>

                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem favorited={favorites.includes(teacher.id)}  key={teacher.id} teacher={teacher}></TeacherItem>
                })}
            </ScrollView>
        </View>
    );
}

export default TeacherList;