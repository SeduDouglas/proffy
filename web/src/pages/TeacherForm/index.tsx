import React, { useState, FormEvent } from 'react';
import PageHeader from '../../components/PageHeader';
import {useHistory} from 'react-router-dom';


import './styles.css';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/Textarea';
import Select from '../../components/Select';
import api from '../../services/api';

function TeacherForm(){

    const history = useHistory();

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''}
    ])

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');

    const weekDays = [
        {value: '0', label: 'Domingo'},
        {value: '1', label: 'Segunda-feira'},
        {value: '2', label: 'Terça-feira'},
        {value: '3', label: 'Quarta-feira'},
        {value: '4', label: 'Quinta-feira'},
        {value: '5', label: 'Sexta-feira'},
        {value: '6', label: 'Sábado'},
    ];
    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, from: '', to: ''}
        ])
    };

    function setScheduleItemValue(itemIndex: number, field: string, value: string){
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if(index == itemIndex){
                return {...scheduleItem, [field]: value}
            }

            return scheduleItem;
        })

        setScheduleItems(updatedScheduleItems);
    }

    function handleCreateClass(e: FormEvent){
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso.');

            history.push('/');
        }).catch(() => {
            alert('Erro no cadastro');
        })
    }
    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
            title="Que incrível que você quer dar aulas."
            description="O primeiro passo é preencher esse formulário de inscrição"/>

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>
                            Seus dados
                        </legend>
                        <Input 
                        name="name" 
                        label="Nome completo" 
                        value={name} 
                        onChange={(e) => {setName(e.target.value)}}
                        ></Input>
                        <Input 
                        name="avatar" 
                        label="Avatar" 
                        value={avatar} 
                        onChange={(e) => {setAvatar(e.target.value)}}
                        ></Input>
                        <Input 
                        name="whatsapp" 
                        label="WhatsApp" 
                        value={whatsapp} 
                        onChange={(e) => {setWhatsapp(e.target.value)}}
                        ></Input>
                        <Textarea 
                        name="bio" 
                        label="Biografia" 
                        value={bio} 
                        onChange={(e) => {setBio(e.target.value)}}
                        ></Textarea>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Sobre a aula
                        </legend>
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
                        <Input 
                        name="cost" 
                        label="Custo da sua hora por aula"
                        value={cost}
                        onChange={(e) => {setCost(e.target.value)}}
                        ></Input>
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button onClick={addNewScheduleItem} type="button">+ Novo horário</button>
                        </legend>
                        {scheduleItems.map((item, index) => {
                            return (
                                <div key={item.week_day} className="schedule-item">
                                <Select 
                                name="week_day" 
                                label="Dia da semana"
                                options={weekDays}
                                value={item.week_day}
                                onChange={(e) => {setScheduleItemValue(index, 'week_day', e.target.value);}}
                                ></Select>
                            
                                <Input 
                                type="time" 
                                name="from" 
                                label="Das"
                                value={item.from}
                                onChange={(e) => {setScheduleItemValue(index, 'from', e.target.value);}}

                                ></Input>
                                <Input 
                                type="time" 
                                name="to" 
                                label="até"
                                onChange={(e) => {setScheduleItemValue(index, 'to', e.target.value);}}
                                value={item.to}
                                ></Input>
                        </div>
                            );
                        })}
                        
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>

            </main>
        </div>
        
    )

}

export default TeacherForm