import 'antd/dist/antd.css'
import './App.css';
import { useState, useEffect } from "react";
import axios from 'axios';
import { Layout, Menu, Row, Col, Button, Breadcrumb, Input } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Card } from 'antd';
import {Link, useNavigate} from 'react-router-dom'

export default function App() {
  const [meals, setMeals] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const { Header, Content, Footer } = Layout;
  const { Meta } = Card;
  const navigate = useNavigate()
  const { Search } = Input

  const loadMealList = async () => {
    try {
      const res = await axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      setMeals(res.data.meals)
      console.log(res.data.meals)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadMealList()
  }, [])
  
  const filterCategory = async (category) => {
    try {
      const cat = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category);
      setMeals(cat.data.meals);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  
  const showMeal = meals.filter((item) => {
              if (searchItem ===''){
                 return item
              } else if (item.strMeal.toLowerCase().includes(searchItem.toLowerCase())){
                 return item
              }
              }).map((item) => {
    return <Card
    hoverable key={item.id}
    style={{ borderRadius: 10, width: 'auto', height: 'auto' }}
    cover={<img alt="example" src={item.strMealThumb} style={{borderTopLeftRadius: 10, borderTopRightRadius: 10}}
    onClick={() => navigate(`/${item.id}`)} />}
  >
    <Meta title={item.strMeal} />
  </Card>
  })

  return (
    <Layout className="layout">
    <Header>
      <Row style={{paddingLeft: '3rem', paddingRight: '3rem'}}>
        <Col span={12}>
          <div className="logo" style={{color: "white", fontSize: "18pt", fontWeight: 'bold'}}>MEAL</div>
        </Col>
        <Col span={12} align='right'>
          <Button type="primary" onClick={loadMealList} style={{marginRight: '1rem'}}>All</Button>,
          <Button type="primary" onClick={() => filterCategory("Breakfast")} style={{marginRight: '1rem'}}>Breakfast</Button>,
          <Button type="primary" onClick={() => filterCategory("Seafood")} style={{marginRight: '1rem'}}>Seafood</Button>
          <Button type="primary" onClick={() => filterCategory("Vegetarian")}>Vegetarian</Button>
        </Col>
      </Row>
    </Header>
    
    <Content style={{ width: '100vw', padding: '2rem' }}>
      <Row style={{margin:'1rem 5rem 2rem'}}>
        <Col span={24} align="center">
          <Search placeholder="Search" onChange={e => {setSearchItem(e.target.value)}} style={{width: '50%'}} enterButton />
        </Col>
      </Row>
      <div className="site-layout-content" 
        style={{display: 'grid', gridTemplateColumns: 'repeat(20, 15rem)', gap: '2rem', justifyContent: 'center', overflowY: 'scroll'}}
      >{showMeal}</div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
    );
  }
