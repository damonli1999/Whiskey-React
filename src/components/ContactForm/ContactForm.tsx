import React from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useForm } from 'react-hook-form';
import { chooseName, chooseType, choosePrice, chooseIngredients } from '../../redux/slices/RootSlice';
import { Input } from '../SharedComponents/Input';
import { Button } from '@material-ui/core';
import { server_calls } from '../../api';
import { VerticalAlignTop } from '@material-ui/icons';

interface ContactFormProps{
    id?: string;
    data?: {}
}

interface ContactState {
    name: string;
    type: string;
    price: string;
    ingredients: string;
}

export const ContactForm = (props: ContactFormProps) => {

    const dispatch = useDispatch();
    const store = useStore();
    const name = useSelector<ContactState>(state => state.name);
    const {register, handleSubmit } = useForm({});

    const onSubmit= (data:any, event: any) => {
        console.log(props.id)
        if(props.id!){
            server_calls.update(props.id!,data);
            console.log(`Updated: ${data} ${props.id}`)
            console.log(data);
            setTimeout( () => {window.location.reload()},1000);
            event.target.reset();
        } else {
            dispatch(chooseName(data.name));
            dispatch(chooseType(data.type));
            dispatch(choosePrice(data.price));
            dispatch(chooseIngredients(data.ingredients));
            server_calls.create(store.getState());
            setTimeout( () => {window.location.reload()}, 1000)
        }
    }

    return (
        <div>
            <form onSubmit = {handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Input {...register('name')} name="name" placeholder='Name'/>
                </div>
                <div>
                    <label htmlFor="type">Type</label>
                    <Input {...register('type')} name="type" placeholder='Type'/>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <Input {...register('price')} name="price" placeholder='Price'/>
                </div>
                <div>
                    <label htmlFor="ingredients">Ingredients</label>
                    <Input {...register('ingredients')} name= "ingredients" placeholder='Ingredients'/>
                </div>
                <Button type='submit'>Submit</Button>
            </form>
        </div>
    )
}

