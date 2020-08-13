import React, {useState, FormEvent} from 'react';
import { Link } from 'react-router-dom';

import backIcon from '../../assets/images/icons/back.svg';
import logoImg from '../../assets/images/logo.svg';

import './styles.css';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import api from '../../services/api';


function TeacherList(){

    const [teachers, setTeachers] = useState([]);


    const [subject, setSubject] = useState('');
    const [week_day, setWeekday] = useState('');
    const [time, setTime] = useState('');

    async function searchClassesList(e:FormEvent){
        e.preventDefault();

        const response = await api.get('/classes',
        {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
        
    }


    return (
        <div id="page-teacher-list" className="container">
           <PageHeader title="Estes são os proffys disponíveis.">
               <form id="search-teachers" onSubmit={searchClassesList}>

               <Select 
                    name="subject" 
                    label="Matéria"
                    options={[
                        {value: 'MAT01', label: 'Artes'},
                        {value: 'MAT02', label: 'Artes'},
                        {value: 'MAT03', label: 'Artes'},
                        {value: 'MAT04', label: 'Artes'},
                        {value: 'MAT05', label: 'Artes'},
                        {value: 'MAT06', label: 'Artes'},
                        {value: 'MAT07', label: 'Artes'},
                        {value: 'MAT08', label: 'Artes'},
                        {value: 'MAT09', label: 'Artes'},
                        {value: 'MAT10', label: 'Artes'},
                    ]}
                    value={subject}
                    onChange={(e) => {setSubject(e.target.value)}}
                    ></Select>
                    <Select 
                    name="week_day" 
                    label="Dia da semana"
                    options={[
                        {value: '0', label: 'Domingo'},
                        {value: '1', label: 'Segunda-feira'},
                        {value: '2', label: 'Terça-feira'},
                        {value: '3', label: 'Quarta-feira'},
                        {value: '4', label: 'Quinta-feira'},
                        {value: '5', label: 'Sexta-feira'},
                        {value: '6', label: 'Sábado'},
                    ]}
                    value={week_day}
                    onChange={(e) => {setWeekday(e.target.value)}}
                    ></Select>
                   <Input 
                   type="time" 
                   name="time" 
                   label="Hora"
                   value={time}
                   onChange={(e) => {setTime(e.target.value)}}
                   ></Input>
                    <button type="submit">
                        Buscar
                    </button>
               </form>
           </PageHeader>

           <main>
               {teachers.map((teacher:Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher}></TeacherItem>;
               })}

           </main>
        </div>
    )

}

export default TeacherList