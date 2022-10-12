import 'antd/dist/antd.css'
import './App.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Row, Col, Layout, Input, Card } from 'antd';
import React from 'react';
import {useNavigate, useParams} from 'react-router-dom'

export default function Expenses (){
    let {id} = useParams()
    const { Header, Content, Footer } = Layout;
    const [meals, setMeals] = useState(null)
    const ingredient = []
    const navigate = useNavigate()

    const loadItem = async () => {
        try {
          const res = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
          setMeals(res.data.meals[0])
        } catch (error) {
          console.error(error)
        }
      }
    
      useEffect(() => {
        loadItem()
      }, [])

    return (
        <div>
        {meals && 
            <Layout className="layout" >
            <Header>
            <Row style={{paddingLeft: '3rem', marginRight: '3rem'}}>
                <Col span={12}>
                <div className="logo" style={{color: "white", fontSize: "18pt", fontWeight: 'bold', cursor: 'pointer'}}
                onClick={()=>navigate('/')}
                >MEAL</div>
                </Col>
                <Col span={12} align="right">
                <Input placeholder="Search" style={{width: "75%"}} 
                />
                </Col>
            </Row>
            </Header>
            <Content style={{padding: '3rem 6rem'}}>
            <Row style={{justifyContent: 'center',borderRadius: 10, border: 'solid rgba(0, 0, 0, 0.4)', borderWidth: '1pt'}}>
                <Col span={12}>
                    <img src={meals.strMealThumb} style={{width: '100%', borderRadius: 10}} />
                </Col>
                <Col span={12} style={{padding: '2rem'}}>
                    <h1 align='center'>{meals.strMeal}</h1>
                    <h3> Ingredient </h3>
                    <ul>
                        {ingredient.map((ing,index) => {return <li> {ing} </li>})}
                    </ul>
                    <h3> Instruction </h3>
                    <p>{meals.strInstructions}</p>
                </Col>
            </Row>
            </Content>
            <Footer style={{ textAlign: 'center', display: 'block' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        }
        </div>
    )
}
